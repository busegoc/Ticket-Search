#Ticket Search
React ile oluşturduğum projem npm start komutu ile çalışmaktadır. Projemde Material UI kullandım ve react router ile gerekli route verme işlemlerini tamamladım. Giriş yapmak isteyen kullanıcı hesabı yoksa hesabını oluşturuyor. Hesap bilgileri Local Storage ile saklanıyor ve giriş yap sayfasına kayıt işlemi tamamlanmış kullanıcılar yönlendiriliyor. Burada kullanıcı bilet arama işlemi yapabiliyor ve çıkan sonucun detay sayfasına giderek burada koltuk seçimi yapıyor ve ödemeleri tamamladıktan sonra ödeme başarılı uyarısı alıyor. Bu uyarıdan sonra isterse farklı bir sefer aramak için arama sayfasına dönebileceği bir buton bulunuyor.

Arama Yapılabilecek Uygun Sefer Bilgileri:
[
    {
        "kalkis": "Ankara",
        "varis": "Istanbul",
        "tarih": "2024-01-10"
    },
    {
        "kalkis": "Istanbul",
        "varis": "Ankara",
        "tarih": "2024-01-09"
    },
    {
        "kalkis": "Istanbul",
        "varis": "Ankara",
        "tarih": "2024-01-10"
    },
    {
        "kalkis": "Ankara",
        "varis": "Izmir",
        "tarih": "2024-01-10"
    },
    {
        "kalkis": "Istanbul",
        "varis": "Izmir",
        "tarih": "2024-01-11"
    }
]
