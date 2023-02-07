# literal Type

literal Type은 변수에 **특정 글자나 숫자**만 가질 수 있게 제한을 두는 것을 말합니다.

```tsx
let john :'대머리';
```

and 연산자로  두개 이상으로 지정도 가능하다.

```tsx
let john :'대머리' | '솔로';
```

함수에 들어올 파라미터도 제한이 가능하다.

(아래의 경우 ‘hello’만 파라미터로 들어가고 return은 1,0,-1만 가능하다)

```tsx
function 함수(a : 'hello') : 1 | 0 | -1 {
	return 1
}

함수('hello')
```

아래는 리턴되는 array안의 값을 "가위" | "바위" | "보"로 제한을 두었다.

```tsx
type UserGame = "가위" | "바위" | "보";

function 함수(a: UserGame): UserGame[] {
  return [a];
}

console.log(함수("가위"));
```

### literal Type의 문제점

아래의 경우 함수는 'kim' 타입만 입력할 수 있다고 해놨지만

자료.name 이라는건 string 타입이지 'kim' 타입이 아니기 때문에 에러

```tsx
var 자료 = {
  name : 'kim'
}

function 내함수(a : 'kim') {}

내함수(자료.name)
//에러
```

이것을 해결하기위해선 자료변수에 `{name: "kim"}`를 넣거나 as를 사용한다.

```tsx
var 자료 : {name: "kim"} = {
  name : 'kim'
}

function 내함수(a : 'kim') {}

내함수(자료.name)
```

```tsx
var 자료 = {
  name: "kim",
};

function 내함수(a: "kim") {}

내함수(자료.name as "kim");
```

as const는 선언된 변수의 값을 그대로 타입으로 지정을 해준다.(readonly를 쓰는것과 같다)

```tsx
var 자료 = {
  name: "kim",
} as const

function 내함수(a: "kim") {}

내함수(자료.name);
```