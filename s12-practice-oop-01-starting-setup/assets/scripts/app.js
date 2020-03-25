const activeProjectSection = document.getElementById('active-projects');
const finishedProjectSection = document.getElementById('finished-projects');
const activeList = activeProjectSection.querySelector('ul');
const finishedList = finishedProjectSection.querySelector('ul');

class ProjectItem {
  constructor(id, exInfo, header, info) {
    this.id = id;
    this.exInfo = exInfo;
    this.class = 'card';
    this.header = header;
    this.info = info;
  }
}

class Projects {
  projects = [
    new ProjectItem(
      'p1',
      'Got lifetime access, but would be nice to finish it soon!',
      'Finish the Course',
      'Finish the course within the next two weeks.'
    ),
    new ProjectItem(
      'p2',
      'Not really a business topic but still important.',
      'Buy Groceries',
      "Don't forget to pick up groceries today."
    ),
    new ProjectItem(
      'p3',
      'Super important conference! Fictional but still!',
      'Book Hotel',
      "Academind conference takes place in December, don't forget to book a hotel."
    )
  ];
}

const deneme = new Projects();
//
// listeye göre ayarlama yapılacak
