# 🔍️ 클로저(Closure)란?

## 클로저(Closure)가 무었이죠?

---

클로저(Closure)는 함수가 정의될 때의 렉시컬 스코프(유효 범위)를 기억하고, 해당 스코프에 있는 변수에 접근할 수 있는 함수입니다. 클로저는 함수가 정의되는 시점에서 외부 스코프의 변수에 대한 참조를 유지하며, 이로 인해 해당 변수가 스코프에서 사라진 이후에도 접근할 수 있게 됩니다.

따라서 클로저를 통해 함수는 정의된 시점의 환경을 기억하며, 그 환경의 변수에 계속 접근할 수 있습니다. 이를 통해 클로저는 주로 외부 함수의 변수를 보호하고 정보 은닉 및 캡슐화를 구현하는 데 사용됩니다.

```jsx
function createCounter() {
  let count = 0; // 외부 함수의 변수

  function increment() {
    return ++count; // 외부 함수의 변수에 접근
  }

  return increment;
}

const myCounter = createCounter(); // createCounter 함수 실행, increment 함수 반환
console.log(myCounter()); // 1
console.log(myCounter()); // 2
console.log(myCounter()); // 3
```

## 용어정리

---

- 캡슐화 : 데이터와 해당 데이터를 조작하는 함수 또는 메서드를 하나로 묶어 외부에서 직접 접근하지 못하도록 보호하는 것을 의미합니다.
    
    
- 렉시컬 스코프(lexical scope) : 변수 및 함수의 스코프(유효 범위)가 함수를 어디에 작성하고 어떻게 중첩되었느냐와 관련된 스코프 규칙을 가리킵니다.