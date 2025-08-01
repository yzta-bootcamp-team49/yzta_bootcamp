import requests
import os
import speech_recognition as sr

def audio_to_text(audio_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio, language='tr-TR')
    except Exception as e:
        text = f"Ses yazıya çevrilemedi: {e}"
    return text

# get_first_gemini_model fonksiyonu kaldırıldı

def analyze_audio_with_gemini(audio_path, prediction, proba):

    api_key = os.getenv("GEMINI_API_KEY")
    model_name = "models/gemini-1.5-flash"
    url = f"https://generativelanguage.googleapis.com/v1/{model_name}:generateContent?key={api_key}"

    transcript = audio_to_text(audio_path)

    prompt = (
        f"Bir makine öğrenmesi modeli, bir ses kaydının akustik özniteliklerine bakarak "
        f"Alzheimer riski analizi yaptı. Model sonucu: {prediction}. "
        f"Güven oranı: {proba:.2f}. "
        f"Sözün içeriği önemli değildir. "
        f"Bu sonucu hastaya ve yakınına açıklayan kısa, basit bir açıklama yaz."
    )

    data = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }

    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        result = response.json()
        try:
            text_output = result["candidates"][0]["content"]["parts"][0]["text"]
            return prediction, text_output
        except Exception as e:
            return prediction, f"Analiz alınamadı: {e}"
    else:
        return prediction, f"Analiz başarısız: {response.text}"
    
    """
    api_key = os.getenv("GEMINI_API_KEY")
    model_name = "models/gemini-1.5-flash"  # Güncel model adı
    url = f"https://generativelanguage.googleapis.com/v1/{model_name}:generateContent?key={api_key}"
    transcript = audio_to_text(audio_path)
    data = {
        "contents": [
            {"parts": [{"text": f"Bir makine öğrenmesi modeli, bir ses kaydının akustik özniteliklerine bakarak Alzheimer riski tespit etti. Sözün içeriği önemli değildir. Modelin tahmini: {prediction} (Güven: {proba:.2f}). Bu sonucu hastaya ve yakınına açıklayan kısa bir metin oluştur."}]}
        ]
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        result = response.json()
        risk_score = result.get("risk_score", "Bilinmiyor")
        analysis = result.get("analysis", str(result))
        return risk_score, analysis
    else:
        return "Bilinmiyor", f"Analiz başarısız: {response.text}" """