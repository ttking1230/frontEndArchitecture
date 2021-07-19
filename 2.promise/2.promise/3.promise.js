
// let Promise = require("./promise/promise2");

let p = new Promise(function (resolve, reject) {
    reject(123);
});

p.then(data => {
    return data;
}).then(data => {
    console.log("111 success"+data);
},e=>{
    console.log("2222"+e);
});


