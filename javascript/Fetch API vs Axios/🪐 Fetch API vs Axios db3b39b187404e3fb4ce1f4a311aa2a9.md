# 🪐 Fetch API vs Axios

# ****fetch()****

[https://ko.javascript.info/fetch](https://ko.javascript.info/fetch)

**개요**

fetch 함수는 HTTP 요청 전송 기능을 제공하는 클라이언트 사이트 web api다. fetch 함수는 프로미스를 지원하기 때문에 비동기 처리가 자유롭다.

**반환값**

`fetch()`함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고, **Promise 타입의 객체를 반환**합니다. 반환된 객체는, API 호출이 성공했을 경우에는 **응답(response) 객체**를 resolve하고, 실패했을 경우에는 예외(error) 객체를 reject합니다.

```jsx
let url = "https://koreanjson.com/posts/1";

fetch(url).then((response) => console.log(response))
// Responce {...}
```

> ****fetch로는 데이터를 바로 사용할 수 없다.****
> 

**.json 메서드**

우리가 받은 Response 객체는 완전하게 데이터가 다 받아진 상태가 아니다 .

(요청이 성공적으로 처리되었는지는 알 수 있지만,  body(본문)은 없습니다.)

따라서 res객체의 메서드인 .json이라는 메서드를 사용해서 Response 객체를 완료될때까지 읽고 다읽은 body의 텍스트를 **Promise 형태로 반환**한다.

json을 파싱하여 js가 읽을 수 있게하는것

```jsx
let url = "https://koreanjson.com/posts/1";

fetch(url).then((response) => console.log(response.json()))
// Promise {<pending>}
```

**데이터 사용**

위에서 promise형태로 반환한 것을 then으로 체이닝해서 받게되면 json데이터를 사용할 수 있다.

```jsx
let url = "https://koreanjson.com/posts/1";

fetch(url)
  .then((response) => response.json()) //Promise 반환
  .then((json) => console.log(json)) // 서버에서 주는 json데이터가 출력 됨

// {
// 	"id": 1,
// 	"title": "정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여 해산된다.",
// 	"content": "모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 모든 국민은 종교의 자유를 가진다. 국가는 농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과 발전을 보장한다. 모든 국민은 양심의 자유를 가진다. 누구든지 체포 또는 구속을 당한 때에는 즉시 변호인의 조력을 받을 권리를 가진다.",
// 	"createdAt": "2019-02-24T16:17:47.000Z",
// 	"updatedAt": "2019-02-24T16:17:47.000Z",
// 	"UserId": 1
// }
```

**에러처리**

```jsx
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 404 Not Found 에러가 발생한다.
fetch(wrongUrl)
  .then(() => console.log('ok'))
  .catch(() => console.log('error'));
```

위의 예제에서는 fetch가 반환하는 프로미스가 404 Not Found 에러지만 reject하지 않고 ok를 출력한다.

이것은 오프라인 등의 네트워크 장애나 cors 에러에 의해요청이 완료 되지 못한 경우에만 reject()한다.

따라서 fetch함수가 반환한 프로미스가 resolve한 불리언 타입의 ok 상태를 확인해 명시적으로 에러를 처리해야한다.

```jsx
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

// 부적절한 URL이 지정되었기 때문에 404 Not Found 에러가 발생한다.
fetch(wrongUrl)
  // response는 HTTP 응답을 나타내는 Response 객체다.
  .then(response => {
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  })
  .then(todo => console.log(todo))
  .catch(err => console.error(err));
```

이러한 문제점은 async/await을 사용하여 try…catch문으로 쉽게 해결할 수 있다.

자세한 내용은 [async/await](https://www.notion.so/async-await-73d10151d1b046359c998dedabd53f24?pvs=21) 문서를 참고하자.

# ****Axios****

**개요**

axios는 fetch API와 비슷한 역할을 하는 라이브러리인 Axios에 대해 알아보겠습니다. Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리입니다. Axios는 Fetch API보다 사용이 간편하면서 추가적인 기능들이 포함되어 있습니다.

****Fetch API vs Axios****

| Axios | Fetch API |
| --- | --- |
| 써드파티 라이브러리로 설치가 필요합니다. | 빌트인 API라 별도의 설치 필요없습니다. |
| 자동으로 JSON데이터 형식으로 변환됩니다. | .json() 메서드를 사용해야 합니다. |