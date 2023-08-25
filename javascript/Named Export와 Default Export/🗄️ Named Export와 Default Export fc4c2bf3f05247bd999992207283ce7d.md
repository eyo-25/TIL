# 🗄️ Named Export와 Default Export

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

[https://www.youtube.com/watch?v=WUirHxOBXL4](https://www.youtube.com/watch?v=WUirHxOBXL4)

[https://velog.io/@dongdong98/JavaScript-상대-경로를-깔끔하게-관리하는-법-모듈-index.js-활용](https://velog.io/@dongdong98/JavaScript-%EC%83%81%EB%8C%80-%EA%B2%BD%EB%A1%9C%EB%A5%BC-%EA%B9%94%EB%81%94%ED%95%98%EA%B2%8C-%EA%B4%80%EB%A6%AC%ED%95%98%EB%8A%94-%EB%B2%95-%EB%AA%A8%EB%93%88-index.js-%ED%99%9C%EC%9A%A9)

## Name Export

---

**`export`** 키워드를 사용하여 여러 개의 함수, 변수 등을 이름을 지정하여 내보냅니다. 내보낸 항목은 동일한 이름으로 가져와야 합니다.

```tsx
// math.js

export const plus = (a: number, b: number) => a + b;
export const minus = (a: number, b: number) => a - b;
export const divide = (a: number, b: number) => a / b;
```

위에서 export한 함수를 받아오기 위해서는 `**import**`를 통해 받아올 수 있습니다.

받아올때는 꼭 export한 name과 동일한 이름으로 받아와야합니다.

```tsx
// main.js

import { plus } from "./math"
plus(1,2)
```

## **Alias with Named Export**

---

name export한 모듈을 **`as`** 키워드를 사용하여 가져올 때 이름을 바꿀 수 있습니다.

```tsx
// main.js

import { plus as add } from "./math"

add(1,2)
```

## Default export

---

각 파일마다 하나의 항목만 **`export default`**를 사용하여 내보낼 수 있습니다. 가져올 때 이름을 자유롭게 지을 수 있다는 장점이 있습니다.

한개의 파일에서 모든걸 export하고 모든걸 import하는 방법이 있습니다.

이는 import할때 이름을 자유롭게 지을 수 있으며 math.js에서 export default하고 있는 객체를 받을 수 있다는 것을 의미합니다.

```tsx
// math.js

const plus = (a: number, b: number) => a + b;
const minus = (a: number, b: number) => a - b;
const divide = (a: number, b: number) => a / b;

export default { plus, minus, divide }
```

```tsx
// main.js

import myMath from "./math";

myMath.divide(1, 2)
```

물론 하나의 함수만 export default하고 import하는 것도 가능합니다.

```tsx
// math.js

const plus = (a: number, b: number) => a + b;

export default plus;
```

```tsx
// main.js

import plus from "./math"

plus(1,2)
```

export default는 하나의 파일에 하나만 존재할 수 있지만 export는 여러개 할 수 있습니다.

```tsx
// math.js

const plus = (a: number, b: number) => a + b;
export const minus = (a: number, b: number) => a - b;
export const divide = (a: number, b: number) => a / b;

export default plusl;
```

## ****`*` Star Import**

---

모든 export된 내용을 import하고 싶은 경우 **(default export가 없는 파일에서 가능)**

먼저 아까와 같이 세개의 함수를 export해 보겠습니다.

```tsx
// math.js

export const plus = (a: number, b: number) => a + b;
export const minus = (a: number, b: number) => a - b;
export const divide = (a: number, b: number) => a / b;
```

`*` (star import)은 everything을 의미하며 `import * as myMath from "./math"`는 math 모듈에서 모든걸 import해서 myMath라는 객체에 넣을 것이라는 의미입니다.

```tsx
// main.js

import * as myMath from "./math";

myMath.plus(1, 2);
```

```tsx
// main.js

import * as myMath from "./math";

myMath.plus(1, 2);
```

## index를 이용한 모듈화

---

이제 우리는 위의 Start import를 사용해서 하나의 폴더에서 모든 export를 모아 export해보겠습니다.

먼저 3개의 export파일을 작성합니다.

```tsx
// plus.js

export const plus = (a: number, b: number) => a + b;
```

```tsx
// minus.js

export const minus = (a: number, b: number) => a - b
```

```tsx
// divide.js

export const divide = (a: number, b: number) => a / b;
```

현재 파일의 상태는 아래와 같습니다.

```tsx
root
├── math
│		├── plus.js
│		├── minus.js
│		└── divide.js
└── main.js
```

여기에서 math폴더에 있는 3개파일에서 export하는 함수들을 index.js에 모아서 export 하겠습니다.

```tsx
// /math/index.js

export * from "./divide";
export * from "./minus";
export * from "./plus";
```

```tsx
root
├── math
│		├── plus.js
│		├── minus.js
│		└── divide.js
│		└── index.js
└── main.js
```

이제 3개의 함수를 사용할 main은 어떻게 구성될까요?

아래와 같이 모든 파일을 구조분해할당으로 가져올 수 있는것을 볼 수 있습니다.

```tsx
import { plus, minus, divide } from "./math";

plus(2,2)
```

이는 아래와 같이 중첩된 폴더에서도 가능한 것을 볼 수 있습니다.

```tsx
root
├── screens
│		├── home
│		│		├── home.const.ts
│		│		├── home.screen.tsx
│		│		└── index.ts
│		├── auth
│		│		├── auth.const.ts
│		│		├── auth.screen.tsx
│		│		└── index.ts
│		└── index.ts
└── app.tsx
```

## **별칭(Alias)을 이용한 모듈 내보내기**

---

리액트를 사용하다보면 export default를 사용할일이 많은데  위의 star import를 이용하여 index를 사용하는 경우 각 컴포넌트에서 export default를 사용할 수 없습니다. 

먼저 컴포넌트에서 export default를 써야하는 이유는 export default는 한 모듈에 하나만 내보낼 수 있습니다. 이는 리액트에서 컴포넌트를 내보낼때 한 모듈당 하나의 기능을 정의하여 모듈의 역활을 명확히 하며 다른 사용자가 모듈의 주요기능을 빠르게 식별하여 사용할 수 있도록합니다.

 

이를 활용하기 위해서는 각각의 컴포넌트에서 export default로 내보내고 index에서 export로 내보낼때 별칭으로 내보내서 다른 파일에서 쉽고 깔끔하게 사용할 수 있습니다.

```jsx
// components/index.js

export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Sidebar } from './Sidebar';
```

```jsx
// App.js

import { Header, Footer } from './components';

function App() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
```

파일경로는 아래와 같습니다.

```jsx
src
├── components
│   ├── Header.js
│   ├── Footer.js
│   ├── Sidebar.js
│   └── index.js
└── App.js
```