ilk olarak, node da yazılmış bir kodu html ye atanan js e çevirebildik
3 çeşit test e ihtiyacımız var.
unit + integration + e2e
jest ilk ikisini yapıyor.. önce onu indireceğiz.
npm install --save-dev jest ile indireceğiz çünkü development için kullanacağız..
unit test
fonksiyon class gibi tek ögeleri test etmeye yarar
util js i test etmek için util.test.js isimli bir dosya oluşturduk
const { generateText } = require('./util'); importu bu şekilde yaptık, başka türlü çalışmaz
package.json da test kısmını "jest" diye değiştirdik.. (--watch) ile sürekli izlemesini sağlayabiliriz..
