// 将实例的引用放在这里: 这样当首个实例被初始化之后,将存入instance变量.
// 由于module.exports导出 Person类.实际上形成了一个闭包.


// 缓存实例
var instance;

function Person(name) {

    // 重新构造函数
    Person = function Person() {
        return instance;
    };

    // 后期处理原型属性
    Person.prototype = this;

    // 实例
    instance = new Person();

    // 重设构造函数指针
    instance.constructor = Person;

    // 其它功能
    instance.start_time = 0;
    instance.name = name;

    return instance;
}
Person.prototype.speak = function () {
    return this.name;
};

module.exports = Person;