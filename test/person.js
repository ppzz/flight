var expect = require('chai').expect;

var Person = require("../module/person");

describe("class: Person", function () {
    describe("single instance", function () {
        it("should return a instance", function () {

            var per = new Person();
        var per2 = new Person();

            var isPerson = per instanceof Person;
            var isPerson2 = per2 instanceof Person;

            expect(isPerson).to.equal(true);
            expect(isPerson2).to.equal(true);
        });

        it("should return zhaopeng when second install created", function () {

            var per = new Person('zhanghang');
            var per2 = new Person('zhaopeng');

            var isPerson = per instanceof Person;
            var isPerson2 = per2 instanceof Person;

            var isEqual = per === per2;
            // expect(per).to.equal(per2);
            expect(isEqual).to.equal(true);
        });
        it("test prototype", function () {

            Person.prototype.getAge = function () {
                return 24;
            };

            var per = new Person();

            Person.prototype.getAge = function () {
                return 25;
            };
            var per2 = new Person();
            
            expect(per.getAge()).to.equal(per2.getAge());
            expect(per.getAge()).to.equal(25);
        });

        it("property", function () {
            var per = new Person('zhaopeng');

            var per2 = new Person('zhanghang');

            expect(per.name).to.equal(per2.name);
            expect(per.name).to.equal('zhanghang');
        });
        it("function: speak", function () {
            var per = new Person('zhaopeng');
            
            var result = per.speak();
            expect(result).to.equal('zhaopeng');
        });
    });
});
