import { ProjectList } from './App/ProjectList';

// eslint-disable-next-line no-undef
globalThis.isim = 'İbrahim';

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');

    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );

    // const timerId = setTimeout(this.startAnalytics, 3000);

    // document.getElementById('stop-analytics-btn').addEventListener('click', () => {
    //   clearTimeout(timerId);
    // });
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');

    analyticsScript.src = 'assets/scripts/Utility/Analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();

// notlar
// eslint: code kalitesi için yüklenir
// webpack: code u küçültür
// babel: ise kodun tüm browserlarda çalışmasını sağlar
// ctrl + shift + P ile eslint enable
// npm dosyası oluşturmak gerekiyor
// npm init ile kurulumu yapacağız.
// dosya adı vs. gibi package json a yazılacak bilgileri soruyor
// bu setup işleminden sonra ihtiyacımız olan packageları ekleyebiliriz
// npm install -g: globally ekler
// npm install --save-dev: projemize sadece development olarak ekler, build safhasında alınmaz
// npm install --save: local olarak çalıştığımız projemize ekler
// package-lock.json dosyasıyla ilgilenmene gerek yok
// node modules klasörün var, projeyi yüklerken bu silebilirsin yada
// yanlışlıkla silinebilir, bu durumda $npm install dediğinde package.json a bakarak ilgili
// dependency ları indirir
//
// ctrl + shift + P ile eslit configuration u aç, terminalden ilgili seçenekler gelecektir
// check syntax, find problems and enforce code style ı seçtik
// hangi modules ı kullanıyorsak onu soruyor, framework u soruyor
// bir çok ayaralama yapılabilir,
// preset indirmek istersek https://www.npmjs.com/search?q=eslint-config

//
// npm install --save-dev webpack webpack-cli ile webpack clini indiriyoruz
// webpack.config.js isimli bir dosya oluştur
// içindekileri node.js e ileteceğiz, bunu yapmak için normal js de kullandığımız export değilde
// bunun yerine module.exports kullanırız
// entry point ve output point belirlemen lazım.. bunun için tüm kodları srcye taşıdık
// output olarak da scripts dosyasını tanımladık
// sonra command line komutlarını düzenlemek için package.json a gideriz
// scripts kısmına "build": "webpack" ekledik. istersen "başkasisim": "webpack" yapabilirsin
// sonrasında npm run build işi görür
// birden fazla yerden js kullanımın olursa
// ----Instead of
// entry: './src/app.js'
// ----use
// entry: {
//     welcome: './src/welcome-page/welcome.js',
//     about: './src/about-page/about.js',
//     // etc.
// }
//
// lazy loading ile ilgili bir hata aldık onu düzelteceğiz şimdi
// ayarlamalardan sonra npm run build yapıyoruz
//
// npm install --save-dev webpack-dev-server ile yükledikten sonra
// package.json a "build:dev": "webpack-dev-server" ekledik,
// $npm run build:dev yazınca bunu çalıştırır.
// otomatik complie yapar kodu
//
// production olarak hazırlamak için yapmamız gereken ise yeni bir
// webpack.config.prod.js dosyası hazırlamak
// mode: production diyeceğiz
// sonra bu dosyayı yine webpack e ekleyeceğiz.
// "build:prod": "webpack --config webpack.config.prod.js" olarak ekledik bu şu demek
// webpack kullan, config olarak default olarak webpack.config.js değilde yazdığımı al
//
// her compile etmede yeni js file oluşturmaması için yeni bir plugin yükleyeceğiz
// npm install --save-dev clean-webpack-plugin
// yükledikten sonra kullanmak için webpack.confin.js de işlemler yaptık oraya bak

//
// normalde serverda ve browserda bizim js dosyamızı cache geçmişinden almasın diye,
// her seferinde farklı isim almasını sağlayabiliriz. bu çok iyi bir özellik
// bununla ilgili özelliği production config file a ekledik. [contenthash].js ismi ile
// yanlız burada değişen sayıyı index.html de düzeltip öyle projemizi yüklemeliyiz
