const customers = ['max', 'manuel', 'anna'];

const activeCustomers = ['max', 'manuel'];

const inactiveCustomers = _.difference(customers, activeCustomers);

console.log(inactiveCustomers);

// notlar
// iki array ı karşılaştırmak için lodash isimli bir library kullanacağız. yaygın kullanılan bir lib..
// aslında başka bir sürü işlem yapan bir library. sağ tıklayıp farklı kaydet ile projeye ekledik..
// hem min hali var, hem normal hali aslında ikisi de aynı ama biri kısaltılmış hali
// script olarak eklerken en son kendi app.js i yükleyecek şekilde eklemeliyiz
// _.difference(büyükArray, küçükArray) olmalı yada _.difference([2, 1], [2, 3]);  => [1]
//
// cdn ile yüklemek daha hızlı olabilir diyor.
// çünkü cdn serverları kendi serverlarımızdan daha hızlı hizmet verecektir
// hem projemize dahil etmemize gerek kalmaz. (önce projemize ekleyip sonra cdn e çevirebiliriz tabii)
//
// jquery DOM ile entegrasyonu sağlar ama eski popülerliği yok çünkü modern js ile dom yönetimini yapabiliyoruz
// aynı mantıkla yükleniyor
//
// fetch API de error handling problem bu yüzden axios kullanmak daha mantıklı
// section-18 de kullandığımızı axios a çevireceğiz
