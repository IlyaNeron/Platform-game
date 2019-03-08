'use strict';

////
let platformStructure = {

    init() {
      this.box();
      this.text();
      this.alert();
    },

	box: function () {
		this.el = document.querySelector('.box');
		console.log(this.el)
	},

	text: function (e) {
		e = 'works';
		console.log(e);
	},

	alert: function () {
		this.el.addEventListener('click', function () {
			alert('works');
		});
	},

};

platformStructure.init();
////

////
class Person {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }

}

class Student extends Person {

    constructor(studentId, firstName, lastName) {
        super(firstName, lastName);
        this.studentId = studentId;
    }

    getStudentInfo() {
        return this.studentId + " " + this.lastName + ", " + this.firstName;
    }

}

let student = new Student(1, "Bob", "Smith");
console.log(student.getFullName());
console.log(student.getStudentInfo());
////


////
// объект функции 'getFullName'
function getFullName() {
    return this.firstName + " " + this.lastName;
}

let person1 = {
    firstName: "Bob",
    lastName: "Smith",
    // свойство с именем 'getFullName' привязано к приведенному выше объекту функции 'getFullName'
    getFullName: getFullName
};

let person2 = {
    firstName: "Tim",
    lastName: "Johnson",
    // свойство с именем 'getFullName' привязано к приведенному выше объекту функции 'getFullName'
    getFullName: getFullName
};

// вывод "Bob Smith"
console.log(person1.getFullName());

// вывод "Tim   Johnson"
console.log(person2.getFullName());

// вывод "true" потому что оба свойства указывают на ту же функцию
console.log(person1.getFullName === person2.getFullName);
////


////
class test {
    constructor() {}

    init() {
        this.alert();
        prompt(this.text);
    }

    alert() {
        this.text = 'text';
        alert('text');
        console.log(this.text);
        document.querySelector('.box').addEventListener('click', new test().alert);
    }
}

class test2 extends test {
    init2() {
        this.init();
    }
}

new test2().init2();
