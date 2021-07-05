

// npx：  node5.2以上版本提供的功能，帮助我们执行.bin目录下的文件
// 如果找不到会自动安装该模块

// npx babel 4.class.js -o es5.js -w
// node环境无法运行类的装饰器代码，需要转化成es5查看
// 使用babel转化4.class.js，转成es5，文件名称为es5.js
// -w = -watch 实时监控
// -o 

// @babel/cli -> @babel/core -> tranform (会读取.babelrc的配置去转化)
// @babel/cli执行的时候会去调用@babel/core，@babel/core是转化语法的，
// 转化的时候会读取.babelrc的配置去转化

// 装饰器可以修饰类，类的属性 类的原型上面的方法
// 修饰的时候就是把类的属性和其他的传递给修饰的函数


@flag
class Animal {
    @readonly
    PI = 3.14;
    @readonly
    name = "dog";
    @before
    say() {
        console.log("hello");
    }
}
function flag(constructor) {
    constructor.type = "哺乳类";
}
console.log(Animal.type);
function readonly(target, property, decorator) {
    // target：类的原型
    // property：字符串PI、name，属性名称
    // 实例属性的decorator
    // decorator：{
    //   configurable: true,
    //   enumerable: true,
    //   writable: true,
    //   initializer: [Function: initializer]
    // }
    // decorator.initializer：函数，执行此函数，得到PI
    console.log(arguments);
    setTimeout(() => {
        console.log(target === Animal.prototype);
        console.log(decorator);
        console.log(decorator.initializer());
    });
}

function before(target, property, decorator) {
    // target：类的原型
    // property：函数名称，字符串
    // 原型属性的decorator，会和实例属性的decorator不同
    // decorator：{
    //     value: [Function: say],
    //     writable: true,
    //     enumerable: false,
    //     configurable: true
    //  }
    console.log(arguments);
    // setTimeout(() => {
    //     console.log(target === Animal.prototype);
    //     console.log(decorator);
    // });
    let oldSay = decorator.value;
    decorator.value = function () {
        console.log("before");
        oldSay.call(target);
        console.log("after");
    }
}

let animal = new Animal();
animal.say();