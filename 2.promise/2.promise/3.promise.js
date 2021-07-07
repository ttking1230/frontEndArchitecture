
let Promise = require("./promise/promise2");

let p = new Promise(function (resolve, reject) {
    resolve(123);
});

p.then(data => {
    return data;
}).then(data => {
    console.log(data);
});


