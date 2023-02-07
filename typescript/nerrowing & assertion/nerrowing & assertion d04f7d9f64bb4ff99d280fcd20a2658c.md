# nerrowing & assertion

### **Type Narrowing**

함수에 union 타입을 파라미터로 가지고 왔을때( 타입이 불안정할때)

typeof으로 타입을 하나로 정해서 리턴 하는 것을 **Narrowing** 이라고 합니다.

```tsx
function 내함수(x :number | string){
	if (typeof x === 'number') {
		return x + 1
	}
	else if (typeof x === 'string') {
		return x + 1
	}
	else {
		return 0
	}
}
```

```tsx
function 내함수(x :number | string){
	let array : number[] = [];
	array[0] = x //에러(x는 union type이기 때문)
}

function 내함수(x :number | string){
	let array : number[] = [];
	if(typeof x === "number"){
		array[0] = x 
	}
}
```

주의할점 : if문을 썻을때 else로 나머지 처리를 해줘야 에러가 혹시 뜨는걸 잡는다.

### **Narrowing으로 판정해주는 문법들**

위에서는 typeof로 타입을 걸러 줬는데 아래 문법도 가능하다.

(그냥 현재 변수의 타입이 뭔지 특정지을 수 있다면 다 인정한다.)

1. 속성명 in 오브젝트자료
2. 인스턴스 instanceof 부모

### **Type** assertion

Narrowing할때 사용하거나 무슨타입이 들어올지 100% 확실할때 쓴다.

(타입스크립트를 쓰는 이유가 사라기 떄문에 if문으로 nerrowing으로 처리를 해주자 )

`변수 as 타입` 변수에 as 타입을 붙여 타입을 지정해서 **union타입에서 타입을 확정할 수 있다.**

```tsx
function 내함수(x :number | string){
	let array : number[] = [];
	array[0] = x as number;
}
```

### **Narrowing으로 HTML 변경과 조작시 주의할 점**

innerHTML로 조작시 제목의 타입이 ELEMENT | NULL이 되기때문에 에러가 뜬다.

(쿼리셀렉터로 설정한게 잘못설정했을 경우 null이 되기때문)

```tsx
let 제목 = document.querySelector("#title");

제목.innerHTML = "반가워요"; //에러

```

 이를 해결하기 위해서는 제목의 타입을 결정하거나 nerrowing을 통해 타입을 정해준다.

(사실 자바스크립트로 짤떄도 쿼리가 선택했는지 체크하고 짤 수 있어 depensive하다)

```tsx
let 제목 = document.querySelector("#title");

if (제목 !== null) {
  제목.innerHTML = "반가워요";
}
```

nerrowing할때 instanceof 쓰는게 위의 경우보다 좋다.

```tsx
let 제목 = document.querySelector("#title");

if (제목 instanceof Element) {
  제목.innerHTML = "반가워요";
}
```

optional chaning으로 ? 왼쪽 오브젝트자료에 innerHTML있으면 쓰고 없으면 undefined 남기는 걸로

쿼리셀렉터를 잘선택했는지 체크해서 작업한다.

```tsx
let 제목 = document.querySelector('#title');
if (제목?.innerHTML != undefined) {
  제목.innerHTML = '반갑소'
}
```

아래의 HTMLAnchorElement는 <a>태그의  타입인데 이처럼 html요소의 타입에 맞게 쓰자

```tsx
let 링크 = document.querySelector("#link");

if (링크 instanceof HTMLAnchorElement) {
  링크.href = "http://kakao.com";
}
```

eventlistener의 경우 아래처럼 optionnalchainning가능

```tsx
let 버튼 = document.querySelector("#button");
버튼?.addEventListener("click", ()=>{})
```

아래의 querySelectorAll을 사용하면 타입이 NodeListOf로 나오기 떄문에 foreach로 각각 변경

```tsx
let 링크 = document.querySelectorAll(".naver");
링크.forEach((a) => {
  if (a instanceof HTMLAnchorElement) {
    a.href = "https://kakao.com";
  }
});
```