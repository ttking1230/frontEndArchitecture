

// 延时对象

let fs = require("fs");

function read(url) {
    let defer = Promise.deferred();
    fs.readFile(url, "utf8", function (err, data) {
        if (err) return defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

read("./name.txt").then(data => {
    console.log(data);
})