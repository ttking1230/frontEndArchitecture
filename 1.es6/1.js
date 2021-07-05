// ... 展开运算符（浅拷贝）


// JSON.parse(JSON.stringfy())，有个问题，就是不能深拷贝属性为函数和undefined的

let school = { name: "shouyi", fn: function () { }, b: undefined, c: null };
let my = { age: 18 };

let all = JSON.parse(JSON.stringify({ ...school, ...my }));
my.age = 100;
console.log(all);//此处的all无fn和b属性


// object.assign === ...

// 面试通常自己实现深拷贝的方法（递归拷贝）
// 关键考察点掌握几种类型判断
// 1、typeof 2、instanceof Object.prototype.toString.call()
// 3、constructor


function deepClone(obj) {
    // null == undefined true （等于和严等于的区别）
    if (obj == null) return obj;
    // 时间格式的
    if (obj instanceof Date) return new Date(obj);
    // 正则格式的
    if (obj instanceof RegExp) return new RegExp(obj);
    // 不是对象就不用拷贝了，字符串,函数
    if (typeof obj !== "object") return obj;
    // 剩下的不是数组就是对象
    // new obj.constructor 得到的结果不是[]就是{}
    let cloneObj = new obj.constructor;
    console.log(cloneObj);
    for (let key in obj) {
        // 过略掉原型上的属性，
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}

let obj = {
    age: 18, info: {
        name: "f"
    }, a: null, b: undefined, c: function () { }
};
let n = deepClone(obj);
obj.age = 1000;
obj.info.name = "11111111";
console.log(n);

// 还有个循环引用的问题，obj.xxx = obj;  map weakMap