import requests
import os

def analyze_audio_with_gemini(audio_path):
    api_key = os.getenv("GEMINI_API_KEY")
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + api_key
    files = {'file': open(audio_path, 'rb')}
    data = {
        "contents": [
            {"parts": [{"text": "Lütfen bu ses kaydını Alzheimer ve Parkinson riski açısından analiz et. Risk skoru ve detaylı açıklama ver."}]}
        ]
    }
    response = requests.post(url, files=files, json=data)
    if response.status_code == 200:
        result = response.json()
        # Burada Gemini API'nin dönen formatına göre risk skoru ve açıklama ayrıştırılır
        # Örnek olarak:
        risk_score = result.get("risk_score", "Bilinmiyor")
        analysis = result.get("analysis", "Açıklama yok")
        return risk_score, analysis
    else:
        return "Bilinmiyor", "Analiz başarısız: " + response.text 