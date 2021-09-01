
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
// 此处number和worker会被更改，worker2不会更改
// 原因：按值传递的时候，实参改了就是改了形参，number存放在栈内存，相当于改了栈内存放的值
// 按照指针传递的时候，传递的是指向堆内存的指针，所以函数work初始化的时候，b和c分别是指向worker1和
// worker2的指针，worker1和b指向的是同一个堆内存的值，worker2和c也是如此。
// 当 b.item = "change1" 时，指针没有变，只是改变了堆内存的值，所以所有指向此值的指针的变量都会改变
// 当 c = { item: 'change2' }，这是改变了c的指针，原先指向worker2，现在指向{ item: 'change2' }
console.log(number);
console.log(worker1);
console.log(worker2);