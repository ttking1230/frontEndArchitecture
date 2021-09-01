
// 《js高级程序设计》上是这样叙述参数传递的：所有函数的参数都是按值传递的,
// 也就是说把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。

// 函数的参数是按照值或者指针传递的
// 如果参数是一个基本数据类型的话，是按值传递
// 如果参数是一个引用的话，传递的是指向堆内存的指针

// 1、
let number = 10
let worker1 = {
    item: 'unChange1'
};
let worker2 = {
    item: 'unChange2'
};;
function work(a, b, c) {
    a = a * 10;
    b.item = "change1";
    c = { item: 'change2' };
}
work(number, worker1, worker2);
// 此处worker会被更改，number和worker2不会更改
// 原因：按值传递的时候，会复制一份一样的变量，保存到栈内存中，是两个值，互不影响
// 按照指针传递的时候，传递的是指向堆内存的指针，所以函数work初始化的时候，b和c分别是指向worker1和
// worker2的指针，worker1和b指向的是同一个堆内存的值，worker2和c也是如此。
// 当 b.item = "change1" 时，指针没有变，只是改变了堆内存的值，所以所有指向此值的指针的变量都会改变
// 当 c = { item: 'change2' }，这是改变了c的指针，原先指向worker2，现在指向{ item: 'change2' }
console.log(number);
console.log(worker1);
console.log(worker2);

// 2、

let obj = {
    name: '1'
}
let a = null;
let b = null;
function fn(arg) {
    a = arg;
    b = arg;
    // begin(arg);
    // arg.name = '222222'
    arg = {
        name: '33333'
    }
}

function begin(arg) {
    // arg.name = '22222222';
    arg = {
        name: '222222222'
    }
}

fn(obj);
console.log(a);
console.log(b);