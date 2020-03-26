//
//
// Notlar
// getBoundingClientRect(); konumların yer aldığı obj verir. devtoolstan bakabilirsin
// .clientHeight; inner elemanın boyutlarını verir
// .offsetHeight border dahil uzunluğu verir(width de aynı)
// .scrollTop; o anlık scroll değerini verir
// birşey.offsetLeft; ile birşey.offsetTop; o elemanını top-left corner ını verir
// scrollTo(0, 50); x ve y olarak scroll yaparız specific bir noktaya
// scrollBy(0, 50); bulunduğu notkadan scroll yapar specifik bir noktaya değilde
//
// scrollBy({left:0, top:50, behavior:'smooth'}) diyerek daha yumaşak bir geçiş yaptırabilirsin.
// left koymayabilirsin
// eleman.scrollIntoView(); bunda direk bu elemana zıplar, behavior : 'auto'  olduğu için hızlı gider
// eleman.scrollIntoView({ behavior: 'smooth' })
// <template></template> normalde render edilmez başlangıçta
