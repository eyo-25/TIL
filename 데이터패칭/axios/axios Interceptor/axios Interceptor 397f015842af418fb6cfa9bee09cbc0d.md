# axios Interceptor

[https://axios-http.com/docs/interceptors](https://axios-http.com/docs/interceptors)

[https://medium.com/zigbang/우리-axios에게-다시-한-번-기회를-주세요-a7b32f4f2db2](https://medium.com/zigbang/%EC%9A%B0%EB%A6%AC-axios%EC%97%90%EA%B2%8C-%EB%8B%A4%EC%8B%9C-%ED%95%9C-%EB%B2%88-%EA%B8%B0%ED%9A%8C%EB%A5%BC-%EC%A3%BC%EC%84%B8%EC%9A%94-a7b32f4f2db2)

axios 인터셉터는 axios에서 제공하는 기능으로, HTTP 요청 및 응답을 가로채고 수정하는 데 사용됩니다. 이를 통해 요청 또는 응답을 전처리하거나 후처리할 수 있습니다. 주로 다음과 같은 목적으로 사용됩니다:

1. 요청 전처리: 인터셉터를 사용하여 요청을 보내기 전에 헤더를 수정하거나 인증 토큰을 추가할 수 있습니다.
2. 응답 후처리: 인터셉터를 사용하여 응답을 받은 후에 응답 데이터를 가공하거나 에러 처리를 수행할 수 있습니다.
3. 오류 처리: 인터셉터를 사용하여 HTTP 오류 상태 코드에 따른 특정 작업을 수행하거나 에러 메시지를 가공할 수 있습니다.
4. 로딩 상태 관리: 인터셉터를 사용하여 요청 시작 및 완료 시점에 로딩 상태를 관리할 수 있습니다.

axios에서는 **`axios.interceptors.request`**와 **`axios.interceptors.response`**를 사용하여 요청 및 응답 인터셉터를 등록할 수 있습니다. 각각 요청과 응답에 대한 인터셉터를 등록하고, 해당 인터셉터에서 전처리 또는 후처리 로직을 구현합니다.

예를 들어, 요청 인터셉터에서는 헤더에 인증 토큰을 추가할 수 있습니다:

```tsx
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

위의 예시 코드에서 **`axios.interceptors.request.use`**를 사용하여 요청 인터셉터를 등록하고, **`config`** 매개변수를 통해 요청 설정을 수정합니다. 이 경우에는 **`Authorization`** 헤더에 인증 토큰을 추가하는 로직을 구현하였습니다.

응답 인터셉터에서는 응답을 받은 후에 처리할 작업을 수행할 수 있습니다. 예를 들어, 오류 상태 코드에 따라 특정 작업을 수행하거나 에러 메시지를 가공할 수 있습니다:

```tsx
axios.interceptors.response.use(
  (response) => {
    // 응답 데이터 가공 또는 처리 로직
    return response;
  },
  (error) => {
    // 오류 처리 또는 에러 메시지 가공 로직
    throw error;
  }
);
```

위의 예시 코드에서 **`axios.interceptors.response.use`**를 사용하여 응답 인터셉터를 등록하고, **`response`**와 **`error`** 매개변수를 통해 응답 또는 오류를 처리합니다.

이와 같이 axios 인터셉터를 사용하면 요처리하기 전후에 필요한 작업을 수행할 수 있습니다. 요청 전처리, 응답 후처리, 오류 처리 등 다양한 상황에서 인터셉터를 활용하여 axios 요청과 응답을 수정하고 추가적인 작업을 수행할 수 있습니다.
