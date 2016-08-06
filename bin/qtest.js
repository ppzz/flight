var Q = require('q');

var sleep = function (ms) {
    return function (callback) {
        setTimeout(callback, ms);
    };
};

var squareCPS = function (num, callback) {
    sleep(1000).call(this, function () {
        callback(num * num);
    });
};

var main = function (num) {
    squareCPS(num, function (num) {
        squareCPS(num, function (num) {
            squareCPS(num, function (num) {
                console.log('num is :', num);
            });
        });
    });
};

var square = function (num) {
    var later = Q.defer();
    sleep(1000).call(this, function () {
        later.resolve(num * num);
    });
    return later.promise;
};

var main1 = function (num) {
    square(num)
        .then(square)
        .then(square)
        .then(function (total) {
            console.log('num:', total);
        });
};

var main2 = function () {
    Q.allSettled(
        [
            square(10),
            square(20),
            square(30)
        ]
    ).then(function (results) {
        results.forEach(function (result) {
            console.log('result:', result.value);
        });
    });
};

// main(10);
// main1(10);
main2();