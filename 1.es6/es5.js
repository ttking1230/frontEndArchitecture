"use strict";

var _class, _class2, _descriptor, _descriptor2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
var Animal = flag(_class = (_class2 = /*#__PURE__*/function () {
  function Animal() {
    _classCallCheck(this, Animal);

    _initializerDefineProperty(this, "PI", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);
  }

  _createClass(Animal, [{
    key: "say",
    value: function say() {
      console.log("hello");
    }
  }]);

  return Animal;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "PI", [readonly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3.14;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [readonly], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "dog";
  }
}), _applyDecoratedDescriptor(_class2.prototype, "say", [before], Object.getOwnPropertyDescriptor(_class2.prototype, "say"), _class2.prototype)), _class2)) || _class;

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
  setTimeout(function () {
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
  console.log(arguments); // setTimeout(() => {
  //     console.log(target === Animal.prototype);
  //     console.log(decorator);
  // });

  var oldSay = decorator.value;

  decorator.value = function () {
    console.log("before");
    oldSay.call(target);
    console.log("after");
  };
}

var animal = new Animal();
animal.say();
