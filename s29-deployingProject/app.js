//    ========================
// |||---------NOTLAR---------|||
//    ========================
//
// static web siteleri serverless diye geçen platformlara konabilir
// aws s3 ve firebase hosting bunlardandır
// static web page yükleme
// haritalar olan uygulamayı aktifleştirdim
// projeyi build yaptık,
// npm install -g firebase-tools ile firebase indirdik
// firebase login
// firebase init
// yeni proje oluşturduk(bu yeni proje firebasei kasdediyor)

// nodejs ile olan dosyanın aktarımına bakalım
// nodejs hosting ile arama yapıyoruz
// aws ve heroku olarak var
// heroku kullanacağız
// buna yüklemeyi "git" ile yapacağız, ilginç..
// heroku cli i bilgisayara indiriyoruz
// ilgili proje klasörümüzde git init ile başlatıp kayıt tutuyoruz. remote olarak heroku yu ayarlayacağız
// bunu ayarladıktan sonra hazır olan app mizi Procfile ve package.json ' a "start": "node app.js"
// yaparak ekliyoruz. ayrıca heroku, process.env.PORT u kendisi oluşturduğu için
// app.js de app.listen(process.env.PORT || 3000) olarak ayarlamamız gerekiyor
// mongo db de tüm ıp leri whitelist yap çünkü heroku ip atlıyor
// yerelde places practise de bilgileri aldığı 3000 den herokunun adresine değiştirdim,
