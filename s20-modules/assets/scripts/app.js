import { ProjectList } from './App/ProjectList.js';

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
// html kısmına type="modules" eklenmeli bu dosya için
//  './' -> same file
//  '../' -> one file up
// '/' -> exact location
// aşağıdaki özellikler için ProjectList e a bak
// aynı dosyadan bazı funtionlar alınacağı zaman import {isim, isim} from 'dosyayolu/isim.js' şeklinde
// hepsini alacaksan aşağıdakini kullan, {isim, isim, isim} şeklinde tüm isimleri almaya çalışma
// import * as BENİMVERDİĞİMİSİM from 'dosyayolu.js' şeklinde alabiliriz. bundan sonra
// BENİMVERDİĞİMİSİM.isim() şeklinde dot notation kullanarak ilgili functionlara ulaşabiliriz
// import {orj as custom} from 'jşjşjşklj.js' --> artık heryerde custom şeklinde kullanabilirim

// export default will ignore the name of exported file
// eğer default export yapıyorsan, import yaptığın dosyada curly braces kullanmana gerek yok
// Tooltip ve Component buna örnektir
//
// default ve  non default edinimi ise şu şekilde olabilir
// import Custom, { doSomething } from './blabla.js';

// her file içinde sadece bir tane default export un olabilir
//
// static export yapmak yerine dinamik export ta yapabiliriz yani, herhangi bir tuşa basıldığında yüklemesini
// sağlayabiliriz. vue routerdaki lazy gibi ProjectItem a bakabilirsin, more info buttonu tıklanınca yükleme
// yapıyor
//
// modules içinde yer alan kod ilk yüklendiğinde ve sadece bir seferliğe mahsus çalışır
//
// global bir değişkene ihtiyaç duyduğun zaman globalThis i kullan diyor
