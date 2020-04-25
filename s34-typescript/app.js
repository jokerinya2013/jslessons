"use strict";
// class User {
//   name: string; // field olarak eklemeden hata veriyor, yada aşağıdaki gibi yapacaksn
//   private age: number; // default publictir, private olunca sadece içeride kullandırıyor
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
        // böyle yapınca field yapmaya gerek yok
    }
    User.prototype.print = function () {
        console.log(this.name);
    };
    return User;
}());
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(name, age, permissions) {
        var _this = _super.call(this, name, age) || this;
        _this.permissions = permissions;
        return _this;
    }
    return Admin;
}(User));
var user = new User('İbo', 30);
// console.log(user.name, user.age); // hata veriyor, age private olduğu için
var num1Input = document.getElementById('num1');
var num2Input = document.getElementById('num2');
var button = document.querySelector('button');
function add(a, b) {
    return a + b;
}
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["CONSOLE"] = 0] = "CONSOLE";
    OutputMode[OutputMode["ALERT"] = 1] = "ALERT";
})(OutputMode || (OutputMode = {})); // union kullanımının değişik şekli
function printResult(result, printMode) {
    // bu şekilde kullanınca ide desteği de oluyor
    if (printMode === OutputMode.CONSOLE) {
        console.log(result);
    }
    else if (printMode === OutputMode.ALERT) {
        alert(result);
    }
}
// const results: CalculationResults = []; // içerisinde { res: number } bu obj barından array demek
var results = []; // içerisinde { res: number } bu obj barından array demek
var names = ['Ali', 'Veli']; // array türünü direk str olarak düzenliyor
button.addEventListener('click', function () {
    var num1 = +num1Input.value;
    var num2 = +num2Input.value;
    var result = add(num1, num2);
    var resultContainer = {
        res: result,
        print: function () {
            console.log(this.res);
        },
    };
    results.push(resultContainer);
    // results.push(5); // yukarıda arrayı tanımladığımız için hata veriyoruz burada
    // results[0].print();
    printResult(result, OutputMode.CONSOLE);
    printResult(result, OutputMode.ALERT);
    // printResult(result, 'window'); // hata verdiriyor, yukarıda union type yaptığımız için
});
function logAndEcho(val) {
    console.log(val);
    return val;
}
logAndEcho('Hi There!');
// npm install -g typescript ile global bir package
// olarak yükledik. js i eski versiyonuna çeviren teknoloji
// js++ diyor Max :)
// belki babel kullandırmayabilir
// hiçbir şey return yapmayacaksak, tür void olmalı, yada boş bırak o void yapar
