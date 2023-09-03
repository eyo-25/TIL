# 🚀 axios Interceptor를 이용한 api처리

[https://medium.com/zigbang/우리-axios에게-다시-한-번-기회를-주세요-a7b32f4f2db2](https://medium.com/zigbang/%EC%9A%B0%EB%A6%AC-axios%EC%97%90%EA%B2%8C-%EB%8B%A4%EC%8B%9C-%ED%95%9C-%EB%B2%88-%EA%B8%B0%ED%9A%8C%EB%A5%BC-%EC%A3%BC%EC%84%B8%EC%9A%94-a7b32f4f2db2)

## 문제인식

---

우리는 로그인이 필요한 요청과 아닌 요청을 구분할 필요가 있습니다. 왜냐하면 로그인이 필요한 경우 header에 토큰을 실어서 요청을 해야하기 때문입니다. 또한 매 요청마다 에러처리나 성공처리에 대한 부분을 일괄적으로 처리하고 확인할 필요성이 있습니다.

## Instance

---

[https://axios-http.com/docs/instance](https://axios-http.com/docs/instance)

우리는 사용자 정의 구성을 사용하여 새로운 axios 인스턴스를 생성할 수 있습니다.

로그인이 필요한 인스턴스를 구분하기 위해 authInstance와 일반 instance를 작성해주도록 합니다. 또한 서버가 동작하지 않거나 잘못된 경우 무제한으로 기다리기 보다 timeout을 통해 제한을 둡니다.

```jsx
const timeout = 5000;

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout,
});

export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout,
});
```

## Interceptors

---

[https://axios-http.com/docs/interceptors](https://axios-http.com/docs/interceptors)

axios 인터셉터는 axios에서 제공하는 기능으로, HTTP 요청 및 응답을 가로채고 수정하는 데 사용됩니다. 이를 통해 요청 또는 응답을 전처리하거나 후처리할 수 있습니다. 주로 다음과 같은 목적으로 사용됩니다.

1. 요청 전처리: 인터셉터를 사용하여 요청을 보내기 전에 헤더를 수정하거나 인증 토큰을 추가할 수 있습니다.
2. 응답 후처리: 인터셉터를 사용하여 응답을 받은 후에 응답 데이터를 가공하거나 에러 처리를 수행할 수 있습니다.
3. 오류 처리: 인터셉터를 사용하여 HTTP 오류 상태 코드에 따른 특정 작업을 수행하거나 에러 메시지를 가공할 수 있습니다.
4. 로딩 상태 관리: 인터셉터를 사용하여 요청 시작 및 완료 시점에 로딩 상태를 관리할 수 있습니다.

axios에서는 **`axios.interceptors.request`**와 **`axios.interceptors.response`**를 사용하여 요청 및 응답 인터셉터를 등록할 수 있습니다. 각각 요청과 응답에 대한 인터셉터를 등록하고, 해당 인터셉터에서 전처리 또는 후처리 로직을 구현합니다.

## Login 처리

---

응답(response) 인터셉터중 response.config.url이 `**'/login'**`인 경우 액세스 토큰과 멤버아이디를 저장해야합니다.

이를 위해서 header에서는 'authorization'부분의 accessToken을 가져오고 jwt의 payload에 해당하는 부분의 정보는 base64로 되어있기에 디코드하여 멤버아이디를 저장하고 이를 통해 이후에 유저정보를 가져올 수 있도록 로컬에 세팅해줍니다.

```tsx
instance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/login') {
      const headers = response.headers;
      const accessToken = headers['authorization'].replace('Bearer ', '');
      const memberId = decodeJWT(accessToken).memberId;

      storage.set('accessToken', accessToken);
      storage.set('memberId', memberId);
    }
    return response;
  },
  (error) => {
	...
	}
);
```

에러처리의 경우 `**error.response.data.message`** 를 읽어서 특정한 에러 메세지가 있는경우 해당 메세지로 처리를 해주고 아니면 기본적인 에러메세지를 출력하도록 해줍니다.

```jsx
instance.interceptors.response.use(
  (response) => {
		...
  },
  (error) => {
    const errMsg = error.response.data.message;

    if (error.config.url === '/signup') {
      error.message = errMsg === 'member exists' ? '이미 존재하는 유저입니다.' : '회원가입 오류';
    }

    if (error.config.url === '/login') {
      error.message =
        errMsg === 'Unauthorized' ? '이메일이나 비밀번호를 올바르게 입력해 주세요' : '로그인 오류';
    }

    throw error;
  }
);
```

## authInstance

---

로그인이 필요한 요청(request)의 경우 액세스 토큰을 헤더에 담아 요청을 보냅니다.

```jsx
authInstance.interceptors.request.use(
  (config) => {
    const accessToken = storage.get('accessToken');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

## 마무리

---

인스턴스 구분을 통해 로그인이 필요한 요청과 아닌 요청을 분리하여 일괄된 요청과 응답에 따른 처리를 하고 axios 인터셉터를 사용하여 요청과 응답을 처리하기 전후에 필요한 작업을 수행할 수 있습니다. 요청 전처리, 응답 후처리, 오류 처리 등 다양한 상황에서 인터셉터를 활용하여 axios 요청과 응답을 수정하고 추가적인 작업을 수행할 수 있다는 점을 배웠습니다.

![BpRHmn2CYAAjuWt.jpg](%F0%9F%9A%80%20axios%20Interceptor%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20api%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%20397f015842af418fb6cfa9bee09cbc0d/BpRHmn2CYAAjuWt.jpg)

axios 최고!!