console.log('require: src/Person.js');
var globalVar1 = global.glo;

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.speak = function () {
    console.log(this.name, this.age, globalVar1);
};

module.exports = Person;