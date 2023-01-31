# Scope

[http://www.tcpschool.com/javascript/js_function_variableScope](http://www.tcpschool.com/javascript/js_function_variableScope)

### **변수의 유효 범위(variable scope)**

자바스크립트에서 객체나 함수는 모두 변수(variable)입니다.

자바스크립트는 기본적으로 함수가 선언되는 동시에(lexical) 자신만의 Scope를 갖습니다. 우리는 이 범위라는 개념을 이용해서 한줄의 코드를 작성할때 어디까지가 잘 되는 코드이고 어디까지가 잘 작동되지 않는 코드인지 파악할 수 있습니다.

자바스크립트에서 변수는 유효 범위에 따라 **지역변수,전역변수**로 구분됩니다.

### **블록문, 로컬 변수, 지역 변수(Local variable)**

자바스크립트에서는 중괄호'{ }'로 감싼 코드를 **블록문(Block Statement)** 라고 부른다. 그리고 그 **블록문 안에 선언된 변수를 로컬 변수 혹은 지역 변수(Local variable)**라고 부른다.

```jsx
function fn() {
  //블록문(block statement)
  let x = 3; // 로컬 변수, 지역 변수(Local Variable)
  console.log(x);
}

fn(); // 3
console.log(x); // ReferenceError: x is not defined
```

**로컬변수는 블록문 내에서만 사용할 수 있는 변수**이다. 변수 x의 scope 즉, 변수x가 유효한 범위는 myFunction안에서 만이다.

자바스크립트에서는 선언되지 않은 변수를 사용하려고 하거나 접근하려고 하면 오류를 발생시킵니다. 하지만 선언되지 않은 변수에 대한 typeof 연산자의 결과값은 **undefined** 값을 반환합니다.

```jsx
function localNum() {
  let num = 10; // 지역 변수 num에 숫자 10을 대입함.

  console.log(typeof num); // number
}

localNum(); // 함수 localNum()을 호출함.

console.log(typeof num); // undefined
```

### **글로벌 변수, 전역 변수(Global Variable)**

전역 변수(global variable)란 로컬 변수와 반대로 **블록문 밖에서 선언한 변수는 블록문 안에서도 사용**할 수 있는 변수를 말합니다.

또한 전역 변수는 프로그램의 어느 영역에서나 접근할 수 있으며, **웹 페이지가 닫혀야만 메모리에서 사라집니다**.

```jsx
let num = 10; // 전역 변수 num을 선언함.

function globalNum() {
  console.log(num); // 10

  num = 20; // 전역 변수 num의 값을 함수 내부에서 변경함.
}

globalNum(); // 함수 globalNum()을 호출함.

console.log(num); // 20
```

위의 예제처럼 전역 변수는 함수 외부뿐만 아니라 내부에서도 접근하여 변경할 수 있습니다.

이때 첫번째 `console.log(num)`는 **블록문 내부에서 선언된 지역변수를 확인하고 있으면 사용하고 없으면 전역변수를 사용**한다.

(함수 내에서 지역변수가 전역변수보다 더 높은 우선순위를 가짐)

### function scope - var

var의 경우 **function scope**이기 때문에 Block Scope의 경우 var로 선언하면 전역변수로 바뀌게 된다

```jsx
if (true) {
  var x = 5;
}
console.log(x); // 5
```

var는 재선언이 가능하기 때문에 재선언가능하지만 블록스코프를

```jsx
var num = 10; // 전역 변수 num을 선언함.

function globalNum() {
  console.log(num); // undefined

  var num = 20; // 재선언

  console.log(num); // 20
}

globalNum(); // 함수 globalNum()을 호출함.

console.log(num); // 10 출력
```

function scope이기때문에 함수안에서 선언시 밖에서 사용불가

```jsx
function globalNum() {
  var num = 20;
}

globalNum(); // 함수 globalNum()을 호출함.

console.log(num); // ReferenceError : num is not defined
```
