# yzta_bootcamp

🚀🚀Alzheimer Ses Analiz Web Uygulaması🚀🚀



📋 Proje Başlangıç Bilgileri


🎯Takım İsmi : Grup 49

--------------------
🎯Takım Rolleri:

    Sıla Sönmez	Scrum Master/ Developer
    
    Kerem ÖZCAN	Product Owner/ Developer
    
    Gül KARAMAN	Developer
    
    Oğuzhan Yusuf TOZLU	Developer
    
    Süleyman SARDOĞAN Developer
    
--------------------  
🎯Ürün İsmi:

Alzheimer Ses Analiz Web Uygulaması

--------------------
🎯Ürün Açıklaması:

Bu web uygulaması, Alzheimer hastalıklarının erken teşhisine yardımcı olmak amacıyla geliştirilmiştir. Kullanıcılar ses kayıtlarını sisteme yükleyerek yapay zeka destekli analiz gerçekleştirebilir. Analiz sonucunda kullanıcılara risk skoru ve açıklayıcı geri bildirimler sunulur. Tüm süreç kullanıcı dostu, modern bir web arayüzü ile yönetilir.

--------------------
🎯Ürün Özellikleri:

•	Kullanıcı kayıt ve giriş sistemi

•	Ses dosyası yükleme ve işleme

•	Google Gemini API ile yapay zeka destekli analiz

•	Risk skoru ve detaylı açıklama sunumu

•	Geçmiş analizlerin görüntülenmesi ve silinmesi

•	 Kullanıcıya özel istatistikler (yüksek/düşük risk sayısı)

•	Responsive, mobil uyumlu tasarım

•	 Şifre güvenliği (bcrypt ile hash) ve oturum yönetimi

--------------------
🎯Hedef Kitle:

•	 Nörolojik hastalıklar için ön tanı almak isteyen bireyler

•	 Alzheimer hastalığı geçmişi olan kullanıcılar

•	 Doktorlar, klinikler ve sağlık uzmanları

•	 Sağlık alanında araştırma yapan akademisyenler

•	 Dijital sağlık uygulamaları ile ilgilenen teknoloji kullanıcıları

--------------------
⚙️ Teknik Detaylar:

•	Backend Teknolojisi: Python, FastAPI, SQLAlchemy, Starlette

•	Backend Teknolojisi: Python, FastAPI, SQLAlchemy, Starlette

•	Frontend: Bootstrap 5, Jinja2 HTML şablonları

•	Veritabanı: SQLite (kolay geçişli PostgreSQL mimarisiyle uyumlu)

•	API Entegrasyonu: Google Gemini API ile ses analiz desteği

•	Şifreleme: passlib ile bcrypt hash algoritması

•	Oturum Yönetimi: Starlette SessionMiddleware

•	Dosya Yönetimi: audio_uploads/ klasöründe UUID ile isimlendirilmiş dosya yapısı

•	Çevresel Değişkenler: .env içinde saklanır (GEMINI_API_KEY,SECRET_KEY)




°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


📝 Sprint 1

📌Tahmin Edilen Tamamlanacak Puan:

Toplam 20 puanlık iş hedeflenmiştir. Puanlama Planning Poker yöntemi ile belirlenmiştir.

--------------------
📌Tahmin Mantığı:

Sprint başında kullanıcı hikayeleri detaylı olarak analiz edildi. Karmaşıklık, bağımlılık ve yapılabilirlik kriterlerine göre Planning Poker yöntemi ile puanlama yapıldı. API bağlantısı, ses işleme ve analiz işlemleri yüksek karmaşıklıkta olduğundan daha fazla puanla değerlendirildi.

--------------------

📌 Sprint Notları:

- Projenin temel amacı ve hedef kitlesi belirlendi.
- Takım üyeleri arasında görev dağılımı yapıldı.
- Kullanıcı hikayeleri (user story) oluşturularak **Product Backlog** içine yazıldı.

--------------------
📌Daily/Weekly Scrum:

Haftanın bir veya iki günü müsaitlik durumuna göre Google Meet üzerinden en az 1 saatlik toplantılar gerçekleştirildi. Aşağıda özet verilmiştir:


![WhatsApp Görsel 2025-07-06 saat 21 17 51_33609bbd](https://github.com/user-attachments/assets/b3fa3ee2-2aef-4bc6-a7ac-6e7008f22d05)

![WhatsApp Görsel 2025-07-06 saat 21 19 05_b14a8320](https://github.com/user-attachments/assets/5e6b30a4-2405-4e62-99e5-7c2a6cff4e9e)

![image](https://github.com/user-attachments/assets/0c5c8b2c-a160-434f-8cc5-424550b7c795)

--------------------
📌Screenshot


![image](https://github.com/user-attachments/assets/09ed1ecb-b8f6-48ed-a6a5-bd694d138b94)

![image](https://github.com/user-attachments/assets/d7833a07-48e8-4fcc-96ad-5f570615b311)

![image](https://github.com/user-attachments/assets/0c475c51-0492-4a78-918c-797675b7fede)

--------------------

📌 Sprint 1 Board

![image](https://github.com/user-attachments/assets/9466dfc7-6d56-4cd8-86de-e4e6296c754f)


📌Sprint Backlog URl
https://miro.com/app/board/uXjVIgwdcec=/

--------------------
📌Sprint Review:

Sprint 1 sonunda gerçekleştirilen Sprint Review toplantısında, geliştirilen modüller takım üyeleri tarafından demo edilmiştir. Kullanıcı arayüzü üzerinden kayıt ve giriş süreçlerinin başarıyla tamamlandığı, ses dosyalarının yüklendiği ve analiz sonucunda alınan risk skorlarının kullanıcıya sunulabildiği görülmüştür. Özellikle API bağlantısı ve analiz sonuçlarının görsel sunumu beğeni toplamıştır.
Ancak, geçmiş analizleri listeleme ve istatistik ekranlarının geliştirilmesi sprint süresi içinde tamamlanamamıştır. Bu modüller için geri bildirimler toplanmış, eksik kalan özelliklerin Sprint 2 kapsamına alınmasına karar verilmiştir.
Takım üyeleri tarafından geliştirilen ürünün fonksiyonel olduğu, kullanıcı deneyiminin beklentilere uygun ilerlediği, ancak mobil uyumluluk ve istatistik görselleştirmeleri gibi alanlarda gelişime açık olduğu değerlendirilmiştir.

--------------------
📌Sprint Retrospective:

•	Takım içi iş birliği güçlü şekilde devam ettirilecek.
•	Günlük toplantılarda elde edilen ilerleme kayıt altına alınacak.
•	Gelecek sprintlerde tamamlanamayan işler önceliklendirilecek.
•	Kod kalitesinin korunması adına karşılıklı kod gözden geçirme pratiği başlatılacak.


°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


📝 Sprint 2


📌 Tahmin Edilen Tamamlanacak Puan:

Sprint 2 kapsamında toplamda 45 puanlık iş planlanarak geliştirme sürecine dahil edilmiştir.
Puanlama süreci, ekip içinde karşılıklı değerlendirme ile gerçekleştirilmiş, karmaşık görevler için daha yüksek puan verilmiştir.

--------------------

📌 Tahmin Mantığı:

Sprint planlaması sırasında görevler teknik zorluk, dış bağımlılıklar ve ekip tecrübesi doğrultusunda analiz edilmiştir.
Ses verisi işleme, analiz ekranı tasarımı ve API bağlantısı gibi modüller, yüksek karmaşıklık ve öncelik taşıdığı için bu sprintte öne çıkarılmıştır. Tahminleme süreci için yine Planning Poker yöntemi kullanılmıştır.

--------------------

📌 Sprint 2 Notları :

-Projede bu sprint itibariyle ses verisi türleri ve sınıflandırma kriterleri netleştirildi.

-Takım üyeleri kendi uzmanlık alanlarına göre iş parçacıklarına yönlendirildi; teknik iş dağılımı optimize edildi.

-Geliştirilecek özelliklere ait kullanıcı hikayeleri güncellendi ve Product Backlog üzerinde detaylandırılarak sıralandı.

--------------------

📌Daily/Weekly Scrum:

Haftanın bir veya iki günü müsaitlik durumuna göre Google Meet üzerinden en az 1 saatlik toplantılar gerçekleştirildi. Aşağıda özet verilmiştir:


<img width="431" height="323" alt="image" src="https://github.com/user-attachments/assets/ff031f3f-9646-4661-b539-26cd28a6c9c5" />

<img width="472" height="504" alt="image" src="https://github.com/user-attachments/assets/d245fbee-62b2-40a7-8588-cffb5a7ab5c0" />

📌Screenshot:

![WhatsApp Görsel 2025-07-19 saat 00 05 03_5c3d530e](https://github.com/user-attachments/assets/d416f5ff-f726-4170-838a-fb1d487eeae6)

![WhatsApp Görsel 2025-07-19 saat 00 05 18_b83cabc7](https://github.com/user-attachments/assets/4d0baa04-ee73-466f-ac5f-315e0ec25bb4)

![WhatsApp Görsel 2025-07-19 saat 00 05 37_67c804ce](https://github.com/user-attachments/assets/03b091e8-0885-43fd-ac06-98404c275f30)

![WhatsApp Görsel 2025-07-19 saat 00 05 45_fe58b87d](https://github.com/user-attachments/assets/747779a2-7da3-4f7f-b126-d94293312a2e)

--------------------

📌 Sprint 2 Board:

<img width="1576" height="341" alt="image" src="https://github.com/user-attachments/assets/d6d90a08-49b6-4579-a398-f2319fab007a" />

--------------------

📌Sprint Backlog URl
https://miro.com/app/board/uXjVIgwdcec=/

--------------------

📌 Sprint 2 Review:

Sprint 2 sonunda planlanan işlerin büyük bir bölümü başarıyla tamamlandı. Özellikle ses verisi işleme alanında önemli teknik ilerlemeler kaydedildi. Mevcut ses veri seti, Voice Activity Detection (VAD) algoritması ile ön işleme tabi tutuldu ve analiz kalitesi artırıldı.

Tamamlanan işler:

• Kullanıcı giriş ve kayıt ekranı canlıya alındı.

• Ses yükleme arayüzü devreye alındı.

• Risk skoru hesaplaması çalışır hale getirildi.

• Ses verilerinden MFCC, Jitter, Shimmer ve HNR gibi öznitelikler başarıyla çıkarıldı.

• Kullanılan sesler Mandarin dilinde olduğundan dil bağımsız bir model yaklaşımı benimsendi.

• Henüz tamamlanamayan bazı modüller (örneğin analiz silme ve geçmiş test listeleme) bir sonraki sprintte önceliklendirilecek.

• Ekip, teknik detayları başarıyla ele almış, hedeflenen ilerleme büyük oranda sağlanmıştır.


--------------------

📌Sprint 2 Retrospective:

Sprint sonunda gerçekleştirilen takım değerlendirmesinde aşağıdaki görüşler öne çıktı:

• Ekip içi iletişim ve teknik koordinasyon oldukça başarılıydı.

• Özellikle MFCC ve gelişmiş ses parametreleri (Jitter, Shimmer, HNR) üzerine yapılan çalışmalar, ekip üyelerinin ses işleme konusundaki yetkinliğini artırdı.

• Gerçek zamanlı ses analizi fikri, hem teknik sınırlar hem de zaman yönetimi açısından sprint dışına çıkarıldı (Rejected). Bu karar, kaynakların daha verimli kullanımını sağladı.

• Backend ve frontend geliştirme arasında daha net bir sınır çizilmesi gerektiği fark edildi. Bu doğrultuda görev dağılımı yeniden gözden geçirilecek.

• Kod revizyonları, sprint ortasında yapılacak ara kontrollerle desteklenecek.


°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


📝 Sprint 3


📌 Tahmin Edilen Tamamlanacak Puan:

Sprint 3 için toplam 35 puanlık iş belirlenmiştir. Bu sprintin amacı, önceki sprintlerden kalan görevleri tamamlamak, UI/UX iyileştirmeleri yapmak ve modeli son testlerden geçirerek projeyi bitirmek olmuştur.

--------------------

📌 Tahmin Mantığı:

Bu sprintte planlanan işler, önceden başlatılıp tamamlanamayan modüller ve son iyileştirmelerden oluşmuştur.
Kullanıcı arayüzü düzenlemeleri, analiz silme özelliği ve admin panel tasarımı gibi görevler dahil edilmiştir.
Karmaşıklık düzeyi daha düşük olan görsel ve UI düzenlemeleri düşük puan alırken, admin panel geliştirme gibi görevler daha yüksek puanla değerlendirilmiştir..

--------------------

📌 Sprint 3 Notları :

-Frontend iyileştirmeleri tamamlandı; responsive tasarım ve modern UI düzenlemeleri yapıldı.

-Product Backlog üzerinde detaylandırılarak görevler tamamlandı.

-Model son testleri yapıldı, doğruluk oranı ve performans raporlandı.

-Proje teslim aşamasına getirildi; final sunumu için hazırlıklar başlatıldı.


--------------------

📌Daily/Weekly Scrum:

<img width="433" height="392" alt="image" src="https://github.com/user-attachments/assets/6b0de61a-e281-41fc-b9ac-683c1f0c77ce" />
<img width="431" height="32" alt="image" src="https://github.com/user-attachments/assets/7a72430e-7b4f-45f0-b78f-0f3cd3db3866" />
<img width="449" height="372" alt="image" src="https://github.com/user-attachments/assets/c44c4757-e8e2-4de0-944d-31fdad9d41ae" />

--------------------

📌Screenshot:

![WhatsApp Görsel 2025-07-23 saat 17 13 40_71ff9eb4](https://github.com/user-attachments/assets/2c553c4e-48fb-4e8a-b1b4-614a4a2b8ed1)

![WhatsApp Görsel 2025-07-23 saat 17 13 50_f6913e11](https://github.com/user-attachments/assets/70429fb2-f31c-4155-a47b-cd05a2b86774)

![WhatsApp Görsel 2025-07-23 saat 17 12 07_26ceb62f](https://github.com/user-attachments/assets/6386b2a0-562f-4410-9f4c-0a99c3c8b24e)


--------------------

📌 Sprint 3 Board:

<img width="1382" height="295" alt="image" src="https://github.com/user-attachments/assets/ba8d0693-fc0e-4793-a48f-0f70cc43544d" />


--------------------

📌Sprint Backlog URl
https://miro.com/app/board/uXjVIgwdcec=/

--------------------

📌 Sprint 3 Review:

Sprint 3, projenin tamamlanma aşaması olarak planlandı ve büyük ölçüde başarıyla tamamlandı.
Bu sprintte ana odak noktası, model entegrasyonu, analiz sonuç ekranının tamamlanması, detaylı rapor üretimi ve admin panelinin ilk sürümünün hazırlanması oldu.

Tamamlanan işler:

•Makine öğrenmesi modeli backend’e entegre edildi ve Alzheimer, Hafif Bilişsel Bozukluk ve Sağlıklı olarak 3 sınıflı tahmin yapılabiliyor.

•Kullanıcı ses yükleme ve analiz süreci tamamen sorunsuz hale getirildi.

•Detaylı analiz raporu Gemini API ile oluşturulup, kullanıcıya açıklama ve tavsiye şeklinde gösterildi.

•Frontend iyileştirmeleri tamamlandı; responsive tasarım eklendi.

•Parkinson analizi veri seti sorunu nedeniyle proje kapsamından çıkarıldı.

•Proje sunuma hazır hale getirildi; final testleri ve hata düzeltmeleri yapıldı.

--------------------

📌Sprint 3 Retrospective:

Sprint sonunda ekip tarafından yapılan değerlendirmelerde aşağıdaki noktalar öne çıktı:

• Ekip çalışması ve iletişim güçlü şekilde devam etti, tüm kritik işlevler başarıyla tamamlandı.

• Model entegrasyonu ve sınıflandırma doğruluğu hedeflenen seviyeye ulaştı, proje ana amacı gerçekleşti.

• Gemini API entegrasyonu sayesinde analiz raporlarının kalitesi arttı, kullanıcıya değer katan bir çıktı sağlandı.

• Parkinson tespit modülü için gerekli veri setleri sağlanamadı; bu nedenle kapsamdan çıkarıldı.

• Kod gözden geçirme (code review) süreci, sprint ortasında yapıldığı için kalite kontrol daha iyi sağlandı.



