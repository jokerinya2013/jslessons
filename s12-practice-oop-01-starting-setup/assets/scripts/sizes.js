// Bu dersin ekinde çok güzel bir pdf var udemy den ona bakabilirsin
//
// Notlar
// getBoundingClientRect(); konumların yer aldığı obj verir. devtoolstan bakabilirsin
// top ve left solüst köşeden olan mesafeyi, bottom to right sağ alt köşeden olan mesafeyi verir burada
// .offsetTop document flow a göre üste olan uzunluğu verir. scroll ile değişmez (DOMRect deki x ve y gibi)
// .clientHeight; inner elemanın boyutlarını verir
// .offsetHeight border dahil uzunluğu verir(width de aynı)
// sayfa genişliğini scroll bar olmadan vermesi için "window.innerWidth" kullanmak uygun değil
// bunun yerine "document.documentElement.clientWidth" kullanmamız gerekir
// .parentElement.scrollTop; o anlık scroll değerini verir DİKKAT parent elemana çıkarak bulmak gerekir
// birşey.offsetLeft; ile birşey.offsetTop; o elemanını top-left corner ını verir
// scrollTo(0, 50); x ve y olarak scroll yaparız specific bir noktaya
// scrollBy(0, 50); bulunduğu notkadan scroll yapar specifik bir noktaya değilde
//
// scrollBy({left:0, top:50, behavior:'smooth'}) diyerek daha yumaşak bir geçiş yaptırabilirsin.
// left koymayabilirsin
// eleman.scrollIntoView(); bunda direk bu elemana zıplar, behavior : 'auto'  olduğu için hızlı gider
// eleman.scrollIntoView({ behavior: 'smooth' })
// <template></template> normalde render edilmez başlangıçta

class Component {
  infoArray = [];
  constructor(...infos) {
    for (const info of infos) {
      this.infoArray.push(info);
    }
  }
  listItems() {
    const newly = this.infoArray.map(el => {
      const li = document.createElement('li');
      li.textContent = el;
      return li;
    });
    return newly;
  }
}

class İsimYaz extends Component {
  constructor(ad, yaş, durum, hookId) {
    super(ad, yaş, durum);
    this.hookId = hookId;
  }
  yapıştır() {
    const hookEl = document.getElementById(`${this.hookId}`);
    for (const li of this.listItems()) {
      hookEl.append(li);
    }
  }
  degisim(ad) {
    // ad(); aşağısı ile aynı bu da afra çıktısı verir. diğer instance ın fonksiyonun bu şekilde kullanabiliriz
    this.yazdır = ad;
    this.yazdır();
  }
  yazdır() {
    console.log(this.hookId);
  }
}

const ibrahimcik = new İsimYaz('ibrahim', 30, 'Mutlu', 'ibo');
ibrahimcik.yapıştır();
const afracık = new İsimYaz('Afra', 29, 'Fena Değil', 'afra');
afracık.yapıştır();
ibrahimcik.degisim(afracık.yazdır.bind(afracık)); // afra

// diğer instanceı fonksiyonel olarak bağladım

const error = true;
const throwDeneneme = () => {
  if (error) {
    const benimHata = new Error('SErverdan bilgi hatalı geldi');
    benimHata.code = 404; // bunu koymayadabilirsin
    // throw benimHata diyebilirsin direk
    if (benimHata.code === 404) {
      throw benimHata; // 67 nolu satırdakini iletir
    }
  }
  console.log('throw yaptığı için kod akışını tamamen durdurur');
};
throwDeneneme();

console.log('Burayı da yazmaz');
