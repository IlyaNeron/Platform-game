'use strict';

let platformStructure = {

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

platformStructure.box();
platformStructure.text();
platformStructure.alert();

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