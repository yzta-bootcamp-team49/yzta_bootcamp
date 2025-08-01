# Alzheimer Ses Analiz Web Uygulaması

Bu proje, insan ses kayıtlarını analiz ederek Alzheimer hastalığı konusunda erken teşhise yardımcı olmayı amaçlayan, Python (FastAPI) tabanlı, modern ve kullanıcı dostu bir web uygulamasıdır. Kullanıcılar sisteme kayıt olabilir, ses kaydı yükleyip analiz ettirebilir, geçmiş analizlerine erişebilir ve silebilirler. Tüm işlemler tek bir Python projesinde, modern bir arayüzle sunulmaktadır.

---

## Özellikler
- **Kullanıcı Kayıt & Giriş:** Ad, soyad, e-posta, telefon ve şifre ile üyelik ve güvenli giriş.
- **Ses Yükleme & Analiz:** Kullanıcılar ses dosyası yükler, Gemini API ile analiz edilir (risk skoru + detaylı açıklama).
- **Geçmiş Testler:** Kullanıcıya özel tüm analiz geçmişi ve ses dosyaları saklanır, listelenir ve silinebilir.
- **Modern Arayüz:** Bootstrap ile responsive, şık ve kolay kullanılabilir arayüz.
- **Kullanıcıya Özel İstatistikler:** Toplam test, yüksek/orta/düşük riskli test sayısı.
- **Güvenlik:** Şifreler hashlenir, oturum yönetimi güvenli şekilde yapılır.
- **Logo ve Renk Uyumu:** Proje logosu ve modern renk paletiyle profesyonel görünüm.

---

## Kurulum ve Çalıştırma Adımları

Aşağıdaki adımları izleyerek uygulamayı kendi bilgisayarınızda kolayca çalıştırabilirsiniz:

### 1. Proje Klasörüne Girin
```powershell
cd C:\Users\User\Desktop\proje_bootcamp\backend
```

### 2. Sanal Ortamı Temizleyin ve Yeniden Oluşturun
```powershell
Remove-Item -Recurse -Force venv
python -m venv venv
venv\Scripts\activate
```

### 3. Gerekli Paketleri Yükleyin
```powershell
pip install -r requirements.txt
```

### 4. .env Dosyasını Oluşturun
`backend` klasöründe `.env` dosyası açın ve şunları ekleyin:
```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
SECRET_KEY=supersecretkey123
```

### 5. Veritabanı Tablolarını Oluşturun
```powershell
python
```
Python konsolunda:
```python
from database.db import Base, engine
import models.user, models.audio
Base.metadata.create_all(bind=engine)
exit()
```

### 6. Sunucuyu Başlatın
```powershell
uvicorn main:app --reload --port 8080
```

### 7. Web Arayüzünü Açın
Tarayıcıda şu adresi açın:
```
http://127.0.0.1:8080/
```
veya
```
http://localhost:8080/
```

---

## Kullanım
- Kayıt ol, giriş yap, ses yükle, analiz sonucu gör, geçmişi görüntüle ve sil.
- Hata alırsanız, terminaldeki hata mesajını kontrol edin ve gerekirse yardım alın.

---

## Teknik Detaylar
- **Backend:** Python, FastAPI, SQLAlchemy, Jinja2, Starlette, Bootstrap
- **Veritabanı:** SQLite (kolayca PostgreSQL'e geçiş yapılabilir)
- **API Entegrasyonu:** Google Gemini API (anahtar `.env` dosyasında saklanır)
- **Şifreleme:** `passlib` ile bcrypt hash
- **Oturum Yönetimi:** Starlette SessionMiddleware
- **Dosya Yükleme:** `audio_uploads/` klasöründe saklanır.
- **Statik Dosyalar:** `static/` klasöründe logo ve CSS/JS
- **HTML Şablonları:** `templates/` klasöründe Jinja2 ile
- **Test Dosyaları:** `test_audio/` klasöründe verilmiştir.(AD:Alzheimer,MCI:Hafif Bilişsel Bozukluk,HC:Sağlıklı)

---

## Klasör Yapısı
```
backend/
├── audio_uploads/         # Analiz edilen ses dosyaları
├── database/              # Veritabanı bağlantısı
├── models/                # SQLAlchemy modelleri
├── pkl/                   # Model pipeline pkl'si 
├── static/                # Logo ve statik dosyalar 
├── templates/             # Jinja2 HTML şablonları
├── test_audio/             # Test yapmanız için örnek ses kayıtlarımız
├── utils/                 # Yardımcı fonksiyonlar (JWT, şifre, Gemini API,Model)
├── main.py                # FastAPI ana dosya
├── requirements.txt       # Bağımlılıklar
├── .env                   # API anahtarı ve gizli anahtarlar
└── README.md
```

---

## Notlar
- **Gemini API anahtarınızı** güvenli şekilde saklayın, kimseyle paylaşmayın.
- **Kullanıcı şifreleri** asla düz metin olarak saklanmaz, hashlenir.
- **Proje logosu** ve renk paleti, arayüzde profesyonel bir görünüm sağlar.
- **Herhangi bir hata veya geliştirme isteğinizde** issue açabilirsiniz.


---

## Lisans
Bu proje eğitim ve araştırma amaçlıdır. Dilerseniz kendi projelerinizde kullanabilirsiniz. 