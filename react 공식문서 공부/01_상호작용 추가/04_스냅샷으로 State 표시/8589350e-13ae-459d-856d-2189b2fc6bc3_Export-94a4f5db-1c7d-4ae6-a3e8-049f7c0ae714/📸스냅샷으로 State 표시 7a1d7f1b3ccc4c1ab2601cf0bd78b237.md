# 📸스냅샷으로 State 표시

state변수는 읽고 쓸 수 있는 일반 JavaScript 변수처럼 보일 수 있습니다. 그러나 state는 스냅샷처럼 동작합니다.  state를 세팅(setting)해도 이미 가지고 있는 state 변수는 변경되지 않지만 대신 다시 렌더링을 트리거합니다.

<aside>
📒 **여기서 배우는 것**

- 설정(setting) 상태가 다시 렌더링을 트리거하는 방법
- state 업데이트 시기 및 방법
- 설정(setting)한 직후 state가 업데이트되지 않는 이유
- 이벤트 핸들러가 상태의 "스냅샷"에 액세스하는 방법

</aside>

## ****설정 state 트리거 렌더링****

---

클릭과 같은 사용자 이벤트에 대한 응답으로 사용자 인터페이스가 직접 변경된다고 생각할 수 있습니다. React에서는 이 멘탈 모델과 약간 다르게 작동합니다. 이전 페이지에서 설정(setting) state가 React에서 [다시 렌더링을 요청하는 것을](https://www.notion.so/248228cdd08c45b99e2ade04eb986a6d) 보았습니다. 즉, 인터페이스가 이벤트에 반응하려면 state를 업데이트 해야 합니다 .

이 예에서 "보내기"를 누르면 `setIsSent(true)`가 React에게 UI를 다시 렌더링하도록 지시합니다.

```jsx
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```

버튼을 클릭하면 다음과 같이 실행 됩니다.

1. `onSubmit` 이벤트 핸들러가 실행됩니다.
2. `setIsSent(true)`은 `isSent`를 `true`로  설정하고 새 렌더링을 대기합니다.
3. React는 새 `isSent`값에 따라 component를 다시 렌더링합니다.

이제 state와 렌더링 간의 관계를 자세히 살펴보겠습니다.

## ****렌더링은 시간에 따라 스냅샷을 찍습니다.****

---

["렌더링"은](https://www.notion.so/248228cdd08c45b99e2ade04eb986a6d) React가 함수인 컴포넌트를 호출한다는 것을 의미합니다. 해당 함수에서 반환하는 JSX는 시간에 따른 UI의 스냅샷과 같습니다. props, 이벤트 핸들러 및 로컬 변수는 모두 **렌더링 당시의 state를 사용하여 계산되었습니다.**

사진이나 동영상 프레임과 달리 반환하는 UI "스냅샷"은 대화형입니다. 여기에는 입력에 대한 응답으로 발생하는 일을 지정하는 이벤트 핸들러와 같은 논리가 포함됩니다.  React는 이 스냅샷과 일치하도록 화면을 업데이트하고 이벤트 핸들러를 연결합니다. 결과적으로 버튼을 누르면 JSX에서 클릭 핸들러가 트리거됩니다.

**React가 컴포넌트를 다시 렌더링할 때:**

1. React는 함수를 다시 호출합니다.
2. 함수는 새 JSX 스냅샷을 반환합니다.
3. 그런 다음 React는 반환한 스냅샷과 일치하도록 화면을 업데이트합니다.

![sdw.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/sdw.jpg)

컴포넌트의 메모리로서 state는 함수가 반환된 후 사라지는 일반 변수와 다릅니다. State는 실제로 React 자체에 “살아” 있습니다. -마치 선반에 있는 것처럼! – 함수 외부에 있습니다. React는 component를 호출할 때 해당 특정 렌더링에 대한 state의 스냅샷을 제공합니다.

![sdd.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/sdd.jpg)

이것이 어떻게 작동하는지 보여주는 약간의 실험이 있습니다. 이 예에서 "+3" 버튼을 클릭하면 `setNumber(number + 1)` 가 세 번 호출하기 때문에 카운터가 세 번 증가할 것이라고 예상할 수 있습니다.

"+3" 버튼을 클릭하면 어떤 일이 발생하는지 확인하십시오.

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

![asddsd.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/asddsd.jpg)

![vsd.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/vsd.jpg)

`number`는 클릭당 한 번만(1만) 증가한다는 점에 유의하십시오 ! (리액트 배칭)

**setting state는 다음 렌더링에 대해서만 변경됩니다 .**

첫 번째 렌더링을 하는동안 `number`는 `0` 입니다. 이것이 해당 렌더의 `onClick`핸들러에서의 값이  여전히 `0`인 이유입니다. 심지어 `setNumber(number + 1)`가 호출된 후에도!

(렌더링을 하는동안은 set함수가 호출되어 변경되도 number는 0으로 유지된다는 뜻 = 리액트 배칭)

```jsx
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```

다음은 이 버튼의 클릭 핸들러가 React에게 지시하는 내용입니다.

1. `setNumber(number + 1)` : `number`는 `0` 그렇기 때문에 `setNumber(0 + 1)`
    
    React는 다음 렌더링에서 `number`를 `1`로 변경할 준비를 합니다.
    
2. `setNumber(number + 1)` : `number`는 `0` 그렇기 때문에 `setNumber(0 + 1)`
    
    React는 다음 렌더링에서 `number`를 `1`로 변경할 준비를 합니다.
    
3. `setNumber(number + 1)` : `number`는 `0` 그렇기 때문에 `setNumber(0 + 1)`
    
    React는 다음 렌더링에서 `number`를 `1`로 변경할 준비를 합니다.
    

`setNumber(number + 1)`를 세번 호출했지만 이 렌더의 이벤트 핸들러의 `number`는 항상 이므로 `0` 상태를 세번 `1`로 설정합니다. 이것이 바로 이벤트 핸들러가 완료된 후 React가 `number`를 `3`이 아니라 `1`로 component를 재 렌더링하는 이유입니다.

코드에서 state 변수를 해당 값으로 정신적으로 대체하여 이를 시각화할 수도 있습니다. `number` state변수가 이 render에서는 `0`이므로 해당 이벤트 핸들러는 다음과 같습니다.

```jsx
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```

다음 렌더링의 경우 `number`는 1이므로 렌더링의 클릭 핸들러는 다음과 같습니다.

(위의 내용이 랜더링이 되면 number state 변수는 1이된다.)

```jsx
<button onClick={() => {
  setNumber(1 + 1);
  setNumber(1 + 1);
  setNumber(1 + 1);
}}>+3</button>
```

따라서 버튼을 다시 클릭하면 카운터가 `2`로 설정되고 렌더링되면 다음 클릭 시 `3`이 설정 됩니다.

## 시간 경과에 따른 state

---

음, 재미있었어요. 이 버튼을 클릭하면 어떤 알림이 표시되는지 추측해 보세요.

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

![weq.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/weq.jpg)

![weqk.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/weqk.jpg)

![dfe.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/dfe.jpg)

이전의 대체 방법을 사용하면 경고가 "0"으로 표시되는 것을 추측할 수 있습니다.

```jsx
setNumber(0 + 5);
alert(0);
```

그러나 경고에 타이머를 설정하여 component가 다시 렌더링된 후에만 실행되도록 하면 어떻게 될까요? "0" 또는 "5"라고 할까요? 추측해보세요!

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

![qe.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/qe.jpg)

![dfe.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/dfe%201.jpg)

![weqk.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/weqk%201.jpg)

놀랐나요? 대체 방법을 사용하면 경고에 전달된 상태의 "스냅샷"을 볼 수 있습니다.

```jsx
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

React에 저장된 state는 알림이 실행될 때까지 변경될 수 있지만 사용자가 알림과 상호작용한 시점의  state 스냅샷을 사용하여 예약되었습니다!

(state가 업데이트되기전에 state 스냅샷을 사용하여 요청을 보낸것!)

이벤트 핸들러의 코드가 비동기인 경우에도 **state 변수의 값은 렌더링 내에서 절대 변경되지 않습니다.** 해당 렌더 내부에서의 `onClick`값인 `0`은 `setNumber(number + 5)`가 호출된 후에도 계속됩니다. 그 값은 React가 component를 호출하여 UI의 "스냅샷을 찍을"때 "고정"되었습니다.

다음은 이벤트 핸들러가 타이밍 실수에 덜 취약하게 만드는 방법의 예입니다. 아래는 5초 지연으로 메시지를 보내는 양식입니다. 다음 시나리오를 상상해 보십시오.

1. "보내기" 버튼을 누르면 "Hello"가 Alice에게 전송됩니다.
2. 5초 지연이 끝나기 전에 "To" 필드의 값을 "Bob"으로 변경합니다.

`alert`으로 무엇을 표시할 것으로 예상하십니까? "You said Hello to Alice"가 표시됩니까? 아니면 "You said Hello to Bob"이라고 표시됩니까? 알고 있는 내용을 바탕으로 추측한 다음 시도해 보십시오.

```jsx
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

![qdwd.JPG](%F0%9F%93%B8%E1%84%89%E1%85%B3%E1%84%82%E1%85%A2%E1%86%B8%E1%84%89%E1%85%A3%E1%86%BA%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9%20State%20%E1%84%91%E1%85%AD%E1%84%89%E1%85%B5%207a1d7f1b3ccc4c1ab2601cf0bd78b237/qdwd.jpg)

물론 Alice가 나오는 것을 확인할 수 있다.

**React는 하나의 렌더의 이벤트 핸들러 내에서 state 값을 "고정" 상태로 유지합니다.** 코드가 실행되는 동안 상태가 변경되었는지 여부를 걱정할 필요가 없습니다.

하지만 다시 렌더링하기 전에 최신 상태를 읽으려면 어떻게 해야 할까요? 다음 페이지에서 다루는 상태 업데이트 기능을 사용하고 싶을 것입니다 !

## 요약

---

- state를 설정하면 새 렌더링이 요청됩니다.
- React는 선반에 있는 것처럼 component 외부에 state를 저장합니다.
- `useState`를 호출하면 React는 *해당 렌더링의*  state를 스냅샷을 제공합니다 .
- 변수 및 이벤트 핸들러는 재렌더링에서 "생존"하지 않습니다. 모든 렌더링에는 자체 이벤트 핸들러가 있습니다.
- 모든 렌더링(및 그 내부의 함수)은 항상 React가 해당 렌더링에서 제공한 state의 스냅샷을 "볼" 것입니다 .
- 렌더링된 JSX에 대해 생각하는 것과 유사하게 이벤트 핸들러에서 정신적으로 state를 대체 하여 생각해 볼 수 있습니다.
- 과거에 생성된 이벤트 핸들러는 생성된 렌더링의 state 값을 가집니다.