import numpy as np
import pandas as pd
from scipy.stats.mstats import winsorize

def log_transform(X):
    X = X.copy()
    log_cols = ['rmse_std', 'rmse_mean', 'centroid_mean']
    for col in log_cols:
        if col in X.columns:
            X[col + '_log'] = np.log1p(X[col])
    return X

def winsorize_transform(X):
    X = X.copy()
    win_cols = ['mfcc_std_12', 'speech_ratio','speech_duration','contrast_mean_1', 'zcr_std', 'zcr_mean', 'contrast_mean_6']
    for col in win_cols:
        if col in X.columns:
            X[col + '_win'] = winsorize(X[col], limits=[0.05, 0.05])
    return X

def drop_columns(X):
    X = X.copy()
    log_cols = ['rmse_std', 'rmse_mean', 'centroid_mean']
    win_cols = ['mfcc_std_12', 'speech_ratio','speech_duration','contrast_mean_1''zcr_std', 'zcr_mean', 'contrast_mean_6']
    win_cols_auto = [col.replace('_win', '') for col in X.columns if col.endswith('_win')]
    drop_cols = list(set(log_cols + win_cols + win_cols_auto))
    for col in drop_cols:
        if col in X.columns:
            X = X.drop(columns=[col])
    return X

def select_top_features(X):
    X = X.copy()
    top_features = [
        'mfcc_mean_1', 'contrast_mean_7', 'rmse_mean_log', 'mfcc_mean_3', 'jitter',
        'mfcc_mean_6', 'mfcc_mean_5', 'pause_count', 'speech_duration_win',
        'contrast_std_7', 'mfcc_std_5', 'pitch_mean', 'contrast_mean_1_win',
        'mfcc_std_1', 'contrast_mean_5'
    ]
    if not isinstance(X, pd.DataFrame):
        X = pd.DataFrame(X, columns=top_features)
    return X[top_features]