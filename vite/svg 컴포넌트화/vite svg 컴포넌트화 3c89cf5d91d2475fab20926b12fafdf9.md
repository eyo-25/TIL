# vite svg 컴포넌트화

```tsx
yarn add vite-plugin-svgr
```

```tsx
// /vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
```

```tsx
// /src/vite-env.d.ts

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
```

사용

```tsx
import { ReactComponent as LogoSvg } from '@/assets/logo.svg';

function Header() {
  return (
    <header className='bg-red-100 flex-center h-56pxr'>
          <LogoSvg />
    </header>
  );
}

export default Header;
```