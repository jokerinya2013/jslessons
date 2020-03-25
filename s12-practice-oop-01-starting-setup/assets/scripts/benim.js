const activeProjectSection = document.getElementById('active-projects');
const finishedProjectSection = document.getElementById('finished-projects');
const activeList = activeProjectSection.querySelector('ul');
const finishedList = finishedProjectSection.querySelector('ul');

class ProjectItem {
  constructor(id, exInfo, header, info, done) {
    this.id = id;
    this.exInfo = exInfo;
    this.class = 'card';
    this.header = header;
    this.info = info;
    this.done = done;
  }
}

class Render {
  constructor(projects) {
    this.projects = projects;
  }

  changeList(listEl, finishBtn) {
    for (const project of this.projects) {
      if (project.id === listEl.id) {
        project.done = !project.done;
        finishBtn.innerHTML =
          finishBtn.innerHTML === 'Activate' ? 'Finish' : 'Activate';
        if (project.done === true) {
          finishedList.append(listEl);
        } else {
          activeList.append(listEl);
        }
      }
    }
  }

  createElement() {
    for (const project of this.projects) {
      const listEl = document.createElement('li');
      listEl.className = project.class;
      listEl.id = project.id;
      listEl.setAttribute('data-extra-info', project.exInfo);
      listEl.innerHTML = `
          <h2>${project.header}</h2>
          <p>${project.info}</p>
          <p class="extra" style="display: none;">${project.exInfo}</p>
          <button class="alt">More Info</button>
          <button>Finish</button>
      `;
      const moreInfo = listEl.querySelector('.extra');
      const morebtn = listEl.querySelector('.alt');
      morebtn.addEventListener('click', () => {
        moreInfo.style.display =
          moreInfo.style.display === 'block' ? 'none' : 'block';
      });
      const finishBtn = listEl.lastElementChild;
      finishBtn.addEventListener(
        'click',
        this.changeList.bind(this, listEl, finishBtn)
      );
      if (project.done === true) {
        finishedList.append(listEl); //demo
        finishBtn.innerHTML = 'Activate';
      } else {
        activeList.append(listEl); //demo
        finishBtn.innerHTML = 'Finish';
      }
    }
  }
}

class Projects extends Render {
  projects = [
    new ProjectItem(
      'p1',
      'Got lifetime access, but would be nice to finish it soon!',
      'Finish the Course',
      'Finish the course within the next two weeks.',
      false
    ),
    new ProjectItem(
      'p2',
      'Not really a business topic but still important.',
      'Buy Groceries',
      "Don't forget to pick up groceries today.",
      false
    ),
    new ProjectItem(
      'p3',
      'Super important conference! Fictional but still!',
      'Book Hotel',
      "Academind conference takes place in December, don't forget to book a hotel.",
      false
    ),
    new ProjectItem(
      'p4',
      'Oldu Şükür',
      'Sonunda Yapabildim',
      'Bu projeyi kendim yaptım şükürler olsun...',
      true
    )
  ];
}

const deneme = new Projects();
deneme.createElement();
//
// listeye göre ayarlama yapılacak
