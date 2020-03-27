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
  }
}

class Tooltip {}

class ProjectItem {
  constructor(id, updateProjectListFunction, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunction; // bu aşağıdan gelen switchProject func ı aslında.
    //tek projeye buttonların efekti ekleneceği için cons içinde bu fonksları çağıramam lazımki eklenmiş olsun.
    this.connectMoreInfoButton();
    this.connectSwithButton(type);
  }

  connectMoreInfoButton() {}
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
