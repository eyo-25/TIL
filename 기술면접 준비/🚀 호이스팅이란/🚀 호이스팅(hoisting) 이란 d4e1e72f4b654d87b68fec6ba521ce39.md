# 🚀 호이스팅(hoisting) 이란?

## 호이스팅(hoisting)

---

호이스팅(Hoisting)은 JavaScript에서 변수와 함수 선언을 컴파일 단계에서 메모리에 할당하는 동작을 의미하고 이로 인해 코드 실행단계에서 마치 선언문이 코드 최상단으로 끌어올려진 것처럼 동작하기 때문에 생겨난 현상입니다.

먼저 변수의 경우, **`var`**, **`let`**, **`const`**로 선언된 변수로 나눌 수 있습니다.

```jsx
console.log(x); // undefined
var x = 5;
```

**`var`**로 선언된 변수의 경우, 위 코드에서 변수 **`x`**를 선언하기 전에 **`console.log(x)`**를 호출하면 **`undefined`**가 출력됩니다. 이것은 호이스팅으로 인해 변수 **`x`**가 컴파일 단계에서 메모리에 할당되고 초기화는 **`undefined`**로 이루어졌지만 아직 값이 할당되지 않았기 때문입니다.

```jsx
console.log(x); // ReferenceError
const x = 5
```

그러나 **`let`** 또는 **`const`**의 경우 변수 **`x`**가 메모리에 등록되지만 초기화되지 않았기 때문에 참조 오류(ReferenceError)가 발생하며 이를 "일시적 사각지대(Temporal Dead Zone, TDZ)"라고 합니다.

let const는 런타임 단계에서 해당 코드 위치에서 초기화되고 할당 됩니다. 

함수의 경우, 함수 선언문과 함수 표현식으로 나눌 수 있습니다.

먼저 함수 선언문의 경우, 함수이름를 콜 스택에 메모리 힙의 주소를 저장하고 메모리 힙에 함수의 내용을 저장합니다. 따라서 완전한 호이스팅이 되어 선언문 이전에 함수를 호출해도 작동합니다.

```jsx
hoistedFunction(); // "Hello, hoisting!"
function hoistedFunction() {
  console.log("Hello, hoisting!");
}
```

그러나 함수 표현식의 경우 변수와 동일하게 var의 경우 함수 선언 이전에 호출하면 초기화되어 있지만 실제 함수 내용이 할당되지 않고 let,const의 경우 참조에러가 발생합니다.