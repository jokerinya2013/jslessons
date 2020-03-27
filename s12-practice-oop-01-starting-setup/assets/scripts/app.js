class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true); //tam olarak kopyala
    element.replaceWith(clonedElement); //yer değiştir
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: 'smooth' }); // hazır fonksiyon bu ekranı elman üzerine getir demek
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element); for older browsers
    }
  }
  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier(); //aşağıda showMoreInfoHandler ın içindeki fonk çalıştırıyoruz trigger ediyoruz
  };

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    // tooltipElement.textContent = this.text; //başlangıçta böyleydi bir şeyler göstermek için değiştirdi.
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop; //parentin scroll unu öğreniyouz bu sayede tooltip uzaklaşmasın

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px'; //500px
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement; // yukarıda silebilmek için burada buna atadı
  }
}

class ProjectItem {
  hasActiveToolTip = false; //aynı anda birden fazla tooltip açmayı engellemek için

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveToolTip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveToolTip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveToolTip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    let moreInfoBtn = projectItemElement.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${this.type}-projects li`); //tüm li seçmeyi sağlar
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId); // indexi bulduk
    // this.projects.splice(projectIndex, 1); //indexten böl
    this.switchHandler(this.projects.find(p => p.id === projectId)); // elemanı gönderiyoruz bulup
    this.projects = this.projects.filter(p => p.id !== projectId); //yorum halilne gelmiş işlemin kısası
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    ); //func ı atıyoruz direk
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList) //p.func.bind(p) şeklinde yapmak zorundasın
    );
    // document
    //   .getElementById('start-analytics-btn')
    //   .addEventListener('click', this.startAnalytics); burası button a bağlı tag ekleme yapıyordu değiştirdik
    const timerId = setTimeout(this.startAnalytics, 3000); // 3sn sonra başlıyor, id döner
    document
      .getElementById('stop-analytics-btn')
      .addEventListener('click', () => {
        clearTimeout(timerId);
      });
  }
  // scipt tag yapabiliriz
  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init(); //static olduğu için bu şekilde çalıştırabildik

//
//
// Notlar
// static dışarıdan erişime açar fonksiyonu,
// this ile çalışmaz this global dir burada obj içi this e ulaşamayız
// getter fonksiyonlar, özelliğin değeri istendiğinde,
// setter fonksiyonlar ise özelliğin değeri değiştirilmek istendiğinde çalıştırılır.
// new ile çağrıldığında constructor() func çalıştırıyor. bundan yararlanabilirsin.
//  iç içe class kullanımına çalışmalısın
//
// notlar for section-13
// html içinde data-herhangi-bir-şey diye attributes tanımlarız
// domelement.dataset.herhangiBirŞey şeklinde js içinde bu tanımlamaya ulaşırız
// önemli yazı camelCase e dönüştürülür otomatik olarak
//
// script tag ile script atamak pek güvenli olmayabilir diyor o yüzden dikkatli olmak gerekiyor diyor
// setTimeout(fonksiyon, zaman, [arguments]) --> bu arguments fonksiyon geçmek istediğimiz arugmentler oluyor
// ÇOK ÖNEMLİ setTimeout bir id döner bu yüzden onu bir const a atayabiliriz
//
// location (.href, .host) vs bir sürü özellik var
// history (.back(), .forward(), go(kaçbasamak)) routerın atası
// navigator.geolocation.getCurrentPosition(data => {console.log(data)}) ile location bilgisi alırsın
//
// const date = new Date(); atanıp birçok özellik kullanılabilir. new Date() ms olarak verir
// date.getTime() ms cinsinden number olarak verir since jan 1st 1970 den bu yana
// date.getDay() getHours() getFullYear()
// new Date('12/25/2019 23:30:00'); Bu şekilde içine tanımlama yapabilirsin
// Wed Dec 25 2019 23:30:00 GMT+0300 (GMT+03:00) böyle bir dönüş verir
//
// new Error('Something went wrong'); şeklinde error mesaji yayınlayabiliriz.
// throw 'An error!' benzeri bir durumdur. throw da kodun uygulamasını tamamen durdurur
// throw new Error('mesaj'); şeklinde kullanım hatanın nerede olduğunu verdiği içinde candır
// consta atayıp içine code koyabilirsin.size js e bak
