# TypeScript 함수타입

## 함수타입의 타입정의

---

TypeScript에서 함수를 표현할 때는 매개변수의 타입과 반환 타입을 명시해야 합니다.

```jsx
//named function
function add(x: number, y: number):number {
	return x + y;
}

//arrow function
let add = (x: number, y: number): number => {
	return x + y;
}
```

만일 함수에 리턴값이 없다면, `void`를 사용하여 작성할 수 있습니다.

```jsx
let printAnswer = (): void => {
	console.log("YES");
}
```

## 함수타입의 특징

---

TypeScript는 JavaScript와 달리 매개변수의 개수에 맞춰 전달인자를 전달해야 합니다.

```jsx
let greeting = (firstName: string, lastName: string): string => {
	return `hello, ${firstName} ${lastName}`;
}

//에러가 납니다.
greeting('coding');

//정상적으로 작동합니다.
greeting('coding', 'kim');

//너무 많은 매개변수를 보내 에러가 납니다.
greeting('coding', 'kim', 'hacker');
```

만약 개발자가 전달인자를 전달하지 않거나, `undefined`를 전달했을 때 할당될 매개변수의 값을 정해놓을 수도 있습니다. 이는 JavaScript에서의 `default parameter`와 같은 동작을 합니다.

```jsx
let greeting = (firstName: string, lastName="kim"): string => {
	return `hello, ${firstName} ${lastName}`;
}

//정상적으로 작동합니다. 
greeting('coding');

//정상적으로 작동합니다.
greeting('coding', undefined);

//너무 많은 매개변수를 보내 에러가 납니다.
greeting('coding', 'kim', 'hacker');
```

혹은 **선택적 매개변수**를 원한다면 매개변수의 이름 끝에 `?`를 붙임으로써 해결할 수도 있습니다.

```jsx
let greeting = (firstName: string, lastName?: string): string => {
	return `hello, ${firstName} ${lastName}`;
}

//정상적으로 작동합니다.
greeting('coding');

//정상적으로 작동합니다.
greeting('coding', 'kim');

//너무 많은 매개변수를 보내 에러가 납니다.
greeting('coding', 'kim', 'hacker');
```