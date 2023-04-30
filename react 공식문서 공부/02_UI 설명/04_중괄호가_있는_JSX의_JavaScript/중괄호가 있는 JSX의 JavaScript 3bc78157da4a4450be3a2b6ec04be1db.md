# 중괄호가 있는 JSX의 JavaScript

JSX를 사용하면 JavaScript 파일 내에 HTML과 유사한 마크업을 작성하여 렌더링 logic과 콘텐츠를 같은 위치에 유지할 수 있습니다. **경우에 따라 약간의 JavaScript logic를 추가하거나 해당 마크업 내에서 동적 속성을 참조**하고 싶을 수 있습니다. 이 상황에서 **JSX에서 중괄호를 사용하여 JavaScript 창을 열 수 있습니다.**

## ****Passing strings with quotes****

****따옴표로 문자열 전달****

JSX에 문자열 속성을 전달하려면 작은따옴표나 큰따옴표로 묶어야 합니다.

```jsx
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

여기서 `"https://i.imgur.com/7vQD0fPs.jpg"`및 `"Gregorio Y. Zara"` 는 문자열로 전달됩니다.

하지만 `src` 또는 텍스트 `alt`를 동적으로 지정하려면 어떻게 해야 할까요? `**“ “` 을 `{ }` 으로 교체하여 JavaScript의 값을 사용할 수 있습니다.**

```jsx
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

이미지를 둥글게 만드는 CSS 클래스 이름을 지정하는 `className="avatar"` 와

`src={avatar}`라는 JavaScript 변수의 값을 읽는 의 차이점에 주목하십시오 . 중괄호를 사용하면 마크업에서 바로 JavaScript로 작업할 수 있기 때문입니다!

## ****Using curly braces: A window into the JavaScript world****

****중괄호 사용: JavaScript 세계로 들어가는 창****

JSX는 JavaScript를 작성하는 특별한 방법입니다. 즉, 내부에서 중괄호와 함께 JavaScript를 사용할 수 있습니다. 아래 예에서는 먼저 과학자의 이름을 선언한 다음<h1> 내부에 중괄호를 사용하여 변수 `name`을  포함합니다

```jsx
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}

// Gregorio Y. Zara's To Do List
```

`name`의 값을 'Gregorio Y. Zara’  에서 'Hedy Lamarr’로 변경해 보십시오. 목록 제목이 어떻게 변경되는지 확인하시겠습니까?

다음과 같은 formatDate() 함수 호출을 포함하여 모든 JavaScript 표현식은 중괄호 사이에서 작동합니다

```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}

// To Do List for Tuesday(오늘 날짜로 나오게 된다.)
```

## ****Where to use curly braces****

****중괄호 사용 위치****

JSX 내에서 중괄호는 두 가지 방법으로만 사용할 수 있습니다.

- JSX 태그 내부의 **텍스트로**
    
    `<h1>{name}'s To Do List</h1>`는 작동하지만 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>`는 작동하지 않습니다.
    
- **=** 기호 바로 뒤에 오는 **속성으로**
    
    `src={avatar}`는 avatar를 변수로 읽지만 `src="{avatar}”`는 "{avatar}” 변수를 문자열로 변환한 값을 전달합니다.
    

## ****Using “double curlies”: CSS and other objects in JSX****

**“이중 중괄호”사용: JSX의 CSS 및 기타 객체**

문자열, 숫자 및 기타 JavaScript 표현식 외에도 JSX에서 객체를 전달할 수도 있습니다. 객체는 또한

`{ name: "Hedy Lamarr", inventions: 5 }`와  같이 중괄호로 표시됩니다. 따라서 JSX에서 JS 객체를 전달하려면 `person={{ name: "Hedy Lamarr", inventions: 5 }}` 처럼 다른 중괄호 쌍으로 객체를 감싸야 합니다

JSX의 인라인 CSS 스타일에서 이것을 볼 수 있습니다. React는 인라인 스타일을 사용할 것을 요구하지 않습니다(CSS 클래스는 대부분의 경우에 잘 작동합니다). 그러나 인라인 스타일이 필요한 경우 `style` 속성에 개체를 전달합니다

다음과 같이 작성할 때 중괄호 안에 있는 JavaScript 객체를 실제로 볼 수 있습니다.

```jsx
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

JSX에서 볼 때 `{{JSX}}`는 중괄호 내부의 객체에 지나지 않는다는 것을 아십시오!

> **주의** : 인라인 `style`속성은 camelCase로 작성됩니다. 예를 들어 `<ul style="background-color: black">` HTML은 component에서 `<ul style={{ backgroundColor: 'black' }}>` 와 같이 작성됩니다 .
> 

## ****More fun with JavaScript objects and curly braces****

****JavaScript 개체 및 중괄호로 더 재미있게****

여러 표현식을 하나의 객체로 이동하고 JSX에서 중괄호 안에 참조할 수 있습니다.

```jsx
// App.js

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

이 예에서 `person`이란 JavaScript 객체에는 `name`문자열과 `theme`프로퍼티가 포함되어 있습니다.

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

component는 `person`으로부터 다음과 같은 값을 사용할 수 있습니다.

```jsx
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
...
```

JSX는 JavaScript를 사용하여 데이터와 논리를 구성할 수 있기 때문에 템플릿 언어로서 미니멀한 장점이 있습니다.

## ****요약****

이제 JSX에 대한 거의 모든 것을 알게 되었습니다.

- 따옴표 안의 JSX 속성은 문자열로 전달됩니다.
- 중괄호를 사용하면 JavaScript logic와 변수를 마크업으로 가져올 수 있습니다.
- •JSX 태그 content 내부 또는 `=`속성 바로 뒤에 작동합니다.
- `{{` `}}` 는 특별한 구문이 아닙니다. JSX 중괄호 안에 들어 있는 JavaScript 객체입니다.