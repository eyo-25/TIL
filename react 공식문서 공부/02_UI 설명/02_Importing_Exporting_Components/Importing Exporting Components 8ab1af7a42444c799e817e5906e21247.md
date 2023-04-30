# Importing / Exporting Components

**Components의 마법은 재사용 가능성에 있습니다.** 다른 Components요소로 구성된 Components를 만들 수 있습니다. 그러나 점점 더 많은 Components를 중첩함에 따라 Components를 다른 파일로 분할하기 시작하는 것이 좋습니다. 이를 통해 파일을 쉽게 스캔하고 더 많은 위치에서 Components를 재사용할 수 있습니다.

## \***\*The root component file\*\***

Your First Component 에서 `Profile`Components와 이를 렌더링하는 `Gallery` Components를 만들었습니다 .

```jsx
// App.js

function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

이들은 현재 이 예제에서 명명된 `App.js` **루트 component 파일** 에 있습니다. Create React App에서 앱은 src/App.js 안에서 동작합니다. 그러나 설정에 따라 루트 component가 다른 파일에 있을 수 있습니다. Next.js와 같은 파일 기반 라우팅이 있는 프레임워크를 사용하는 경우 루트 component는 페이지마다 다릅니다.

## \***\*Exporting and importing a component\*\***

앞으로 랜딩 화면을 바꾸고 거기에 과학도서 목록을 넣고 싶다면? 아니면 모든 프로필을 다른 곳에 배치하고 싶다면? 루트 component 파일 밖으로 이동 하는 것이 좋습니다 . 이렇게 하면 `Gallery` 파일이 더 모듈화되고 다른 파일에서 재사용할 수 있습니다. 이제 다음에서 export로 변경할 수 있습니다.

**세 단계로 component를 이동할 수 있습니다.**

1. component를 넣을 새 JS 파일을 만듭니다 .
2. 해당 파일에서 함수 component 를 export 합니다 ( default 또는 named exports 사용해 export )
3. 사용할 component를 import해서 파일을 가져옵니다.

   ( default 나 named exports를 사용하여 import)

```jsx
// App.js

import Gallery from "./Gallery.js";

export default function App() {
  return <Gallery />;
}
```

```jsx
// Gallery.js

function Profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

이제 이 예제가 어떻게 두 개의 **component** 파일로 나뉘는지 확인하십시오.

**Gallery.js :**

- 동일한 파일 내에서만 사용되고 내보내지지 않는 `Profile` component를 정의합니다 .
- `Gallery` component를 export default로 내보냅니다.

**App.js :**

- **default import를 통해** `Gallery.js` 에서 \*\*\*\*`Gallery` 를 가져옵니다.
- `App` component 에서 **default export로** root App을 내보냅니다.

**Note**

다음과 같이 **`.js`**파일 확장자가 없는 파일이 나타날 수 있습니다 .

```jsx
import Gallery from "./Gallery";
```

`./Gallery.js`또는 `./Gallery`는 React와 함께 작동하지만 전자는 기본 ES 모듈 native ES Modules
작업에 가깝습니다.

## \***\*Default vs named exports\*\***

JavaScript로 값을 내보내는 기본 방법에는 **Default export**와 **named export** 두 가지가 있습니다. 지금까지 예제에서는 Default export만 사용했습니다. 그러나 동일한 파일에서 둘 중 하나 또는 모두를 사용할 수 있습니다. **파일은 하나 이상의 Default export를 가질 수 없지만 원하는 만큼 named export를 가질 수 있습니다 .**

![i_import-export.svg](Importing%20Exporting%20Components%208ab1af7a42444c799e817e5906e21247/i_import-export.svg)

Components를 내보내는 방법과 Components를 가져와야 하는 방법을 나타냅니다. **named export와 같은 방식으로 Default export를 가져오려고 하면 오류가 발생합니다!**

이 차트는 다음을 추적하는 데 도움이 될 수 있습니다.

| Syntax  | Export statement                    | Import statement                      |
| ------- | ----------------------------------- | ------------------------------------- |
| Default | export default function Button() {} | import Button from './button.js';     |
| Named   | export function Button() {}         | import { Button } from './button.js'; |

default import로 작성을 했다면, import이후에 원하는 어떤 이름을 사용하여도 됩니다. 예를들어 `import Banana from './button.js` 작성하여도 여전히 동일한 기본 내보내기를 제공합니다.

대조적으로 **named export의 경우 이름이 양쪽에서 일치해야 합니다**. 그래서 named imports라고 합니다!

**파일이 하나의 component만 내보내는 경우 사람들은 Default export를 사용하고 여러 component와 값을 내보내는 경우 named export를 사용합니다.** 선호하는 코딩 스타일에 관계없이 항상 component 기능과 이를 포함하는 파일에 의미 있는 이름을 지정하십시오. `export default () => {}` 와 같이 이름이 없는 **component**는 디버깅을 더 어렵게 만들기 때문에 사용하지 않는 것이 좋습니다.

## \***\*Exporting and importing multiple components from the same file ( 동일한 파일에서 여러 components 내보내기 및 가져오기)\*\***

Gallery 대신에 `Profile` 를 오직 하나만 보여주고 싶다면 `Profile` component 역시 export 할 수 있다. 그러나 `Gallery.js` 은 이미 default export 되어있다, 그리고 두개의 default export 는 사용할 수 없다. 이럴때는 default export로 새 파일을 만들거나 `Profile` 을 named export를 하여 내보내는 component를 추가할 수 있습니다

> default 및 named export 사이의 잠재적 혼란을 줄이기 위해 일부 팀은 하나의 스타일(default or named)만 고수하거나 **단일 파일에서 혼합하지 않도록 선택**합니다. 당신에게 가장 잘 맞는 일을 하세요!

먼저 `Gallery.js`에서 named export를 사용하여 내보내기( default 키워드 **없음** )

```jsx
export function Profile() {
  // ...
}
```

그런다음 `Profile`을 `import` 하여 Gallery.js에서 App.js로 named import을 사용하여 가지고 옵니다. (중괄호 사용)

```jsx
import { Profile } from "./Gallery.js";
```

마지막으로 App component에서 <Profile />을 **렌더링합니다**

```jsx
export default function App() {
  return <Profile />;
}
```

이제 Gallery.js는 Gallery를 default로 내보내고 named로 Profile 내보내기의 두 가지 내보내기가 포함됩니다. App.js은 둘다 import 하게됩니다.

```jsx
// App.js

import Gallery from "./Gallery.js";
import { Profile } from "./Gallery.js";

export default function App() {
  return (
    <section>
      <Gallery />
      <Profile />
    </section>
  );
}
```

```jsx
// Gallery.js

export function Profile() {
  return <img src="https://i.imgur.com/QIrZWGIs.jpg" alt="Alan L. Hart" />;
}

export default function Gallery() {
  return <h1>Amazing scientists</h1>;
}
```

이제 default export와 named export를 함께 사용하고 있습니다.

**Gallery.js :**

- `Profile` 라는 named export로 component를 내보냅니다.
- `Gallery` component를 default export로 내보냅니다.

**App.js :**

- Gallery.js에서 `Profile`를 named import로 호출하여 가져옵니다.
- Gallery.js에서 default import로 `Gallery`를 가져옵니다.
- root App component를 default import로 내보냅니다.

## \***\*요약\*\***

- 루트 component란
- 어떻게 component를 내보내고 불러오는지
- 언제 default 나 named를 사용하여 내보내고 불러오는지
- 한파일에서 어떻게 여러개의 components를 내보내는지
