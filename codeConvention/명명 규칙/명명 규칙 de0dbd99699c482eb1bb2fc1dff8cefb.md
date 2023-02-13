# 명명 규칙

****상수는 영문 대문자 스네이크 표기법(Snake case)를 사용.****

```jsx
const ADD_COUNT = "ADD_COUNT";
```

****생성자는 대문자 카멜 케이스을 사용한다.****

```jsx
let variableName;
```

****변수, 함수에는 카멜 케이스을 사용한다.****

```jsx
let variableName;
```

**이벤트 핸들러는 “on”으로 시작**

```jsx
const onClick = () => {};
const onKeyDown = () => {};
```

**배열은 복수형 이름을 사용**

```jsx
const dogs = [];
```

**블린 반환 함수나 state는 “is”로 시작**

```jsx
const [isClicked,setIsClick] = useState(true);

let isAvailable = ()=>false;
```

**지역변수 혹은 private 변수는 언더바(_)로 시작**

```jsx
let _studentId;
```

****전역 변수를 사용하지 않는다.****

모든 컴파일 단위는 하나의 공용 전역 객체(window)에 로딩된다. 전역 변수는 언제든지 프로그램의 모든 부분에서 접근할 수 있기 때문에 편하지만, 바꿔 말하면 프로그램의 모든 부분에서 변경될 수 있고, 그로 인해 프로그램에 치명적인 오류를 발생시킬 수 있다.

```jsx
// Bad
myglobal = "hello";
```