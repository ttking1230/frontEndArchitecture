
let processData = (l) => {
    let data = {
        name: l.name,
        duration: l.duration,
        initiatorType: l.initiatorType
    }
    return data;
}
export default {
    init(cb) {
        window.onload = function () {
            let resourceData = performance.getEntriesByType("resource");
            resourceData = resourceData.filter(item => item.name.indexOf("monitor.js") === -1).map(item => processData(item));
            cb(resourceData);
        }
    }
}