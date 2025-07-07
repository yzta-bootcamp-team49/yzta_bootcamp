# yzta_bootcamp

🚀🚀Alzheimer & Parkinson Ses Analiz Web Uygulaması🚀🚀

📋 Proje Başlangıç Bilgileri

🎯Takım İsmi : Grup 49

🎯Takım Rolleri:

    Sıla Sönmez	Scrum Master/ Developer
    
    Kerem ÖZCAN	Product Owner/ Developer
    
    Gül KARAMAN	Developer
    
    Oğuzhan Yusuf TOZLU	Developer
    
    Süleyman SARDOĞAN Developer
    
    
🎯Ürün İsmi

Alzheimer & Parkinson Ses Analiz Web Uygulaması

🎯Ürün Açıklaması

Bu web uygulaması, Alzheimer ve Parkinson hastalıklarının erken teşhisine yardımcı olmak amacıyla geliştirilmiştir. Kullanıcılar ses kayıtlarını sisteme yükleyerek yapay zeka destekli analiz gerçekleştirebilir. Analiz sonucunda kullanıcılara risk skoru ve açıklayıcı geri bildirimler sunulur. Tüm süreç kullanıcı dostu, modern bir web arayüzü ile yönetilir.

🎯Ürün Özellikleri

•	Kullanıcı kayıt ve giriş sistemi
•	Ses dosyası yükleme ve işleme
•	Google Gemini API ile yapay zeka destekli analiz
•	Risk skoru ve detaylı açıklama sunumu
•	Geçmiş analizlerin görüntülenmesi ve silinmesi
•	 Kullanıcıya özel istatistikler (yüksek/düşük risk sayısı)
•	Responsive, mobil uyumlu tasarım
•	 Şifre güvenliği (bcrypt ile hash) ve oturum yönetimi

🎯Hedef Kitle

•	 Nörolojik hastalıklar için ön tanı almak isteyen bireyler
•	Alzheimer/Parkinson hastalığı geçmişi olan kullanıcılar
•	 Doktorlar, klinikler ve sağlık uzmanları
•	 Sağlık alanında araştırma yapan akademisyenler
•	Dijital sağlık uygulamaları ile ilgilenen teknoloji kullanıcıları

⚙️ Teknik Detaylar

•	Backend Teknolojisi: Python, FastAPI, SQLAlchemy, Starlette
•	Backend Teknolojisi: Python, FastAPI, SQLAlchemy, Starlette
•	Frontend: Bootstrap 5, Jinja2 HTML şablonları
•	Veritabanı: SQLite (kolay geçişli PostgreSQL mimarisiyle uyumlu)
•	API Entegrasyonu: Google Gemini API ile ses analiz desteği
•	Şifreleme: passlib ile bcrypt hash algoritması
•	Oturum Yönetimi: Starlette SessionMiddleware
•	Dosya Yönetimi: audio_uploads/ klasöründe UUID ile isimlendirilmiş dosya yapısı
•	Çevresel Değişkenler: .env içinde saklanır (GEMINI_API_KEY,SECRET_KEY)



📝 Sprint 1

📌Tahmin Edilen Tamamlanacak Puan:
Toplam 21 puanlık iş hedeflenmiştir. Puanlama Planning Poker yöntemi ile belirlenmiştir.

📌Tahmin Mantığı:
Sprint başında kullanıcı hikayeleri detaylı olarak analiz edildi. Karmaşıklık, bağımlılık ve yapılabilirlik kriterlerine göre Planning Poker yöntemi ile puanlama yapıldı. API bağlantısı, ses işleme ve analiz işlemleri yüksek karmaşıklıkta olduğundan daha fazla puanla değerlendirildi.


📌 Sprint Notları
Projenin temel amacı ve hedef kitlesi belirlendi.
- Takım üyeleri arasında görev dağılımı yapıldı.
- Kullanıcı hikayeleri (user story) oluşturularak **Product Backlog** içine yazıldı.


📌Daily/Weekly Scrum:
Haftanın bir veya iki günü müsaitlik durumuna göre Google Meet üzerinden en az 1 saatlik toplantılar gerçekleştirildi. Aşağıda özet verilmiştir:

![WhatsApp Görsel 2025-07-06 saat 21 17 51_33609bbd](https://github.com/user-attachments/assets/b3fa3ee2-2aef-4bc6-a7ac-6e7008f22d05)

![WhatsApp Görsel 2025-07-06 saat 21 19 05_b14a8320](https://github.com/user-attachments/assets/5e6b30a4-2405-4e62-99e5-7c2a6cff4e9e)

![image](https://github.com/user-attachments/assets/0c5c8b2c-a160-434f-8cc5-424550b7c795)


📌Screenshot


![image](https://github.com/user-attachments/assets/09ed1ecb-b8f6-48ed-a6a5-bd694d138b94)

![image](https://github.com/user-attachments/assets/d7833a07-48e8-4fcc-96ad-5f570615b311)

![image](https://github.com/user-attachments/assets/0c475c51-0492-4a78-918c-797675b7fede)



📌 Sprint 1 Board

| ✅ Done                      |  🛠 In Progress                         | 📋 To Do                |
|------------------------------ |---------------------------|---------------------------------------|
| FastAPI backend               | İstatistik sayfası        | API request optimizasyonu             |
|  Sonuç ekranı                 | Geçmiş analiz ekranı      | Admin paneli                          |
|                               |   Ses yükleme ve analiz   |        



📌Sprint Review:
Sprint 1 sonunda gerçekleştirilen Sprint Review toplantısında, geliştirilen modüller takım üyeleri tarafından demo edilmiştir. Kullanıcı arayüzü üzerinden kayıt ve giriş süreçlerinin başarıyla tamamlandığı, ses dosyalarının yüklendiği ve analiz sonucunda alınan risk skorlarının kullanıcıya sunulabildiği görülmüştür. Özellikle API bağlantısı ve analiz sonuçlarının görsel sunumu beğeni toplamıştır.
Ancak, geçmiş analizleri listeleme ve istatistik ekranlarının geliştirilmesi sprint süresi içinde tamamlanamamıştır. Bu modüller için geri bildirimler toplanmış, eksik kalan özelliklerin Sprint 2 kapsamına alınmasına karar verilmiştir.
Takım üyeleri tarafından geliştirilen ürünün fonksiyonel olduğu, kullanıcı deneyiminin beklentilere uygun ilerlediği, ancak mobil uyumluluk ve istatistik görselleştirmeleri gibi alanlarda gelişime açık olduğu değerlendirilmiştir.


📌Sprint Retrospective:
•	Takım içi iş birliği güçlü şekilde devam ettirilecek.
•	Günlük toplantılarda elde edilen ilerleme kayıt altına alınacak.
•	Gelecek sprintlerde tamamlanamayan işler önceliklendirilecek.
•	Kod kalitesinin korunması adına karşılıklı kod gözden geçirme pratiği başlatılacak.





