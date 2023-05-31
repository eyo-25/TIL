# TypeScript Interface

## ****Interface**** 개념

---

TypeScript에서 인터페이스(Interface)는 일반적으로 타입 체크를 위해 사용이 됩니다. 인터페이스는 변수, 함수, 클래스에 사용할 수 있으며, 인터페이스에 선언된 프로퍼티 또는 메서드의 구현을 강제하여 일관성을 유지하도록 합니다.

JavaScript는 인터페이스를 따로 지원하지 않지만, TypeScript는 인터페이스를 지원합니다. TypeScript의 예약어인 `interface`를 사용하여 TypeScript 인터페이스를 생성할 수 있습니다.

*예약어(reserved word) : 컴퓨터 프로그래밍 언어에서 이미 문법적인 용도로 사용되고 있기 때문에 식별자로 사용할 수 없는 단어를 의미

## 객체 ****인터페이스****

---

보통 네이밍 컨벤션으로 인터페이스의 첫글자를 대문자로 작성합니다

```jsx
interface User {
	name: string;
	age: number;
}

// 정상적으로 선언됩니다.
const user: User = {
	name: "anna",
	age: 20
}

// 프로퍼티의 순서를 지키지 않아도 정상적으로 선언됩니다.
const user: User = {
	age: 20,
	name: "anna"
}

// 정의된 프로퍼티보다 적게 작성했기 때문에 에러가 납니다.
const user: User = {
	name: "anna"
}

// 정의된 프로퍼티보다 많이 작성했기 때문에 에러가 납니다.
const user: User = {
	name: "anna",
	age: 20,
	job: "developer"
}
```

물론 옵셔널으로 선택적으로 프로퍼티를 작성할 수 있습니다.

```jsx
interface User {
	name: string;
	age?: number;
}

// 정상적으로 선언됩니다.
const user: User = {
	name: "anna"
}
```

## ****함수와 인터페이스****

---

인터페이스를 사용하여 객체의 프로퍼티 이름과 타입을 정의하고, 함수의 매개변수 타입과 반환 타입도 정의할 수 있습니다.

```jsx
interface User {
	name: string;
	age: number;
	job: string;
}

// greet함수 인터페이스
interface Greeting {
	(user: User, greeting: string): string;
}

const greet: Greeting = (user, greeting) => {
	return `${greeting}, ${user.name}! Your job : ${user.job}.`;
}

const user: User = {
	name: "anna",
	age: 30,
	job: "developer"
};

const message = greet(user, "Hi");

console.log(message);
```

## ****인터페이스와 상속****

---

인터페이스도 class처럼 `extends`라는 키워드를 사용하여 기존에 존재하던 인터페이스를 상속해 확장이 가능합니다. 이렇게 하면 기존에 존재하던 인터페이스의 프로퍼티를 다른 인터페이스에 복사하는 것을 가능하게 해 주며, 인터페이스의 재사용성을 높여줍니다.

```jsx
interface Person {
    name: string;
    age: number;
}

interface Developer extends Person {
    language: string;
}

const person: Developer = {
    language: "TypeScript",
    age: 20,
    name: "Anna",
}
```

마찬가지로 여러 인터페이스를 상속받아 확장할 수도 있습니다.

```jsx
interface FoodStuff {
    name: string;
}

interface FoodAmount {
    amount: number;
}

interface FoodFreshness extends FoodStuff, FoodAmount {
	   isFreshed: boolean;
}

const food = {} as FoodFreshness;

food.name = "egg";
food.amount = 2;
food.isFreshed = true;
```