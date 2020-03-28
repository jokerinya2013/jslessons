// section 12 bu izlediğim yerlerden alınmış notlar

class DOMHelper {
  // burada dom işlemlerini tek çatı altına topladık.
  static clearEventListener(element) {
    // buradaki işlemler ekstra event listenerları silmek için yapılıyor. önce clonladık sonra yer değiştridik.
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destination = document.querySelector(newDestinationSelector);
    destination.append(element);
    element.scrollIntoView({ behavior: 'smooth' }); // ready to use function. brings element into the viewport
  }
}

class Component {
  // eğer hostElementId gelirse ona gelmezse body e ekle
  // ikici params gelmezse false kabul et demek.
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore; //öne mi ekleyim sona mı?
  }

  detach() {
    this.element.remove();
    // this.element.parentElement.removeChild(this.element);  ----> bu eski browserlar için
  }
  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunc, tooltipText, hostElementId) {
    super(hostElementId); //eklenecek olan idyi gönderiyoruz
    // closeNotifierFunc itemdan geliyor. hasActiveTooltip i false yapan func
    this.closeNotifier = closeNotifierFunc; //gelen func kendi instance ımıza ekledik.
    this.text = tooltipText;
    this.create();
  }
  closeTooltip() {
    // hem detach ı hem notifier ı çalıştırdım
    this.detach();
    this.closeNotifier();
  }

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    // içeriğini textContent değilde başka türü koyacağız //text aşağıdan itemdan dataset olarak geldi.
    const tooltipTemplate = document.getElementById('tooltip'); //template tagli yeri seçtik
    const tooltipBody = document.importNode(tooltipTemplate.content, true); // içeriği kopyaladık
    tooltipBody.querySelector('p').textContent = this.text; // bu içerikten p'yi seçiyoruz
    tooltipElement.append(tooltipBody); // tooltip div olarak seçmiştik. içeriği içine koyuyoruz

    // console.log(this.hostElement.getBoundingClientRect()); //this.hostElement aslında "component"ta
    const hostElementLeft = this.hostElement.offsetLeft; // ana elemanın soldan mesafesi (p1, p2)
    const hostElementTop = this.hostElement.offsetTop; // yukarıdan mesafesi
    const hostElementHeight = this.hostElement.clientHeight; // kendi uzunluğu (çünkü tabana koymak istiyoruz)
    const parentElementScrolling = this.hostElement.parentElement.scrollTop; // scroll yapılmışsa onu bulduk

    const x = hostElementLeft + 20;
    const y = hostElementTop + hostElementHeight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';

    // tooltipElement.addEventListener('click', () => {
    //   tooltipElement.remove();
    // });
    // yukardıdaki de çalışıyor. ama max bu şekilde yaptı..
    tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
    this.element = tooltipElement; // hem tooltip hem component class ında kullanabilmek için buraya atadık
  }

  // tooltip i eklerken önceden açık mı diye kontrol etmek için aşağıları yazdıktan sonra hasActiveTooltip diye prop belirledik
}

class ProjectItem {
  hasActiveTooltip = false; // her item için başlangıçta false tabiki
  constructor(id, updateProjectListFunction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunction; // bu aşağıdan gelen switchProject func ı aslında.
    //tek projeye buttonların efekti ekleneceği için cons içinde bu fonksları çağıramam lazımki eklenmiş olsun.
    this.connectMoreInfoButton();
    this.connectSwithButton(type);
  }

  showMoreInfoHandler() {
    if (!this.hasActiveTooltip) {
      const projectElement = document.getElementById(this.id); //p1, p2 seçiyoruz
      const tooltipText = projectElement.dataset.extraInfo; // dataset te yer alan bilgiyi seçiyoruz
      // şimdi asıl ince kısım burada. ProjectItem ın bir ögesini tooltip ile değiştirebilmek için
      // bu işlemi yapan fonksiyonu her tooltip e atıyoruz
      const tooltip = new Tooltip(
        () => {
          this.hasActiveTooltip = false;
        },
        tooltipText,
        this.id
      ); //yeni bir tooltip oluştur dedik. ananomous func, text ve id ekledik
      tooltip.attach(); // oluşturulan tooltipdeki attach methodunu çalıştırdık.
      this.hasActiveTooltip = true;
    }
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id); // p1-p2 ile "li" çağıdım.
    const moreInfoBtn = projectItemElement.querySelector(
      'button:first-of-type'
    ); //ilk buttonu çağırdım.
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  connectSwithButton(type) {
    const projectItemElement = document.getElementById(this.id); // p1-p2 ile li çağıdım.
    let switchBtn = projectItemElement.querySelector('button:last-of-type'); //son buttonu çağırdım.
    switchBtn = DOMHelper.clearEventListener(switchBtn); // yeniden button clone layıp koyduk aslında
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListHandler.bind(null, this.id)
    );
    //buraya eklediğim func List itema ait. yukarıdan constructor ile getirdik onu
  }
  // aşağıdki işlem button üzerinde kalan event listenerları topluca temizleyebilmek için. addProjecten geliyor.
  update(updateProjectListFn, type) {
    this.updateProjectListHandler = updateProjectListFn;
    this.connectSwithButton(type);
  }
}

class ProjectList {
  projects = []; // kendi arrayını oluştursun
  constructor(type) {
    this.type = type;
    //atama yapılır yapılmaz işleme alsın
    const prjItems = document.querySelectorAll(`#${type}-projects li`); //list itemları getir. query all ile
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.swicthProject.bind(this), this.type)
      ); //nodelist de "id" e bu şekilde ulaşabiliriz.
      // instanslar arası değişimi yapacak fonk her buttona bağlamak için Project Item a iletiyoruz.
      // aşağıda param alıyor burada direk ilettiğimiz için param kısmını koymaya gerek yok. yukarıda koyuyoruz
    }
    console.log(this.projects);
  }
  setSwitchHandlerFunction(swicthHandlerFunction) {
    this.switchHandler = swicthHandlerFunction; // her instance diğerinden gelen bir fonk taşıyor. bunu koyduk
    // swicthHandlerFunction aşağıdan gelen fonksiyon. yani diğer instance ın addProject function ı
    // peki neden cons içinde çağırmadık? çünkü her instance oluştuktan sonra aşağıda static içinde çağımamız
    // gerekiyor o yüzden. yani iki instanceın önce oluşması lazım çağırabilmemiz için.
    // eğer constructor(type, callbackfunc) şeklinde yollasaydık, func diğer instance ın func olduğu için hata alırdık
  }
  addProject(project) {
    // her ne kadar burada bulunsa da aslında bu diğer instance ait işi yapacak
    this.projects.push(project);
    // Dom değişim işlemini yukarıda yaptırıyoruz
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);

    // aşağıda yaptığımız işlemler buttona eklenmiş kalmış olan event listener daki func düzenlemek için.
    // önce projecte yeni update diye bir fonk ekledik.
    project.update(this.swicthProject.bind(this), this.type);
  }

  swicthProject(projectId) {
    // bu fonksiyonu switch button a eklemeliyiz bu yüzden yukarıda gönderiyoruz.
    // örn active instancedayken, önce projects listesinden bu item ı bulacak
    // sonra yukarıdaki diğer instanceın yani finished ın addProject tini çağırarak
    // o fonksiyonun eklemesini sağlayacak. sonra da hali hazırdaki project den çıkaracak

    this.switchHandler(this.projects.find(p => p.id === projectId));
    // bu swicthHandlerFunction demek aslında o ise diğer instance dan geliyor
    //bu aslında diğer instansın addProjectini çalıştırıyor

    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    // yukarıdaki gibi yapmamızın sebebi project başta array olarak tanımlansada obj olduğu için
    // splice ile direk index i bulamayız o yüzden ama aşğısı zaten yukarıdakinin kısa versiyonu
    this.projects = this.projects.filter(p => p.id !== projectId); // projects den eşitse düşür, değilse kalsın
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    // active instance a finished ın add projectını gönderdik
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
