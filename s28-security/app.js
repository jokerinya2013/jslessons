//    ========================
// |||---------NOTLAR---------|||
//    ========================
// normalde güvenlik önlemleri server side da alınması gerekiyor
// browser için sanitazihtml package ı kullanılabilir
// Cross-Site Scripting Attacks (XSS) de özellikle innerHTML e eklenti
// yapabiliyorlar, bu yüzden mümkünse innerHTML kullanma. sanitize-html package ı kullan
// Cross-Site Request Forgery: (CSRF) serverda açılmış olan session id, browserdaki cookie yi çalar
// Cross-Origin Resource Sharing: (CORS) normalde aynı serverdan olan istekleri karşılar
// headers ile bunu değiştirebilirsin.
