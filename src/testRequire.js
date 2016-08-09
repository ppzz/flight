global.base = process.cwd();

var addGlobalVariables = require(base + '/src/setGlobalVariable');
var Person = require(base + '/src/Person');

// addGlobalVariables();

setTimeout(function () {
    var p = new Person('zhaopeng', 23);

    p.speak();
}, 4000);


