
// 原型继承几种方法
// 分为实例属性继承和原型继承
// 实例属性继承只需要在子类构造函数中执行父类构造函数 b.call(this);
// 1、a.prototype.__proto__ = b.prototype
// 1这种方式ie低版本不支持，等价于 Object.setPrototypeOf(a.prototype,b.prototype) es6的写法
// 2、a.prototype = Object.create(b.prototype,{constructor:{value:a}})
// 使用Object.create实现继承，子类constructor会指向父类constructor，
// 所以第二个参数可以修正子类constructor指向
// 3、a.prototype = new B()； 弊端很大，无法给父类传参数


// 手写实现Object.create
function create(parentPrototype) {
    let Fn = function () { };
    Fn.prototype = parentPrototype;
    let fn = new Fn();
    fn.constructor = Tiger
    return fn;
}

function Animal (name){
    this.name = name;
}

function Tiger(){
    this.age = this;
    Animal.call(this);
}

// 总结：
// 实现继承的最常用的两种方式：call + setPrototypeOf 和 call + Object.create