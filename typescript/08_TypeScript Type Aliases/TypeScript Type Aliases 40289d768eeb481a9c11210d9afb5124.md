# TypeScript Type Aliases

## Type Aliases 개념

---

타입 별칭(Type Aliases)은 타입의 새로운 이름을 만드는 것입니다. 이는 새로운 이름으로 기존의 타입을 참조하는 것을 의미합니다. 타입 별칭을 이용하여 타입의 새로운 이름을 만들 때 키워드 `type`을 사용하여 작성합니다. 간단한 예시를 보겠습니다.

```jsx
type MyString = string;

let str1: string = 'hello!';

// string 타입처럼 사용할 수 있습니다.
let str2: MyString = 'hello world!';
```

원래 `string`이라는 타입이 존재하고 있었습니다. 이에 `myString`이라는 새로운 이름을 부여했습니다. 여기서 `myString`과 `string`은 동일한 의미를 갖게 됩니다. 즉, 타입을 정의할 수 있는 모든 곳에는 타입 별칭을 쓸 수 있습니다.

이런 방식으로 타입 별칭을 사용하면 코드를 더 간결하고 가독성 좋게 만들 수 있습니다. 또한 복잡한 타입을 간략하게 표현하고, 타입 정의를 재사용하는 등 가독성을 높일 수 있습니다. 아래의 예시를 보겠습니다.

```jsx
type Person = {
  id: number;
  name: string;
  email: string;
}

//Commentary 인터페이스에서 Person 타입을 참조하고 있습니다.
interface Commentary {
  id: number;
  content: string;
  user: Person;
}

//객체에서 Commentary 인터페이스를 참조하고 있습니다.
let comment1: Commentary = {
    id: 1,
    content: "뭐예요?",
    user: {
        id: 1,
        name: "김코딩",
        email: "kimcoding@codestates.com",
    },
}

//Commentary 인터페이스 내부에 content 프로퍼티가 존재하기 때문에 
//content 프로퍼티를 작성하지 않으면 컴파일 에러가 납니다.
let kimcoding: Commentary = {
    id: 1,
    user: {
        id: 1,
        name: "김코딩",
        email: "kimcoding@codestates.com",
    },
};

//Person 타입 내부에 isDeveloper 프로퍼티가 존재하지 않기 때문에 
//isDeveloper 프로퍼티를 작성할 시 컴파일 에러가 납니다.
let kimcoding: Commentary = {
    id: 1,
    content: "뭐예요?",
    user: {
        id: 1,
        name: "김코딩",
        email: "kimcoding@codestates.com",
        isDeveloper: true,
    },
};
```

이처럼 인터페이스나 다른 변수를 정의할 때 타입 별칭으로 정의한 타입을 참조하게 됨으로써 코드를 더 간결하고 가독성 좋게 만들 수 있습니다. 타입 별칭으로 만들어진 타입을 참조할 시에는 인터페이스와 마찬가지로 내부에 정의된 프로퍼티를 전부 참조해야만 합니다. 또한 타입 별칭으로 만들어진 타입 내부에 정의된 프로퍼티 외에 다른 프로퍼티를 더 작성하게 되면 그 또한 컴파일 에러가 납니다.

## ****인터페이스 vs 타입 별칭****

---

타입 별칭 또한 인터페이스와 같은 특징이 있기 때문에, 인터페이스의 역할을 타입 별칭이 수행할 수도 있습니다. 그러나 인터페이스와 타입 별칭에는 미묘한 차이점이 있습니다.

1. 사용목적
- 인터페이스 : 객체 구조 정의할때 사용
- 타입별칭 : 다양한 타입을 이름으로 참조하기위해

1. 활용성
- 인터페이스 : 객체를 구성하는 프로퍼티나 메서드를 명시하고 유지하는 데 유용
- 타입별칭 : 복잡한 타입 단순화, 공통적으로 사용되는 타입 중복없이 정의

1. 확장 가능성
- 인터페이스 : extends를 통해 확장가능
- 타입별칭 : 한번 정의하면 **확장 불가**