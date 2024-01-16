# ❌️ null과 undefined의 차이점

### **null:**

- **`null`**은 개발자에 의해 명시적으로 값이 없음을 나타내는 데 사용됩니다.
- 변수를 초기화하고 값이 없음을 나타내기 위해 사용될 수 있습니다.
- 프로그램에서 어떤 값이 존재하지 않음을 의도적으로 표현할 때 사용됩니다.
- typeof 연산자로 확인하면 'object'입니다.
- **`null`**은 객체가 없음을 나타내기 위해 주로 사용됩니다.

### **undefined:**

- **`undefined`**는 변수가 선언되었지만 값이 할당되지 않은 상태를 나타냅니다.
- 값이 할당되지 않았거나 선언되지 않은 변수의 초기값으로 사용됩니다.
- 함수의 매개변수가 전달되지 않았을 때 매개변수는 자동으로 **`undefined`**가 됩니다.
- 객체의 속성이 존재하지 않을 때 속성 값은 **`undefined`**가 됩니다.
- typeof 연산자로 확인하면 'undefined'입니다.

```tsx
let a;
console.log(a); // undefined (값이 할당되지 않음)

let b = null;
console.log(b); // null (명시적으로 값이 없음)

let obj = { prop: null };
console.log(obj.prop); // null (객체 속성에 명시적으로 값이 없음)

let undefinedVar;
console.log(typeof undefinedVar); // undefined (변수는 선언되었지만 값이 할당되지 않음)

let value1 = undefined;
console.log(value1 === null)

let value2 = null;
console.log(value2 === null); // null 타입체크는 일치연산자로 null을 체크합니다.
```