# 💾 State: Component의 메모리

component는 종종 상호 작용의 결과로 화면에 표시되는 내용을 변경해야 합니다. input에 입력하면 입력 필드가 업데이트되고 이미지 캐러셀에서 "다음"을 클릭하면 표시되는 이미지가 변경되며 "구매"를 클릭하면 제품이 장바구니에 담깁니다.

component는 현재 입력 값, 현재 이미지, 장바구니 등을 “기억”해야 합니다. React에서는 이러한 종류의 component별 메모리를 state라고 합니다.

## ****일반 변수가 충분하지 않은 경우****

---

다음은 조각 이미지를 렌더링하는 component입니다. “다음” 버튼을 클릭하면, 그 다음으로 `index`를 1에서 2로 변경 하고 다음 조형물을 표시해야 합니다. 그러나 이것은 **작동하지 않습니다.**

```jsx
import { sculptureList } from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

이벤트 `handleClick`핸들러가 로컬 변수 `index`를 업데이트하고 있습니다.

그러나 두 가지로 인해 변경사항이 표시되지 않습니다.

1. **지역 변수는 렌더링 사이에 유지되지 않습니다.**
    
    React가 이component를 두 번째로 렌더링할 때 처음부터 렌더링 합니다. 따라서 로컬 변수에 대한 변경사항은 고려하지 않습니다.
    
2. **로컬 변수를 변경해도 렌더링이 트리거되지 않습니다.**
    
    React는 새 데이터로 component를 다시 렌더링해야 한다는 것을 인식하지 못합니다.
    

**새 데이터로 구성 요소를 업데이트하려면 다음 두 가지가 필요합니다.**

1. 렌더링 사이에 데이터를 **유지합니다 .**
2. **React를 트리거하여** 새 데이터로 component를 재 렌더링합니다.

`**useState` Hook은 다음 두 가지를 제공합니다.**

1. 렌더링 간에 데이터를 유지하기 위한 State **변수입니다.**
2. 변수를 업데이트하고 component를 재 렌더링하기 위해 React를 트리거하는 **State 변경 함수(state setter function)** 

## State ****변수 추가****

---

State 변수를 추가하려면 `useState`파일 맨 위에 있는 React에서 가져옵니다.

```jsx
import { useState } from 'react';
```

그런 다음 다음 줄을 바꿉니다.

```jsx
let index = 0;
```

useState와 함께

```jsx
const [index, setIndex] = useState(0);
```

`index`State 변수이며 `setIndex` 느 setter 함수입니다.

```jsx
여기서 []구문은 배열 구조 분해 라고 하며 배열에서 값을 읽을 수 있습니다.
useState에서 반환된 배열에는 항상 정확히 두 개의 항목이 있습니다.
```

<aside>
💡 **TIP**

여기서 []구문은 배열 구조 분해 라고 하며 배열에서 값을 읽을 수 있습니다.
useState에서 반환된 배열에는 항상 State변수와 State 변경 함수 두 개의 항목이 있습니다.

</aside>

`handleClick` 은 다음과 같이 함께 작동합니다.

```jsx
function handleClick() {
  setIndex(index + 1);
}
```

이제 "다음" 버튼을 클릭하면 현재 조각이 전환됩니다.

```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

## ****첫 번째 Hook를 만나보세요****

---

React에서는 `useState`처럼 “`use`”로 시작하는 다른 함수가 있으며 이를 Hook이라고 합니다.

Hook는 React가 렌더링되는 동안에만 사용할 수 있는 특수 기능입니다. 이를 통해 다양한 React기능에 “연결”할 수 있습니다.

useState는 이러한 기능 중 하나일 뿐이지만 나중에 다른 Hooks를 만나게 될 것입니다.

<aside>
⚠️ **함정**

**Hooks(use-로 시작하는 함수)는 component 또는 custom Hooks의 최상위 수준에서만 호출할 수 있습니다.** 조건, 루프 또는 기타 중첩함수 내에서 Hooks를 호출할 수 없습니다.

Hook는 함수이지만 component의 요구사항에 대한 무조건적인 선언으로 생각하는 것이 좋습니다. 파일상단에서 모듈을 “import”하는 방법과 유사하게 component 상단에서 React 기능을 “사용”합니다.

</aside>

## ****`useState` 해부**

---

`useState` 를 호출하면 component가 무언가를 기억하기를 원한다고 React에 알리는 것입니다.

```jsx
const [index, setIndex] = useState(0);
```

이 경우 React가 `index`를 기억하기를 원합니다.

<aside>
📒 ****메모****

관례는 이 쌍의 이름을 `const [something, setSomething]` 와 같이 지정하는 것입니다.

원하는 대로 이름을 지정할 수 있지만 규칙을 사용하는 편이 이해하기 편합니다.

</aside>

`useState`의 유일한 인수는 State 변수의 **초기 값(initial value)**입니다. `useState(0)` 예제에서 `index`의 **초기 값은 0**으로 설정되어있습니다.

component가 렌더링될 때마다 `useState` 는 다음 두 값을 포함하는 배열을 제공합니다.

1. index가 저장한 값이 있는 State변수 (`index`)
2. State 변수를 업데이트하고 component를 다시 렌더링하기 위해 React를 트리거할 수 있는 State인 State 변경 함수 (`setIndex`)

작동 방식은 다음과 같습니다.

```jsx
const [index, setIndex] = useState(0);
```

1. **component가 처음으로 렌더링됩니다.**
    
    `useState` 에 대한 초기 값으로 `0` 을 전달 했기 때문에 `[0, setIndex]` 을 반환합니다. React는 최신 State 값을 기억합니다.
    
2. **State를 업데이트합니다.**
    
    사용자가 버튼을 클릭하면 `setIndex(index + 1)` 이 호출됩니다. 0 + 1은 1이므로 `index`는 1입니다. 이는 React가 지금 `index = 1`임을 기억하도록 알리고 다른 렌더링을 트리거 합니다.
    
3. **component의 두 번째 렌더링입니다.**
    
    React는 여전히 `useState(0)`처럼 보이지만 `index`를 `1` 설정한 것을 기억하기 때문에 `[1, setIndex]` 을 대신 반환합니다.
    

## component****에 여러**** State ****변수 제공****

---

하나의 component에서 원하는 만큼 많은 유형의 State 변수를 가질 수 있습니다. 이 component에는 "세부 정보 표시"를 클릭할 때 전환되는 두 가지 State 변수(숫자 `index`및 블린 `showMore`)가 있습니다.

```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

이 예제의 `index` 와 `showMore` 같이 State가 관련이 없는 경우 여러 State 변수를 갖는 것이 좋습니다. 그러나 자주 두 개의 State 변수를 함께 변경하는 경우에는 하나로 결합하는 것이 더 쉬울 수 있습니다. 예를 들어 필드가 많은 양식이 있는 경우 필드당 State 변수보다 개체를 보유하는 단일 State 변수를 갖는 것이 더 편리합니다.

<aside>
🏊‍♂️ ****딥 다이브 : React는 반환할 State를 어떻게 알 수 있나요?****

호출이 참조하는 State 변수 `useState` 에 대한 정보를  수신하지 않는 것을 알 수 있습니다.

`useState` 에 전달되는 “식별자”가 없는데 반환할 State 변수를 어떻게 알 수 있습니까? 

함수 구문 분석과 같은 일부 마법에 의존합니까?

라는 질문에는 “아니”라고 말할 수 있습니다.

대신 간결한 구문을 사용하기 위해 Hooks는 **동일한 component의 모든 렌더링에서 안정적인 호출 순서에 의존합니다.** 위의 규칙(”최상위 수준에서만 Hooks 호출”)을 따르면 Hooks는 항상 같은 순서로 호출되기 때문에 이것은 실제로 잘 작동합니다.

내부적으로 React는 모든 component에 대한 State 쌍의 배열을 보유합니다. 또한 렌더링 전에 설정된 현재 쌍 인텍스 `0`을 유지합니다. `useState` 를 호출할 때마다 React는 다음 State 쌍을 제공하고 인덱스를 증가 시킵니다.

</aside>

## State는 고립(isolated)되어 있고 사적(****private)****이다.

---

State는 화면의 component 인스턴스에 대해 지역적입니다. 즉, **동일한 component를 두번 렌더링하면 각 복사본이 완전히 격리된 State가 됩니다.** 둘 중 하나를 변경해도 다른 하나는 영향을 받지 않습니다.

이 예에서 `Gallery` component는 논리를 변경하지 않고 두 번 렌더링 됩니다. 각 갤러리 안에 있는 버튼을 클릭해 보면 State가 독립적이라는 점을 알 수 있습니다.

![dsdsds.JPG](%F0%9F%92%BE%20State%20Component%E1%84%8B%E1%85%B4%20%E1%84%86%E1%85%A6%E1%84%86%E1%85%A9%E1%84%85%E1%85%B5%2075cf2a3c5ca64dbe9265bff886dbaa10/dsdsds.jpg)

next버튼을 누르면 해당 component에 있는 index만 변경되어 사진이 바뀌는 것을 볼 수 있다.

```jsx
//App.js

import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
}
```

```jsx
//Gallery.js

import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <section>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </section>
  );
}
```

**이것이 State가 모듈 상단에서 선언할 수 있는 일반 변수와 다른 점입니다.** State는 특정 함수 호출이나 코드의 위치에 연결되지 않지만 화면의 특정 위치에 "지역적"입니다. 두 component를 렌더링했으므로 `<Gallery />`해당 State가 별도로 저장됩니다.

이렇게 하면 나머지 component에 영향을 주지 않고 각각의 component에 State를 추가하거나 제거할 수 있습니다.

❓️ **두 갤러리 모두 State를 동기화된 State로 유지하려면 어떻게 해야 합니까?**

React에서 이를 수행하는 올바른 방법은 자식 component에서 State를 제거 하고 가장 가까운 공유 부모component에 State를 추가하는 것입니다.

## 요약

---

- component가 렌더링 사이에 일부 정보를 “기억”해야 하는 경우 State 변수를 사용합니다.
- State 변수는 `useState` Hook을 호출하여 선언합니다.
- Hook는 `use` 로 시작하는 특수 함수입니다.  State와 같은 React 기능에 “연결” 할 수 있습니다.
- Hook는 import를 상기 시킬 수 있습니다만 Hook는 무조건 호출해야하며 `useState` 를 포함한 Hooks 호출은 component또는 Hook의 최상위 수준에서만 유효합니다.
- 하나이상의 State변수를 가질 수 있습니다. 내부적으로 React는 순서대로 일치시킵니다.
- State는 component에 대해 사적(private)입니다. 두 곳에서 렌더링하면 각 복사본이 각자 고유한 State를 갖습니다.