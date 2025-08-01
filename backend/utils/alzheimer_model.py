import os
import numpy as np
import pandas as pd
import parselmouth
from parselmouth.praat import call
import joblib
import pickle
import sys
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "utils"))
from pipeline_functions import select_top_features, log_transform, winsorize_transform,drop_columns

from sklearn.preprocessing import FunctionTransformer, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from scipy.stats.mstats import winsorize
import librosa




# --- Tüm öznitelik isimleri (56 adet) ---

all_feature_names = []

for i in range(13):
    all_feature_names.append(f"mfcc_mean_{i+1}")
for i in range(13):
    all_feature_names.append(f"mfcc_std_{i+1}")

all_feature_names.extend([
    "zcr_mean", "zcr_std",
    "rmse_mean", "rmse_std",
    "centroid_mean", "centroid_std",
    "bandwidth_mean", "bandwidth_std"
])

for i in range(7):
    all_feature_names.append(f"contrast_mean_{i+1}")
for i in range(7):
    all_feature_names.append(f"contrast_std_{i+1}")

all_feature_names.extend([
    "pitch_mean", "pitch_std",
    "jitter", "shimmer",
    "speech_duration", "silence_duration",
    "speech_ratio", "pause_count"
])

# --- Ses özelliklerini çıkaran fonksiyon ---

def extract_features(audio_path):
    y, sr = librosa.load(audio_path, sr=None)

    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfcc_mean = np.mean(mfcc, axis=1)
    mfcc_std = np.std(mfcc, axis=1)

    zcr = librosa.feature.zero_crossing_rate(y)
    zcr_mean = np.mean(zcr)
    zcr_std = np.std(zcr)

    rmse = librosa.feature.rms(y=y)
    rmse_mean = np.mean(rmse)
    rmse_std = np.std(rmse)

    centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
    centroid_mean = np.mean(centroid)
    centroid_std = np.std(centroid)

    bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)
    bandwidth_mean = np.mean(bandwidth)
    bandwidth_std = np.std(bandwidth)

    contrast = librosa.feature.spectral_contrast(y=y, sr=sr)
    contrast_mean = np.mean(contrast, axis=1)
    contrast_std = np.std(contrast, axis=1)

    snd = parselmouth.Sound(audio_path)
    pitch = snd.to_pitch()
    pitch_values = pitch.selected_array['frequency']
    pitch_values = pitch_values[pitch_values > 0]
    pitch_mean = np.mean(pitch_values) if len(pitch_values) > 0 else 0
    pitch_std = np.std(pitch_values) if len(pitch_values) > 0 else 0

    point_process = call(snd, "To PointProcess (periodic, cc)", 75, 500)
    jitter = call(point_process, "Get jitter (local)", 0, 0, 0.0001, 0.02, 1.3)
    shimmer = call([snd, point_process], "Get shimmer (local)", 0, 0, 0.0001, 0.02, 1.3, 1.6)

    duration = snd.get_total_duration()
    intensity = snd.to_intensity()
    threshold = np.percentile(intensity.values[intensity.values > 0], 25)
    silence_frames = intensity.values < threshold
    silence_duration = np.sum(silence_frames) * 0.01  # 10ms per frame
    speech_duration = duration - silence_duration
    speech_ratio = speech_duration / duration if duration > 0 else 0
    pause_count = np.sum(np.diff(silence_frames.astype(int)) == 1)

    features = np.concatenate([
        mfcc_mean, mfcc_std,
        [zcr_mean, zcr_std],
        [rmse_mean, rmse_std],
        [centroid_mean, centroid_std],
        [bandwidth_mean, bandwidth_std],
        contrast_mean, contrast_std,
        [pitch_mean, pitch_std],
        [jitter, shimmer],
        [speech_duration, silence_duration, speech_ratio, pause_count]
    ])

    return features

def extract_features_df(audio_path):
    features = extract_features(audio_path)
    return pd.DataFrame([features], columns=all_feature_names)



# --- Model ile tahmin fonksiyonu ---

def predict_alzheimer_from_audio(audio_path, model_path=None):
    if model_path is None:
        # Bu dosyanın bulunduğu klasörden pkl klasörüne git
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        model_path = os.path.join(base_dir, "pkl", "pipeline.pkl")

    df = extract_features_df(audio_path)
    pipeline = joblib.load(model_path)
    prediction = pipeline.predict(df)[0]
    
    # Tahmin olasılığı düzgün çekiliyor mu kontrol et
    try:
        proba = pipeline.predict_proba(df)[0]
        proba_score = proba[prediction] if len(proba) > prediction else np.max(proba)
    except Exception as e:
        print(f"predict_proba çalışırken hata: {e}")
        proba_score = 0.0

    return prediction, proba_score



