# 🖨️ state의 객체 업데이트

state는 객체를 포함하여 모든 종류의 JavaScript 값을 보유할 수 있습니다. 그러나 React 상태에 있는 객체를 직접 변경해서는 안 됩니다. 대신 객체를 업데이트하려면 새 객체를 생성(또는 기존 객체의 복사본을 만든 다음) 해당 복사본을 사용하도록 상태를 설정해야 합니다.

<aside>
📒 **여기서 배우는 것**

- React state에서 객체를 올바르게 업데이트하는 방법
- 중첩 객체를 변경하지 않고 업데이트하는 방법
- 불변성이란 무엇이며 이를 깨뜨리지 않는 방법
- Immer로 객체 복사를 덜 반복적으로 만드는 방법

</aside>

## ****돌연변이(mutation)가 무엇인가요?****

---

모든 종류의 JavaScript 값을 state에 저장할 수 있습니다.

```jsx
const [x, setX] = useState(0)
```

지금까지 숫자, 문자열 및 부울을 사용하여 작업했습니다. 이러한 종류의 JavaScript 값은 "불변"이며, 이는 변경할 수 없거나 "읽기 전용"을 의미합니다.

또한 아래처럼 다시 렌더링을 트리거하여 값을 *바꿀 수 있습니다.*

```jsx
setX(5);
```

상태 가 `x`에서 `0` 으로 변경되었지만 숫자 `0` 자체는 변경되지 않았습니다. JavaScript에서 숫자, 문자열 및 부울과 같은 기본 제공 기본 값은 변경할 수 없습니다.

이제 state의 객체를 고려하십시오.

```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```

*기술적으로는* 객체 *자체* 의 내용을 변경할 수 있습니다 . **이것을 돌연변이(mutation)라고 합니다.**

```jsx
position.x = 5;
```

**그러나 React state의 객체는 기술적으로 변경 가능하지만 숫자, 부울 및 문자열과 같이 변경 불가능한 것처럼 취급**해야 합니다 . 변경하는 대신 항상 교체해야 합니다.

## state****를 읽기 전용으로 취급****

---

위에서 본 것 처럼 **상태에 넣은 모든 JavaScript 객체는 읽기 전용으로 취급해야 합니다.**

이 예제는 현재 포인터 위치를 나타내는 객체를 상태로 유지합니다. 빨간색 점은 미리 보기 영역 위로 커서를 터치하거나 이동할 때 이동해야 합니다. 그러나 점은 초기 위치에 유지됩니다.

```jsx
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

![스크린샷, 2023-04-21 16-43-14.png](%F0%9F%96%A8%EF%B8%8F%20state%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%86%A8%E1%84%8E%E1%85%A6%20%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%20c617ecc695a943898e9030806b056fd4/%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25B0%25EC%2583%25B7_2023-04-21_16-43-14.png)

[ 포인터가 초기값에 머무는 것을 볼 수 있습니다. ]

문제는 이 코드에 있습니다.

```jsx
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

이 코드는 이전 렌더링 `position` 에서 할당된객체를 수정합니다. 그러나 state setter 함수를 사용하지 않으면 React는 객체가 변경된 것을 알 수 없습니다. 따라서 React는 응답으로 아무 것도 하지 않습니다.

위의 코드는 이미 식사를 마친 후에 순서를 바꾸려는 것과 같습니다. state 변경이 경우에 따라 작동할 수 있지만 권장하지 않습니다. 렌더링에서 액세스할 수 있는 state 값을 읽기 전용으로 취급해야 합니다.

아래의 경우 실제로 다시 렌더링을 트리거 하려면 **새** 객체**를 만들고 state setter 함수에 전달합니다.**

```jsx
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

`setPosition` 을 사용하면 React에 다음과 같이 전달할 수 있습니다.

- `position`이 새 객체로 교체
- 그리고 이 컴포넌트를 다시 렌더링

미리 보기 영역을 터치하거나 가리키면 빨간색 점이 포인터를 어떻게 따라가는지 확인합니다.

```jsx
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

![스크린샷, 2023-04-21 16-42-23.png](%F0%9F%96%A8%EF%B8%8F%20state%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%86%A8%E1%84%8E%E1%85%A6%20%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%20c617ecc695a943898e9030806b056fd4/%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25B0%25EC%2583%25B7_2023-04-21_16-42-23.png)

[ 마우스커서를 따라 포인터가 움직이는 것을 볼 수 있다. ]

<aside>
🏊‍♂️ **딥 다이브: 지역(Local) 돌연변이(mutation)는 괜찮습니다.**

아래와 같은 코드는 state에서 기존 객체를 수정하기 때문에 문제가 됩니다.

```jsx
position.x = e.clientX;
position.y = e.clientY;
```

그러나 아래와 같은 코드는 방금만든 새로운 객체를 변경하기 때문에 **절대적으로 좋습니다**.

```jsx
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

실제로 다음과 같이 작성하는 것과 완전히 동일합니다.

```jsx
setPosition({
  x: e.clientX,
  y: e.clientY
});
```

변형은 이미 state에 있는 기존 객체를 변경할 때만 문제가 됩니다. 방금 만든 객체를 변경해도 됩니다. 아직 다른 코드에서 객체를 참조하지 않기 때문입니다. 그것을 변경해도 그것에 의존하는 것에 영향을 미치지는 않을 것입니다. 이를 "Local mutation"라고 합니다. 렌더링하는 동안 Local mutation를 수행할 수도 있습니다. 이는 매우 편리하고 완전히 좋습니다.

</aside>

## 스프레드 문법으로 객체 복사

---

이전 예제에서 `position` 객체는 항상 현재 커서 위치에서 새로 생성됩니다. 그러나 생성하려는 새 객체의 일부로 기존 데이터를 포함하려는 경우가 많습니다. 예를 들어 양식에서 하나의 필드만 업데이트하고 다른 모든 필드에 대해 이전 값을 유지하려고 할 수 있습니다.

`onChange`핸들러가 state를 변경하기 때문에 이러한 입력 필드는 작동하지 않습니다 .

```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

![스크린샷, 2023-04-21 17-10-23.png](%F0%9F%96%A8%EF%B8%8F%20state%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A2%E1%86%A8%E1%84%8E%E1%85%A6%20%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%20c617ecc695a943898e9030806b056fd4/%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25B0%25EC%2583%25B7_2023-04-21_17-10-23.png)

[ input에 포커스해서 타이핑을해도 변하지 않는다 ]

예를 들어 다음 줄은 과거 렌더링의 상태를 변경합니다.

```jsx
person.firstName = e.target.value;
```

찾고 있는 동작을 얻을 수 있는 신뢰할 수 있는 방법은 새 객체를 만들어 `setPerson`에 전달하는 것입니다. 그러나 여기서는 필드 중 하나만 변경되었기 때문에 **기존 데이터**도 복사하려고 합니다 .

```jsx
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});
```

모든 속성을 개별적으로 복사할 필요가 없도록 객체 스프레드 구문을 사용할 수 있습니다 .

```jsx
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```

이제 양식이 작동합니다!

각 입력 필드에 대해 별도의 state 변수를 선언하지 않은 방법에 유의하십시오. 대형 양식의 경우 모든 데이터를 객체에 그룹화하여 유지하는 것은 올바르게 업데이트하는 한 매우 편리합니다!

```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

확산 구문은 "얕은 복사" 라는 점에 유의하십시오 `...`는 한 수준 깊이만 복사합니다. 이렇게 하면 속도가 빨라지지만 중첩된 속성을 업데이트하려면 두 번 이상 사용해야 합니다.

<aside>
🏊‍♂️ ****딥 다이브: 여러 필드에 단일 이벤트 핸들러 사용****

`[`객체 정의 내에서 및`]` 중괄호를 사용하여 동적 이름으로 속성을 지정할 수도 있습니다.다음은 동일한 예이지만 세 가지 다른 이벤트 핸들러 대신 단일 이벤트 핸들러가 있습니다.

```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

여기서 `e.target.name`는 DOM 요소 `<input>`에 부여된 속성 `name`을 의미합니다 .

</aside>

## ****중첩 객체 업데이트****

---

다음과 같은 중첩된 개체 구조를 고려하십시오.

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
```

`person.artwork.city` 를 업데이트하고 싶다면 돌연변이(mutation)를 사용하여 수행하는 방법이 명확합니다.

```jsx
person.artwork.city = 'New Delhi';
```

그러나 React에서는 state를 불변으로 취급합니다! `city` 를 변경하려면 먼저 새 `artwork`객체(이전 객체의 데이터로 미리 채워짐)를 생성한 다음 new person를 가리키는 새 객체를 생성해야 합니다.

```jsx
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

또는 아래처럼 단일 함수 호출로 작성됩니다.

```jsx
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

이것은 약간 장황하지만 많은 경우에 잘 작동합니다.

```jsx
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

<aside>
🏊‍♂️ ****딥 다이브: 객체가 실제로 중첩되지 않음****

이와 같은 객체는 코드에서 "중첩"된 것으로 나타납니다.

```jsx
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
```

그러나 "중첩"은 개체의 동작 방식에 대해 생각하는 부정확한 방법입니다. 코드가 실행될 때 "중첩된" 개체와 같은 것은 없습니다. 실제로 두 개의 서로 다른 객체를 보고 있습니다.

```jsx
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```

개체 `obj1`는 `obj2`의 "내부"가 아닙니다. 예를 들어 다음 `obj3`는 `obj1`을 "가리킬" 수 있습니다.

```jsx
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1
};
```

`obj3.artwork.city` 를 변경하면 `obj2.artwork.city` 및 `obj1.city`과 모두에 영향을 미칩니다.

`obj3.artwork` , `obj2.artwork` , `obj1`가 같은 객체이기 때문입니다.

(모두 같은 주소를 가리키고 있기 때문 obj2, obj3에 할당된 obj1은 obj1의 주소이다.)

</aside>

## ****Immer로 간결한 업데이트 로직 작성****

---

state가 깊게 중첩된 경우 평면화(flattening)를 고려할 수 있습니다 . 그러나 state 구조를 변경하지 않으려면 중첩 스프레드에 대한 바로 가기를 선호할 수 있습니다.

Immer는 편리하지만 변경되는 구문을 사용하여 작성할 수 있게 하고 사본 생성을 처리하는 인기 있는 라이브러리입니다. Immer를 사용하면 작성하는 코드가 "규칙을 위반"하고 개체를 변경하는 것처럼 보입니다.

```jsx
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

그러나 일반 돌연변이(mutation)와 달리 과거 state를 덮어쓰지 않습니다!

<aside>
🏊‍♂️ ****딥 다이브: Immer는 어떻게 작동합니까?****

Immer에서 제공하는 `draft`은 [프록시](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)라고 하는 특별한 유형의 객체로, 사용자가 수행하는 작업을 "기록"합니다. 이것이 원하는 만큼 자유롭게 변형할 수 있는 이유입니다!

후드 아래에서 Immer는 `draft`에서 변경된 부분을 파악 하고 편집 내용이 포함된 완전히 새로운 객체를 생성합니다.

</aside>

**immer를 시도하려면:**

1. `npm install use-immer`를 실행하여 Immer를 종속성으로 추가
2. 그런다음 `import { useState } from 'react’` 를 `import { useImmer } from 'use-immer’` 로 대체합니다.

Immer로 변환된 위의 예는 다음과 같습니다.

```jsx
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

이벤트 핸들러가 얼마나 더 간결해졌는지 확인하십시오. 원하는 만큼 단일 component를 `useState` 와 `useImmer`를 사용하여 혼합 하고 일치시킬 수 있습니다 . Immer는 업데이트 처리기를 간결하게 유지하는 좋은 방법입니다. 특히 상태에 중첩이 있고 객체를 복사하면 코드가 반복되는 경우에 그렇습니다.

<aside>
🏊‍♂️ ****딥 다이브: React에서 state 변경이 권장되지 않는 이유는 무엇입니까?****

몇 가지 이유가 있습니다.

- **디버깅 :**
    
    만약 `console.log` 하고 변경하지 않으면 이전 로그가 최신 상태 변경으로 인해 손상되지 않습니다.
    

- **최적화 :**
    
    일반적인 React 최적화 전략은 이전 props 또는 state가 다음 항목과 동일한 경우 건너뛰는 작업에 의존합니다. state를 변경하지 않으면 변경 사항이 있는지 확인하는 것이 매우 빠릅니다. `prevObj === obj`이면 내부에서 아무 것도 변경되지 않았음을 확신할 수 있습니다.
    
- **새로운 기능 :**
    
    리액트가 만들고 있는 새로운 React 기능은 스냅샷처럼 취급되는 state에 의존합니다. 이전 버전의 상태를 변경하는 경우 새 기능을 사용하지 못할 수 있습니다.
    
- **요구 사항 변경 :**
    
    실행 취소/다시 실행 구현, 변경 기록 표시 또는 사용자가 양식을 이전 값으로 재설정하는 것과 같은 일부 응용 프로그램 기능은 아무 것도 변경되지 않은 경우 더 쉽게 수행할 수 있습니다. 이전 상태 복사본을 메모리에 보관하고 필요할 때 다시 사용할 수 있기 때문입니다. 돌연변이(mutation) 접근 방식으로 시작하면 이와 같은 기능을 나중에 추가하기 어려울 수 있습니다.
    
- **간단한 구현 :**
    
    React는 변형에 의존하지 않기 때문에 객체에 대해 특별한 작업을 수행할 필요가 없습니다. 속성을 가로채거나 항상 프록시로 래핑하거나 많은 "반응형" 솔루션처럼 초기화 시 다른 작업을 수행할 필요가 없습니다. 이것은 또한 React가 추가 성능이나 정확성 문제 없이 크기에 관계없이 모든 개체를 상태로 전환할 수 있도록 하는 이유이기도 합니다.
    

실제로는 React에서 state setting으로 "벗어날" 수 있지만 이 접근 방식을 염두에 두고 개발된 새로운 React 기능을 사용할 수 있도록 그렇게 하지 않는 것이 좋습니다. 미래의 기여자와 아마도 미래의 자신도 감사할 것입니다!

</aside>

## 요약

---

- React의 모든 state를 불변으로 취급합니다.
- 객체를 state에 저장하면 객체를 변경해도 렌더링이 트리거되지 않고 이전 렌더링 “스냅샷”의 상태가 변경됩니다.
- 객체를 변경하는 대신 새 버전을 만들고 state를 setting하여 다시 렌더링을 트리거 합니다.
- 객체 스프레드 구문을 사용하여 `{...obj, something: 'newValue'}` 로 객체의 복사본을 이용하여 업데이트 할 수 있습니다.
- 스프레드 구문은 얕은 복사이므로 한 뎁스만 복사합니다.
- 중첩된 객체를 업데이트 하려면 업데이트 하는 위치에서 끝까지 복사본을 만들어야 합니다.
- 반복적인 복사 코드를 줄일려면 Immer를 사용하십시요.