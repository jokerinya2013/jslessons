class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true); //tsm olarak kopyala
    element.replaceWith(clonedElement); //yer değiştir
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Tooltip {}

class ProjectItem {
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  connectMoreInfoButton() {}

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
