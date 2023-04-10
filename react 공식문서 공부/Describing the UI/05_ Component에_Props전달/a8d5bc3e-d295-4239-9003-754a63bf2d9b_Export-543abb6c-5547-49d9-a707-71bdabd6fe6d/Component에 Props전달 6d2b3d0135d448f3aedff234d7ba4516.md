# Component에 Props전달

React 컴포넌트는 props를 사용하여 서로 통신합니다. 모든 부모 component는 props을 제공하여 자식 component에 일부 정보를 전달할 수 있습니다. props는 HTML 속성을 떠올릴 수  있지만 개체, 배열 및 함수를 포함하여 이를 통해 모든 JavaScript 값을 전달할 수 있습니다.

## ****Familiar props****

---

props은 JSX 태그에 전달하는 정보입니다. 예를 들어, `className`, `src`, `alt`, `width`, `height`는<img>에 전달할 수 있는 props입니다.

```jsx
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```

`<img>`태그 에 전달할 수 있는 props는 미리 정의되어 있습니다 (ReactDOM은 HTML 표준을 준수합니다 ). 그러나 사용자 지정을 위해 와 `<Avatar>`같이 자신의 component 에 모든 props를 전달할 수 있습니다 . 방법은 다음과 같습니다!

## ****Passing props to a component****

---

이 코드에서 `Profile` component는 하위 `Avatar` component에 props을 전달하지 않습니다.

```jsx
export default function Profile() {
  return (
    <Avatar />
  );
}
```

`Avatar` component에 두가지 스탭으로 props를 줄 수 있습니다.

****Step 1: 자식 component에 props전달****

먼저 일부 props를 `Avatar`에 전달합니다. 예를 들어 `person` 객체와 `size`(숫자)라는 두가지 props를 전달해 보겠습니다.

```jsx
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

이제 `Avatar` component 내에서 위의 props를 읽을 수 있습니다

> person뒤의 이중 중괄호가 헷갈린다면, **jsx 중괄호안의 객체**일 뿐이라고 생각하자.
> 

## ****Step 2: Read props inside the child component****

---

`function Avatar`내부와 바로뒤의 파라미터 안에 비구조화 할당을 통해서 props를 읽을 수 있습니다. 이렇게 하면 변수처럼 `function Avatar`내부에서 사용할 수 있습니다.

```jsx
function Avatar({ person, size }) {
  // person and size are available here
}
```

`Avatar` 렌더링을 위해서 `person`, `size` props를 사용하는 logic을 추가하면 완료됩니다.

이제 다양한 props을 사용하여 다양한 방식으로 `Avatar` 를 렌더링할 수 있습니다.

```jsx
//App.js

import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
    </div>
  );
}
```

```jsx
//utils.js

export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

props를 사용하면 부모 component와 자식 component를 독립적으로 생각할 수 있습니다.

예를 들어,  `Avatar`가 어떻게 사용하는지 생각할 필요 없이 `Profile`내부의 person이나 size를 변경할 수 있습니다. 비슷하게, `Profile` 을 둘러볼 필요없이 `Avatar` 에 사용되는 props를 사용하는 방법을 변경할 수 있습니다.

prop를 조정할 수 있는 “손잡이”와 같이 생각할 수 있습니다. 그것들은 함수를 위한 전달인자와 같은 역할을 합니다. 사실, props는 컴포넌트에 대한 유일한 전달인자 입니다 ! React component 함수는 단일 전달인자인 `props`객체만 허용합니다.

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

### props를 구조 분해할당으로 받아오기

---

일반적으로 `props` 객체 전체가 필요하지 않으므로 객체를 개별의 prop로 분해 할당합니다.

주의: ()안에 {}으로 props객체의 프로퍼티의 키에 해당하는 변수에 할당 해줍니다.

```jsx
function Avatar({ person, size }) {
  // ...
}
```

이 구문을 구조분해할당 이라고 하며 아래의 함수 파라미터에서 속성을 읽는 것과 동일합니다.

```jsx
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

## ****Specifying a default value for a prop****

---

**prop의 기본값 지정**

값이 지정되지 않았을 때 대체할 기본값을 소품에 제공하려면 파라미터 바로 뒤에 `=` 과 기본값을 넣어 분해하여 이를 수행할 수 있습니다.

```jsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

이제 `size` prop가 없이 <Avatar person={...} />가 렌더링 될때 `size`는 100으로 세팅됩니다.

기본값은 `size` props가 없거나 `size={undefined}` 를 전달한 경우에만 사용 됩니다.

그러나 `size={null}` 나 `size={0}`를 전달하면 기본값은 **사용되지 않습니다.**

## ****Forwarding props with the JSX spread syntax****

---

****JSX 스프레드 구문으로 prop 전달****

때때로 전달되는 props는 매우 반복적입니다.

```jsx
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

반복되는 코드에는 아무런 문제가 없습니다만, 더 쉽게 읽을 수 있으며 때때로 간결함을 추구할 수 있습니다.

아래 `Profile` component의 모든 props를  자식인 `Avatar` component에게 전달할때 props를 직접 사용하지 않고 스프레드 문법을 사용하여 …props를 사용하여 간결하게 사용할 수 있습니다.

```jsx
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

이렇게 하면 각 이름을 나열하지 않고 `Profile`의 모든 props를 `Avatar` 로 전달 합니다.

**제한적으로 스프레드 문법을 사용해야 됩니다.** 다른 모든 component에서 사용하고 있다면 문제가 있는 것 입니다.

## ****Passing JSX as children****

---

****JSX를 자식으로 전달****

종종 component를 분할하고 자식에게 JSX로 전달해야 하는 경우가 있습니다.

보통은 내장 브라우저 태그를 중첩하는 것이 일반적입니다.

```jsx
<div>
  <img />
</div>
```

하지만 때로는 자신의 component를 같은 방식으로 중첩하고 싶을 수도 있습니다.

```jsx
<Card>
  <Avatar />
</Card>
```

JSX 태그 안에 콘텐츠를 중첩하면 상위 component는 children 라는 prop에서 해당 콘텐츠를 수신합니다. 예를 들어 아래 `Card` component는 `children`로 설정된 props를 수신하고 div래퍼에서 렌더링 됩니다.

```jsx
// App.js

import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

```jsx
// Avatar.js

import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

```jsx
// utils.js

export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

`Card` component가 중첩된 콘텐츠를 래핑할 수 있는 방법을 보려면 `<Card>` 안의 `<Avatar>` 를 다른 test로 교체 해 보면 됩니다. `Card` 내부에서 렌더링되는 내용을 "알" 필요가 없습니다. 이 유연한 패턴은 여러 곳에서 볼 수 있습니다.

children props가 있는 component는 임의의 JSX를 사용하여 부모 component에 의해 채워질 수 있는 구멍이 있는 것으로 생각합니다. children은 시각적 래퍼(패널, 그리드 등) props를 자주 사용합니다.

\

![i_children-prop.png](Component%E1%84%8B%E1%85%A6%20Props%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%83%E1%85%A1%E1%86%AF%206d2b3d0135d448f3aedff234d7ba4516/i_children-prop.png)

## ****How props change over time****

---

**props가 시간에 따라 어떻게 변하는가**

아래 component Clock은 부모 component로 부터 `color`및 `time` 이라는 두개의 props를 받습니다.

(상위 컴포넌트의 코드는 생략 )

```jsx
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

![cc.JPG](Component%E1%84%8B%E1%85%A6%20Props%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%83%E1%85%A1%E1%86%AF%206d2b3d0135d448f3aedff234d7ba4516/cc.jpg)

![vv.JPG](Component%E1%84%8B%E1%85%A6%20Props%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%83%E1%85%A1%E1%86%AF%206d2b3d0135d448f3aedff234d7ba4516/vv.jpg)

이 예제는 component가 시간이 지남에 따라 다른 props를 받을 수 있음을 보여줍니다. prop가 항상 정적이지는 않습니다! 여기에서 `time` props는 1초마다 바뀌며 `color` props 역시 다른색상을 선택하면 변합니다. props는 처음 뿐만이 아니라 모든 시점에서 component의 데이터를 반영합니다.

그러나 **props는 불변(immutable)합니다.** 컴퓨터 과학 용어로 “변경할 수 없음”을 의미 합니다. component가 props를 변경해야 할때 (ex: 사용자 상호 작용 또는 새 데이터에 대한 응답으로) 부모 component에 다른 props(새 개체)를 전달하도록 “요청”해야 합니다! 그런다음 이전 props는 폐기되고 결국 JavaScript 엔진은 props가 가져간 메모리를 회수 합니다.

**“props 변경”을 시도 하지 마십시오.** 사용자 입력에 응답해야 하는 경우 (예: 선택한 색상 변경) 에는 “상태 설정”이 필요하며 이는 State를 사용하여 해결합니다.

## 요약

---

- props를 전달하려면 HTML속성과 마찬가지로 JSX에 추가하십시오.
- props를 읽으려면 `function Avatar({ person, size })` 처럼 구조 분해 할당을 사용하십시오.
- props가 `undefined` 이거나 없을때 `size = 100` 처럼 default 파라미터를 설정할 수 있습니다.
- JSX 스프레드 문법으로 `<Avatar {...props} />` 처럼 props를 전달할 수 있지만 과도하게 사용하지 마세요!
- `<Card><Avatar /></Card>` 처럼 중첩된 JSX는 `Card` component의 props `children` 으로 나타냅니다.
- props는 시간에 따른 읽기 전용 스냅샷 입니다. 모든 렌더링은 새로운 버전의 props를 받습니다.
- props를 변경할 수 없습니다. 상호작용이 필요한 경우 상태를 설정 해야합니다.