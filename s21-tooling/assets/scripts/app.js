import { ProjectList } from './App/ProjectList.js';

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
