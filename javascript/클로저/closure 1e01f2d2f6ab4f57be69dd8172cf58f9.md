# closure

![asddwddw.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/asddwddw.png)

▲ callstack의 fn1의 안에 있는 fn2일때는 **fn1에서 선언한 l1이 로컬에 없는 것**을 볼 수 있다.  따라서 5번의 브레이크 포인트에서 console.log(l0,l1,l2)실행시 l1을 찾을 수 없다고 error 출력  (Uncaught ReferenceError: l1 is not defined)

![asddd.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/asddd.png)

▲ callstack의 fn1의 경우에는 l1이 잘 들어있는것을 볼 수 있다.

자바스크립트는 어디에서 호출됬는지에따라 유효범위가 달라지는

**dynamic scope**(동적스코프)가 아닌 **Lexical scope**(정적스코프)를 채택하고 있기 때문에 **fn1안에서 fn2를 호출**했다고 하더라도 fn1안에서 정의된 l1이라는 정보에 접근할 수 없습니다.

![efefb.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/efefb.png)

▲ 하지만 **fn2함수를 fn1안에서 선언했을 경우** callstack의 fn2안에서도 **closure(fn1)**안에 fn1에서 선언한 l1이 scope에 포함되어있음을 알 수 있다.

이때 console.log(l0,l1,l2)를 실행하면 fn2에서 l1을 출력시 scope에서 찾을때

 local에 없으니 **부모인 closure에서 l1을 참조하여 출력**하게 된다.

![ghhh.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/ghhh.png)

따라서 자바스크립트는 함수가 어디서 실행됬느냐가 아닌 어디서 정의됬는지에 따라 달라 지는  **Lexical scope = Static scope(정적스코프)**를 채택하고 있다.

(함수를 정의를 하면 한번더 하지않기 때문)

![sdsd.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/sdsd.png)

▲ 위와같이 fn1 안에 fn2 그안에 fn3를 정의 했을 경우

callstack fn3의 scope에는 local에 fn3에서 정의한 l3가 부모인 closure(fn2)에는 fn2에서 정의한 l2가 그리고 그부모인 closure(fn1)에는 fn1에서 정의한 l0이 들어있는 것을 볼 수 있다.

![asdsdc.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/asdsdc.png)

▲ console.log(더하기1(1))진행시 더하기함수공장 함수 안의 덧셈 함수의 scope이다.

덧셈 함수는 더하기함수공장 함수의 초기값인 1을 closure로 가지고 있는것을 볼 수 있다.

이것은 덧셈 함수가 더하기함수공장 함수에서 선언될때 부**모함수가 가지고 있는 변수들을 동봉해서 가지고 있기 때문에** 언제든지 쓸수있다는 것을 의미합니다.

따라서 **함수가 정의될때 상위스코프를 참조해서 내부슬롯이 저장**된다는걸 알 수 있습니다.

![sdffdfdf.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/sdffdfdf.png)

함수호출 > 실행 컨텍스트(excute context) 생성 > 실행 컨텍스트 stack push >

렉시컬 환경을 생성 > 코드실행되면 실행 컨텍스트 stack pop하여 제거

![asdsdds.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/asdsdds.png)

▲ 위와같은 코드를 실행하였을때

![asddsds.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/asddsds.png)

▲ 먼저 outer()가 실행되고

![asdds.PNG](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/asdds.png)

▲ inner()를 반환하고 사라진다. 이때 inner()가 생성될때 본인의 내부슬롯에 있는 본인의 렉시컬환경을 참조하기 때문에 outer()의 x는  garbage collection의 대상이 되지않고 inner에서 참조할 수 있게 된다.

inner함수를 실행할때는 outer() = 외부함수는 lifecyle(생명주기)를 마감했지만 closure로 스코프 체인되어있어 outer()의 **자유변수를** 참조할 수 있다.

따라서 중첩함수가 상위스코프의 식별자를 참조하고 있고 본인의 외부함수보다 더 오래 살아있다면 클로져라고 할 수 있다.

[다운로드 (1).jfif](closure%201e01f2d2f6ab4f57be69dd8172cf58f9/%25EB%258B%25A4%25EC%259A%25B4%25EB%25A1%259C%25EB%2593%259C_(1).jfif)

즉, **클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수다**