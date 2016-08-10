console.log('require: src/setGlobalVariable.js');

var setGlobalVariables = function () {
    console.log('invock: src/setGlobalVariable.js: setGlobalVariables');
    var i = 0;
    var j = 0;
    while (i <  10000 * 10000) {
        while ( j < 10000 * 10000) {
            j++;
        }
        i++;
    }
    global.glo = "hello!";
};

module.exports = setGlobalVariables();
