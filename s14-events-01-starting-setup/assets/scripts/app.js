class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: 'smooth' });
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
      // this.element.parentElement.removeChild(this.element);
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
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px'; // 500px
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag(); // ilk oluşturulduğunda eklensin diye burada çağırdım
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
  // 1 html 2 burası
  // 6 da burada
  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id); //mdn den ayrıntılarına bakılabilir
      event.dataTransfer.effectAllowed = 'move'; //mdn den ayrıntılarına bakılabilir
    });

    // 6
    item.addEventListener('dragend', event => {
      console.log(event);
    });
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      'button:first-of-type'
    );
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
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
    this.connectDroppable(); // yine ilk oluşturmada çalıştırsın istiyoruz
  }
  // 3
  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`); // ul i seçtik
    // dragenter optional
    list.addEventListener('dragenter', event => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        //burada ektra kontrol yapabiliriz demek için koydu. burada dataya ulaşamayız.
        //sadece types larına ulaşabiliriz
        list.parentElement.classList.add('droppable'); //sectiona bir class ekliyoruz
        event.preventDefault();
      }
    });
    // dragover zorunlu. preventDefault yapacağız
    list.addEventListener('dragover', event => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });

    // 4 dragleave li ul yi terkedince styling yapalım diye;
    list.addEventListener('dragleave', event => {
      // eğer list item i terketmişsem classı kaldır yaptıkk.
      // burada list kendisini seçiyor aslında
      if (
        //firefox
        event.relatedTarget.closest &&
        event.relatedTarget.closest(`#${this.type}-projects ul`) !== list
      ) {
        list.parentElement.classList.remove('droppable');
      }
    });

    // 5.drop
    list.addEventListener('drop', event => {
      event.preventDefault(); // for firefox
      const prjId = event.dataTransfer.getData('text/plain'); //aynı anda birden fazla secemem
      if (this.projects.find(p => prjId === p.id)) {
        return; // eğer li, ayrıldığı ul içindeyse hiç bir şey yapma
      } // aynı instance da ise yani
      //şimdi ayrıntılı kısım burada..
      // şuan içinde bulunduğumuz instancedan finish buttonuna tıklanmış gibi yapacağız.
      //yada diğer insance için function taşıyacağız. bu zor tabi.o yüzden button yolu yapacağız
      document
        .getElementById(prjId)
        .querySelector('button:last-of-type')
        .click();
      list.parentElement.classList.remove('droppable');
      // event.preventDefault(); //not required
    });
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
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter(p => p.id !== projectId);
  }
}

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

    // document
    //   .getElementById('stop-analytics-btn')
    //   .addEventListener('click', () => {
    //     clearTimeout(timerId);
    //   }); //timerı durdurduk..
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();

// Notlar(Drag and Drop)
// 1.make elements "draggable",
// 2.Listen "dragstart" event,
// 3.Accept drag with "dragenter" and "dragover". IMPORTANT add preventDefault()
// 4.(optional) For Styling: listen to "dragleave"
// 5.Listen to "drop" event and update data/ui
// 6.(optional) "dragend" event and update data/ui
//
// 1. html add attribute to element draggable="true"
// 2. element.addEventListener('dragstart')--> ile elmanın seçildiği js e bildirilir
//  bu aşamada event.dataTransfer.setData('tür', 'bilgi') şeklinde tanımlama yaparız
//  event.dateTransfer.effectAllowed = 'move' yaparız. yani tamamen element i taşıyacağız
// 3. drop area belirleyeceğiz. genelde bu parent element olur. preventDefault burada..
//  "dragenter" ve "dragover" ı bu aşamada yapıyoruz. dragenter optional ama diğeri zorunlu
// 4. eleman ayrıldığı zaman styling yapabilmek için "dragleave" belirliyoruz
// 5. drop element
// 6. dragend işlem tamamlanınca neler oluyor ona bakalım
//  event.dataTransef.dropEffect = 'none' ise işlem olmadı demektir.
