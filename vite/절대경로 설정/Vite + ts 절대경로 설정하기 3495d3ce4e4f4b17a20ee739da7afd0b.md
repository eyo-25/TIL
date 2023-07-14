# Vite + ts 절대경로 설정하기

[https://l4279625.tistory.com/110](https://l4279625.tistory.com/110)

먼저 아래와같은 상황에서 import를 하는 경우입니다.

```tsx
src
├── components
│		└── Mycomponent
│		     └── Mycomponent.js
├── common
│		└── apis
│		     └── apis.js
└── main.js
```

## **상대 경로**

---

상대 경로는 현재 파일을 기준으로 다른 파일의 위치를 참조하는 방식입니다. 상대 경로는 파일과 파일 간의 상대적인 위치를 나타내며, 상위 디렉토리(**`..`**)나 현재 디렉토리(**`.`**)를 사용하여 경로를 지정합니다.

이같은 상대경로의 문제점은 경로가 깊어지고 폴더가 다양해지면 나중에는 `../../../파일명` 과 같은 가독성 떨어지는 형태를 띄게 됩니다.

```tsx
import { fetchData } from "../../common/apis/utils";
```

## **절대 경로**

---

절대 경로는 파일의 위치를 프로젝트 전체 경로를 기준으로 참조하는 방식입니다. 

절대 경로는 프로젝트 전체를 기준으로 하기 때문에 파일의 위치 이동에 상관없이 일관된 경로를 유지할 수 있습니다. 이는 **프로젝트의 구조가 변경되거나 파일을 여러 곳에서 참조해야 할 때 유용**합니다.

아래의 경우에는 src를 *baseUrl*으로 경로를 설정 하였습니다.

```tsx
import { fetchData } from "@/common/apis/utils";
```

## **Vite + TypeScript 절대 경로 설정 방법**

---

### **Vite + TypeScript**

Vite + 타입스크립트 프로젝트에서는 `vite.config.ts` 와 `tsconfig.json` 두 파일 모두 옵션을 추가해주어야 합니다.

`tsconfig.json` 는 `"compilerOptions"` 객체 내에 `"baseUrl"` 속성로 `“.”` 을 설정해프로젝트의 루트 디렉토리를 기준으로 상대 경로가 해석됩니다.

"paths" 속성으로 `src/*` 의 경로를 `"@/*"` 별칭 경로로 수정하여 사용합니다.

```tsx
// tsconfig.json

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
}
```

`vite.config.ts` 에서 path를 사용하기 위해서는 `@types/node` 를 설치해 주어야 합니다.

```tsx
yarn add @types/node
```

```tsx
// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
```

이렇게 하면 경로의 `@` 를 찾아(find) src로 대체(replacement)해줍니다.

TypeScript 컴파일러는 `tsconfig.json` 파일에 기반하여 경로를 해석합니다. 따라서 설정을 변경한 후에는 IDE를 다시 시작해주어야합니다. ( 빨간줄 떠있습니다.)