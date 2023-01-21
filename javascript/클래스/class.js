"use strict";

// 1. class declaration
class Person {
  constructor(name, age) {
    //fields
    this.name = name;
    this.age = age;
  }

  //methods
  speak() {
    console.log(`${this.name} hellow!`);
  }
}

const eyo = new Person("eyo", 30);
console.log(eyo.name);
console.log(eyo.age);
eyo.speak();

// 2. getter and setters
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value < 0 ? 0 : value;
  }
}

const user1 = new User("steve", -1);
console.log(user1.age);

// 3. inheritance
// 클래스를 다른 클래스에 상속시키는 방법

class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    console.log(`drawing ${this.color} color`);
  }
  getArea() {
    return this.height * this.width;
  }
}

class Rectangle extends Shape {}
class Triangle extends Shape {
  draw() {
    super.draw();
    console.log(`🔺`);
  }
  getArea() {
    return (this.height * this.width) / 2;
  }
}

const rectangle = new Rectangle(20, 20, `blue`);
rectangle.draw();
console.log(rectangle.getArea());
const triangle = new Triangle(20, 20, `red`);
console.log(triangle.getArea());
triangle.draw();

// 4. class checking: instanceOf
console.log(rectangle instanceof Rectangle);
//true
console.log(triangle instanceof Rectangle);
//false
console.log(triangle instanceof Triangle);
//true
console.log(triangle instanceof Shape);
//true
console.log(triangle instanceof Object);
//true
