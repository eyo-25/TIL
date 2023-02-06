# ts 기본 문법

### 타입의 종류

![sdffdf.PNG](ts%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%2035155dc8ec3a4cd9a3a90c1abdd0d6dc/sdffdf.png)

### 타입의 특징

타입스크립트는 **타입이 다를 시 컴파일 전에 에러**를 뱉어 낸다

![sdsdsd.PNG](ts%20%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%87%E1%85%A5%E1%86%B8%2035155dc8ec3a4cd9a3a90c1abdd0d6dc/sdsdsd.png)

### array타입

array타입을 지정하여 배열안에 들어올 요소의 타입을 지정할 수 있습니다.

```tsx
let 이름배열 : string[] = ["kim", "park"]
let 이름 : number[] = [1, 2]
```

### **object 타입**

object타입을 지정하여 객체안에 들어올 요소의 타입을 지정할 수 있습니다.

```tsx
let 이름객체 : {name : string}  = {name: "kim"}
```

여러개의 key를 한번에 지정할때 아래와 같이 사용가능하다.

```tsx
type Member = {
	[key :string] : string | number
} 

let 멤버1 : Member = {name: "kim", age: 29}
```

### option

타입에 **`?`**를 넣어 해당 타입을 넣어도 되고 안넣는 것을 선택할 수 있다.

```tsx
let 이름객체 : {name? : string}  = {}
```

변수?  : number 는 변수 : number | undefined되는것과 똑같다.

```tsx
let 이름객체 : {name : number | undefined}  = {}
```

따라서 아래코드는 return에 number만 와야하는데 x는 number | undefined 니까

결과 출력시에 에러가 출력될 수 있다.

```tsx
//에러
function 내함수(x? :number) :number { 
  return x * 2 
}
```

### union type

or를 넣어 2가지 이상의 타입을 사용할 수 있습니다.

```tsx
let 이름 : string | number = "kim"
let 숫자 : string | number | boolean = 123
let 숫자배열 : string[] | number = ["a","b","c"]
```

array와 object에서의 union type 사용법

```tsx
let 회원들: (string | number)[] = [1, "2", 3];
let 오브젝트: { a: string | number } = { a: 123 };
```

타입스크립트는 변수+1을 사용할때 string | number은 string이나 number가 아닌 새로운 타입으로 인식하기에 각각썻을땐 오류가 없지만 union타입은 에러가 나온다.

```tsx
//에러
let 나이 : string | number;
나이 + 1;
//통과
let 나이1 : string;
나이1 + 1;
//통과
let 나이2 : number;
나이2 + 1;
```

그냥 쌩 자바스크립트에서는 문자나 숫자나 모두 +1 이 가능하지만 타입스크립트에선 변수의 타입이 union type인 경우 자료 조작을 금지한다.

```tsx
//에러
function 자릿수세기(x :number | string){
	return x + 1
}
//통과
function 자릿수세기(x :string):string{
	return x + 1
}
//통과
function 자릿수세기(x :number):string{
	return x + 1
}
```

### type alias

타입을 변수처럼 저장해서 넣을 수 있다.(이때 보통 첫글자에 대문자사용)

```tsx
type IName = string | number;

let 이름 : IName = 123;
```

### literal type

지정한 타입에 들어올 글자를 고정할 수 있다.

```tsx
type NameType = 'kim' | 'park';

let 이름 :NameType = 'kim';
let 이름2 :NameType = 'park';
```

### tuple type

```tsx
type Member = [number, boolean];

let john:Member = [100, false]
```

```tsx
type MyObject = {
	name? : string,
	age : number
}

let 철수 :MyObject = {
	name : 'kim',
	age : 50
}
```

### 함수에 파라미터 지정

```tsx
funtion 함수명 (파라미터: 파라미터타입) : 리턴타입 {
	return
}
```

 ▼아래가 에러가 뜨는 이유는 x가 string이 올 수 있는데 return의 타입은 number가 

고정이기 때문입니다.

```tsx
//에러
function 함수명(x :number | string) : number {
return x * 2
}
```

```tsx
//가능
function 함수명(x :number | string) {
	if (typeof x === 'number'){
		return x * 2
	}
}
```

리턴하지 않는 함수를 엄격하게 type을 지정하려면 void 타입을 사용합니다.

```tsx
function 내함수(x :number) :void { 
  1+1
}
```

```tsx
function 내함수(x :number) :void { 
  return 1+1
	//여기서 에러 출력
}
```

js와 달리 타입이 지정된 파라미터를 가진 함수는 꼭 매개변수를 넣어줘야된다

(js는 안넣어도 됨)

```tsx
function 함수(x :number) :number { 
  return 1 + 1
}

함수() //매개변수넣을때까지 에러출력
```

이럴때는 ?를 통해 옵션으로 파라미터를 설정해준다.

```tsx
function 함수(x ?:number) :number { 
  return 1 + 1
}

함수() //매개변수넣을때까지 에러출력
```

### class 타입지정

```tsx
class Person {
	name;
	constructor(name :string){
		[this.name](http://this.name/) = name;
	}
}
```

### 변수 선언시 타입이 없으면 자동으로 타입이 설정됩니다.

```tsx
let age = 123 // age의 타입은 number이다.
let name = "john" //name의 타입은 string이다.

let project = {
  member: ["kim", "park"],
  days: 30,
  started: true,
};

//project의 타입은 {member:string[], days: number, started: boolean}
```

### any

any는 모든 자료형을 허용해준다.(하지만 이걸쓰면 타입스크립트 쓰는 의미가 없음)

```tsx
let 이름:any = "eyo"
let 나이:any = 123
```

### unknown

any처럼 모든자료를 허용한다.

```tsx
let 이름: unknown = 'kim';
이름 = 123;
이름 = undefined;
이름 = [];
```

타입이 지정된 변수에 할당되면 에러를 뱉기에 any보다 안전하고 오염을 방지해준다.

```tsx
//에러 1
let 이름: unknown;

let 변수1: string = 이름;
let 변수2: boolean = 이름;
let 변수3: number = 이름;
```

```tsx
//에러 2 간단한 뺄셈을 넣어도 타입을 지정해야된다.
let 이름 : unknown;
이름 - 1
//에러 3 간단한 연산할때도 엄격하게 타입을 지정하지 않으면 에러가 뜬다.
let 나이 : unknown = 1;
이름 - 1
```

같은조건에서 any는 에러를 띄우지 않는다.

```tsx
let 이름: any;

let 변수1: string = 이름;
let 변수2: boolean = 이름;
let 변수3: number = 이름;
```

### undefined