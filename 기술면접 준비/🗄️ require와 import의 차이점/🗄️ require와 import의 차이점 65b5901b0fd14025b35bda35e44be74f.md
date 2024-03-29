# 🗄️ require와 import의 차이점

## 모듈 시스템

---

### **모듈이란?**

JavaScript에서 모듈은 코드를 여러 파일로 나누어 구성하고 관리하기 위한 단위입니다. 모듈은 기능별로 코드를 분할하여 파일 단위로 작성하고 다른 파일에서 재사용할 수 있도록 합니다. 이를 통해 코드의 유지보수성과 재사용성을 높일 수 있습니다.

### require와 import의 차이점

모듈시스템으로 CommonJS를 사용한 것과 ES6을 사용한 것의 차이입니다.

대표적으로 CommoneJS를 사용한 Nodejs는 require을 통해 외부 파일이나 라이브러리를 불러오지만, ES6 모듈 시스템을 사용한 리액트는 import틀 통해 라이브러리를 불러옵니다. Babel과 같은 ES6 코드를 변환해주는 도구가 없다면 require을 사용해야합니다.

## **용어정리**

---

**바벨이란?**

바벨이란 ES6+버전의 자바스크립트, 타입스크립트, jSX 등 다른 언어로 분류되는 언어들에 대해 모든 브라우저에서 동작할 수 있도록 호환시켜주는 툴입니다. 바벨은 최신 문법을 이전세대 문법으로 호환시켜주는 기능이 있는데 그 중 하나가 JSX문법입니다. JSX를 ES5 코드로 바꿔 브라우저에 작동할 수 있도록 하여 리액트에서 바벨이 사용된다.