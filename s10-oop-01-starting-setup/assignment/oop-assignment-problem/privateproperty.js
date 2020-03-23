//1
// bunu private property için koydum sadece
// _ olanları # ile değiştireceğim. bu sayede dışarıdan _price/#price a erişemeyeceğim.
// browser desteği zayıf şu an
class Course {
  #price; //başta bu şekilde tanımlanması gerekiyor

  get price() {
    return '$' + this.#price;
  }
  // #price is number oldu, price is "$55 oldu"
  set price(value) {
    if (value < 0) {
      throw 'Invalid value!';
    }
    this.#price = value;
  }

  constructor(title, length, price) {
    this.title = title;
    this.length = length;
    this.price = price;
  }

  findHowManyHoursWillYouGet(finder) {
    this.adjustPrice = finder;
    const hours = this.length / this.#price;
    console.log('Your hourly pay ', hours, 'dolars');
    console.log('You will get ' + this.#price + ' by findhowmanyhours');
    console.log(this.#price, this.price); // 55 "$55"
  }

  summary() {
    console.log(`
      Name: ${this.title},
      Length: ${this.length},
      Price: ${this.price}.
      Enroll now!     
        `);
  }
}

class PracticalCourse extends Course {
  // kendi params ı olduğu için süper kullanmalı
  constructor(numOfExercises, ...others) {
    super(...others);
    this.numOfExercises = numOfExercises;
  }
}

class TeoreticalCourse extends Course {
  // kendi paramsı yok o yüzden süpere gerk yok
  publish() {
    console.log('Publishing...');
  }
}

class App {
  static init() {
    // 1
    const jsSuper = new Course('JS Course', 52, 55);
    console.log(jsSuper);
    const node = new Course('Node JS', 40, 40);
    console.log(node);
    // 2
    jsSuper.findHowManyHoursWillYouGet(1);
    node.summary();
    // 3
    const pratical = new PracticalCourse(12, 'Pratik', 50, 50);
    pratical.summary();
    const teorik = new TeoreticalCourse('Teorik', 25, 25);
    teorik.summary();
    teorik.publish();
    // 4
    pratical.price = -50; // _price sette yaptığımız değer olarak kullanılır.
  }
}

App.init();
