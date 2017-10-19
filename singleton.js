function Obj() {
    //сохраненный экземпляр
    var instance = this;
    //создать новый экземпляр
    this.a = 0;
    //переопределить конструктор
    Obj = function () {
        return instance;
    };
}
var obj = new Obj();
var obj2 = new Obj();

console.log(obj === obj2);
console.log(obj instanceof Obj);

// ********************************************************************************

function Singleton () {
    if (Singleton.instance) {
        return Singleton.instance
    }
    Singleton.instance = this;
}

var obj = new Singleton();
var obj2 = new Singleton();

console.log(obj === obj2);
console.log(obj instanceof Singleton);