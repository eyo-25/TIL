# TypeScript 유니온 타입

## ****유니온(Union) 타입****

---

```jsx
unction printValue(value: number|string): void {
  if (typeof value === "number") {
    console.log(`The value is a number: ${value}`);
  } else {
    console.log(`The value is a string: ${value}`);
  }
}

printValue(10); // The value is a number: 10
printValue("hello"); // The value is a string: hello
```

위의 `printValue` 함수는 숫자 또는 문자열 값을 입력받고 있습니다. 이때, 유니온 타입을 사용해 `number | string` 타입으로 지정하고 있습니다.

이후 입력된 값의 타입을 `typeof` 연산자를 사용하여 검사한 후, 해당 값이 숫자인 경우와 문자열인 경우 각각 다른 로그를 출력합니다. 이처럼 유니온 타입은 다양한 타입의 값을 처리해야 하는 경우 유용합니다.

## ****유니온(Union) 타입의 장점****

---

any타입과 달리 유니온 타입을 사용하면 타입을 추론할 수 있기 때문에, 타입에 관련된 API를 쉽게 자동완성으로 얻어낼 수 있습니다. 또한 코드의 가독성을 높일 수 있습니다.

```jsx
let value: string | number | boolean;
```

## ****유니온(Union) 타입 사용 시 유의할 점****

---

유니온 타입인 값이 있으면, 유니온에 있는 모든 타입에 공통인 멤버들에만 접근할 수 있기 때문에 유의해야 합니다.

```jsx
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}
```

이렇게 인터페이스를 사용하여 `Developer`와 `Person`을 정의했습니다.

```jsx
function askSomeone(someone: Developer | Person) {
	console.log(someone.name);
}
```

그러나 실질적으로 `askSomenone` 함수 내부에서는 `Developer`와 `Person`이 갖고 있는 공통 프로퍼티인 `name`에만 접근할 수 있습니다. 왜냐하면 공통되고 보장된 프로퍼티만 제공해야 하기 때문입니다. 만약 나머지 프로퍼티에도 접근하고 싶다면 타입 가드를 사용해야 합니다.

> 타입 가드(Type Guard)란? TypeScript에서 타입을 보호하기 위해 사용되는 기능 중 하나입니다. 타입 가드는 특정 코드 블록에서 타입의 범위를 제한해 해당 코드 블록 안에서 타입 안정성을 보장해 줍니다.
> 

아래 코드는 타입 가드를 사용해 작성된 코드입니다.

```jsx
function askSomeone(someone: Developer | Person) {
  // in 연산자 : 타입스크립트에서 객체의 속성이 존재하는지를 체크하는 연산자
  // in 연산자는 객체의 속성 이름과 함께 사용하여 해당 속성이 객체 내에 존재하는지 여부를 검사
  if ('skill' in someone) {
    console.log(someone.skill);
  }

  if ('age' in someone) {
    console.log(someone.age);
  }
}
```

위의 예시처럼 유니온 타입을 매개변수를 받아 in 연산자를 통한 타입가드로 각각의 객체의 프로퍼티에 접근이 가능해 집니다.

## ****인터섹션(Intersection) 타입****

---

인터섹션(Intersection)은 둘 이상의 타입을 결합하여 새로운 타입을 만드는 방법입니다. `&` 연산자를 사용하여 표현합니다.

```jsx
let value: string & number & boolean;
```

이런 식으로 타입을 결합해 사용할 수 있습니다. 여기서 `value` 변수는 `string`, `number`, `boolean` 타입을 전부 받을 수 있습니다.

인터섹션으로 객체 타입을 연결해 하나의 단일 타입으로 표현할 수 있기 때문에, 타입 가드가 필요하지 않습니다.

```jsx
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

function askSomeone(someone: Developer & Person) {
  console.log(someone.age);
	console.log(someone.name);
	console.log(someone.skill);
}
```