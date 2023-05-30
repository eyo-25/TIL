# TypeScript 데이터 타입

## ****Boolean(불리언) 타입****

---

가장 기본적인 데이터 타입으로, JavaScript에서도 마찬가지로 `boolean` 값이라고 불리는 참(`true`), 거짓(`false`) 값입니다.

```jsx
let isShow: boolean = true;
let isDone: boolean = false;
```

## ****Number(숫자) 타입****

---

TypeScript에서 Number 타입을 선언하는 방식은 아래와 같습니다. JavaScript와 마찬가지로 TypeScript 또한 정수와 실수의 구분 없이 Number 타입 하나로 표기합니다. TypeScript는 이 외에도 추가로 `bigint`를 지원합니다.

```jsx
let number1: number = 5;
let number2: number = 0.7;
```

## ****Array(배열) 타입****

---

TypeScript는 JavaScript처럼 값들을 배열로 다룰 수 있게 할 수 있으며, 두 가지 방법으로 배열 타입을 선언해 사용할 수 있습니다.

```jsx
// 데이터 + 배열
let items: string[] = ["apple", "banana", "grape"];

// 제네릭 배열 타입
let numberList: Array<number> = [4, 7, 100];
```

## ****Tuple(튜플) 타입****

---

TypeScript에서 튜플 타입을 사용하면 요소의 타입과 개수가 고정된 배열을 표현할 수 있습니다.

```jsx
let user: [string, number, boolean] = ["kimcoding", 20, true];
```

## ****Object(객체) 타입****

---

객체는 `key-value`로 구체적인 타입까지도 지정

```jsx
let user: {name: string, age: number} = {
	name: "kimcoding",
	age: 20
}
```