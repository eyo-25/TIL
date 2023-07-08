# Redux Toolkit

[https://redux-toolkit.js.org/usage/usage-guide](https://redux-toolkit.js.org/usage/usage-guide)

## Redux Toolkit 개념

---

Redux Toolkit은 앞에서 배운 Redux thunk와 dev tools, immer가 내장되어있습니다.

따라서 지금까지 사용한 라이브러리를 지울 수 있습니다. ( 노란색 마크된 부분 삭제 )

```tsx
// pakage.js

"dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "immer": "^10.0.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.0",
    "react-router-dom": "^6.12.1",
    "react-scripts": "5.0.1",
    "redux": "^4.2.1"
    "web-vitals": "^2.1.4"
  },
	"devDependencies": {
    "redux-devtools-extension": "^2.13.9"
  }
```

리덕스 툴킷만 적용해도 됩니다.

```tsx
// pakage.js

"dependencies": {
    "@reduxjs/toolkit": "^1.9.5",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.0",
    "react-router-dom": "^6.12.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }
```

## Redux Toolkit를 사용한 store

---

```tsx
// store.js

import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  user: {
    data: null,
    isLogInLoad: false,
  },
  posts: [],
};

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("액션로깅", action);
  dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
  //액션이 함수일때 (비동기인 경우) thunk가 함수를 실행시키도록함
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  }
  // 기본동작
  return dispatch(action);
};

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware));

const store = createStore(rootReducer, initialState, enhancer);

export default store;
```

Redux thunk와 dev tools가 configureStore에 내장되어 있어서 아래와 같이 작성해 준다.

```tsx
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("액션로깅", action);
  dispatch(action);
};

const store = configureStore({
  rootReducer,
  middleware: [firstMiddleware, ...getDefaultMiddleware],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
```

## slice 개념

---

리덕스 툴킷의 **`createSlice`** 함수는 리덕스 스토어에 사용될 상태(state), 액션 크리에이터(action creator) 함수, 그리고 리듀서(reducer) 함수를 자동으로 생성해주는 유틸리티 함수입니다. 이를 통해 반복적이고 번거로운 작업들을 최소화하고, 코드의 가독성과 유지보수성을 향상시킬 수 있습니다.

**`createSlice`** 함수를 사용하여 생성된 슬라이스(slice)는 상태, 액션 크리에이터 함수, 리듀서 함수를 하나의 패키지로 묶어줍니다. 슬라이스는 **`name`**, **`initialState`**, **`reducers`**와 같은 속성을 갖습니다.

- **`name`**: 슬라이스의 이름을 지정합니다.
- **`initialState`**: 슬라이스의 초기 상태를 정의합니다.
- **`reducers`**: 액션 타입에 기반하여 상태를 변경하는 리듀서 함수들을 정의합니다.

## slice 적용

---

이제 기존에 작성한 리듀서와 액션을 slice로 작성해 봅시다.

### `/reducer/index.js`

기존

```tsx
// /reducer/index.js

import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
});

export default rootReducer;
```

변경 **( 이때 slice자체를 넣는게 아니라 slice안의 리듀서를 넣어주어야 합니다. )**

```tsx
// /reducer/index.js

import { combineReducers } from "redux";
import userSlice from "./user";
import postSlice from "./post";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  posts: postSlice.reducer,
});

export default rootReducer;
```

### `/reducer/post.js`

기존

```tsx
// /reducer/post.js

import { produce } from "immer";

const initialState = {
  posts: [],
};

const postReducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case "ADD_POST":
        draft.push(action.data);
        break;
      default:
        return prevState;
    }
  });
};

export default postReducer;
```

변경

```tsx
import { produce } from "immer";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // 동기 액션(내부 액션)
  },
  extraReducers: {
    // 비동기 액션(외부 액션)
  },
});

export default postSlice;
```

### `/reducer/user.js`

기존

```tsx
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from "../actions/user";
import { produce } from "immer";

const initialState = {
  data: null,
  isLogInLoad: false,
};

const userReducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.data = null;
        draft.isLogInLoad = true;
        break;
      case LOG_IN_SUCCESS:
        draft.data = action.data;
        draft.isLogInLoad = true;
        break;
      case LOG_IN_FAILURE:
        draft.data = null;
        draft.isLogInLoad = false;
        break;
      case "LOG_IN":
        draft.data = action.data;
        break;
      case "LOG_OUT":
        draft.data = null;
        draft.isLogInLoad = false;
        break;
      default:
        return prevState;
    }
  });
};

export default userReducer;
```

변경

```tsx
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from "../actions/user";
import { produce } from "immer";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isLogInLoad: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
  },
  extraReducers: {},
});

export default userSlice;
```

## reducer와 extraReducer

---

reducer는 동기적이거나 내부 액션만 정의 extraReducer는 비동기적이거나 외부 액션만 정의합니다.

```tsx
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 동기 액션(내부 액션)
  },
  extraReducers: {
    // 비동기 액션(외부 액션)
  },
});
```

만약 logout을 구현한다고 생각하면 단순히 state.data를 null로 만들어 처리를 하기 때문에 동기적인 내부액션이기 때문에 reducer에 작성해 줍니다.

```tsx
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
  },
  extraReducers: {},
});
```

## slice 사용

---

slice를 사용하기 위해서는 userSlice에서 actions를 꺼내서 사용합니다.

```tsx
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../actions/post";
import { logIn } from "../actions/user";
import { useCallback } from "react";
import userSlice from "../reducer/user";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const onClick = useCallback(() => {
    dispatch(logIn({ id: "eyo", password: "1234", admin: true }));
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(userSlice.actions.logOut());
  }, []);

  console.log(user);

  return (
    <>
      <div>
        {user.isLogInLoad ? (
          user.data ? (
            <div>{user.data.nickname}</div>
          ) : (
            "로그인중"
          )
        ) : (
          "로그인 해주세요"
        )}
      </div>
      {user.data ? (
        <button onClick={logOut}>logout</button>
      ) : (
        <button onClick={onClick}>login</button>
      )}
      <button
        onClick={() =>
          dispatch(addPost({ userId: 1, id: 1, content: "하이 헬로우" }))
        }
      >
        addpost
      </button>
    </>
  );
}
```

## 비동기 action정의

---

기존에는 action에 비동기, 동기 action을 모두 보관하고 있었습니다.

하지만 우리는 이제 동기적인 action의 경우 slice에서 정의하고 있습니다.

따라서 기존의 action폴더에는 이제 비동기 액션(네트워크 요청, setTimeout…)과같은 액션만을 위한 공간으로 만들어서 작성해 주겠습니다.

## **createAsyncThunk**

---

### 개념

**`createAsyncThunk`**는 리덕스 툴킷에서 제공하는 유틸리티 함수로, 비동기 작업을 처리하는 액션 크리에이터 함수를 간편하게 생성할 수 있도록 도와줍니다. **`createAsyncThunk`**를 사용하면 API 호출, 데이터 가져오기, 비동기 작업 등을 포함하는 비동기 액션을 보다 쉽게 작성할 수 있습니다.

```tsx
import { createAsyncThunk } from "@reduxjs/toolkit";
```

### 구조

**`createAsyncThunk`** 함수는 다음과 같은 구조로 사용됩니다:

```tsx
const logIn = createAsyncThunk("user/logIn", async (arg, thunkAPI) => {
  // 비동기 코드 작성
  // pending(로딩), fufilled(성공), rejected(에러) 로 용어 표기
	// async 함수라서 반드시 data를 리턴해야됩니다. (액션 페이로드 설정)
});
```

### 사용법

```tsx
const logIn = createAsyncThunk("data/fetch", async (data, thunkAPI) => {
  // 비동기 코드 작성
  // pending, fufilled, rejected thun 에서 로딩 성공 에러표기
	// async 함수라서 반드시 data를 리턴해야됩니다. (액션 페이로드 설정)
});
```

### 파라미터

**`createAsyncThunk`** 함수의 첫 번째 인자는 액션 타입 접두사(prefix)를 나타내는 문자열입니다. 접두사는 액션 타입의 일부로 사용되어 액션의 유형을 식별합니다.

- prefix:
    
    액션 타입 접두사(prefix)는 위에서 createAsyncThunk의 첫번자 파라미터인 `"data/fetch"` 에 해당하는 부분입니다. 이는 생성되는 액션의 타입을 식별하기 위한 문자열입니다. 주로 접두사를 사용하여 액션의 도메인이나 기능을 지정합니다.
    
    예를 들어, 위 예제에서 액션 타입 접두사는 "data/fetch"로 설정되었습니다. 따라서 **`createAsyncThunk`**를 사용하여 생성되는 액션들의 타입은 "data/fetch/pending", "data/fetch/fulfilled", "data/fetch/rejected"와 같은 형태를 가지게 됩니다.
    
    이것은 리듀서에서 사용할때 logIn.pending, logIn.fulfilled, logIn.rejected로 사용 합니다.
    

- data**:**
액션 크리에이터 함수 호출 시 전달된 인자입니다. 이 인자를 사용하여 비동기 작업을 수행할 때 추가적인 정보를 전달할 수 있습니다. 예를 들어, 로그인을 한다고 하면 아이디와 비밀번호를 data를 통해 받아온다고 볼 수 있습니다.

- **thunkAPI :** 
thunkAPI.getState같은 것으로 리듀서의 state를 가져오거나 thunkAPI.dispatch를 통해 비동기 작업 중에 dispatch 함수로 다른 액션을 디스패치하는 등 필요한 데이터를 전달하고 액션을 디스패치하거나 상태를 참조할 수 있습니다. 이를 통해 비동기 작업과 관련된 액션들을 자동으로 처리하고 상태를 업데이트할 수 있습니다.

## 사용 예제

---

우리는 delay라는 비동기 처리를 통해 로그인 요청을 임의로 만들고 createAsyncThunk로 사용해 보겠습니다. (단순히 setTimeout으로 time뒤에 value를 뱉는 비동기 함수입니다.)

```tsx
const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

```

이제 로그인에서 delay를 사용하여 비동기로 data를 딜레이 후 리턴해 줍니다.

```tsx
// /actions/user.js

import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  console.log(data);
  const result = await delay(500, {
    userId: 1,
    nickname: "eyo25",
  });
  return result;
});
```

하지만 위의 logIn에서 발생하는 비동기 실패나 성공을 어디에서 처리하느냐는 생각이 들 수 있는데 이것은 userSlice의 extraReducers에서 처리를 해줍니다.

위에서 만든 logIn 액션을 불러와서 pending(대기), fulfilled(이행), rejected(거절)로 처리를 해줍니다.

이때 action에서 받아온 result는 action.payload로 받아올 수 있습니다.

```tsx
// /reducer/user.js

import {
	...,
	logIn
} from "../actions/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isLogInLoad: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state, action) {
      state.data = null;
    },
  },
  extraReducers: {
    [logIn.pending](state, action) {
      // user/logIn/pending
      state.isLogInLoad = true;
    },
    [logIn.fulfilled](state, action) {
      // user/logIn/fulfilled
      state.data = action.payload;
      state.isLogInLoad = false;
    },
    [logIn.rejected](state, action) {
      // user/logIn/rejected
      state.data = null;
      state.isLogInLoad = false;
    },
  },
});

export default userSlice;
```

> [logIn.pending](state, action) {} 부분에서 두번째 파라미터인 action은 action.js에서 만들었던 logIn의 prefix, 즉 user/logIn입니다. 따라서 [logIn.pending] 는 user/logIn/pending 과 같습니다.
> 

## immer

---

또한 기존의 immer를 통해 draft로 불변성을 지키던 부분들을 **`createSlice`** 함수로 생성된 슬라이스(reducer)에서 **`reducers`** 객체 내에 정의된 리듀서 함수들은 Immer에 의해 감싸져서 동작합니다. 따라서 해당 리듀서 함수 내에서 상태를 직접적으로 수정하는 것처럼 작성해도, Immer가 내부적으로 불변성을 유지하면서 상태를 변경해줍니다.

따라서 아래와 같이 배열에 객체를 그대로 넣어 주면 됩니다.

```tsx
import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../actions/post";

const initialState = {
  data: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPosts(state, action) {
      state.data = [];
    },
  },
  extraReducers: {
    [addPost.pending](state, action) {},
    [addPost.fulfilled](state, action) {
      state.data.push(action.payload);
    },
    [addPost.rejected](state, action) {},
  },
});

export default postSlice;
```

## builder

---

아래와 같이 extraReducers를 통해 비동기를 처리할때 builder를 통해 작성할 수 있습니다.

보통 타입스크립트로 사용할때 위와같이 메서드로 사용하게 되면 타입 추론이 잘 일어 나지않기도 하고 .addMacter 나 .addDefaultCase를 사용하기 때문에 더 추천됩니다.

```tsx
import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../actions/post";

const initialState = {
  data: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPosts(state, action) {
      state.data = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addPost.pending, (state, action) => {})
      .addCase(addPost.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {}),
});

export default postSlice;
```

보통 로딩과 같은 경우 공통적으로 로딩 스피너가 돌아 가는 식으로 처리해야될 때가 있습니다. 이때

addMatcher를 통한 공통적인 케이스 처리를 할 수 있습니다.

아래과 같이 작성하면 되는데 첫번째 파라미터가 true가 리턴되면 뒤의 부분이 실행이 됩니다.

```tsx
.addMatcher(
        (state, action) => {
          return action.type.includes("/pending");
        },
        (state, action) => {
          state.isLoding = true;
        }
)
```

## 최적화

---

현재 우리는 useSelector로 user객체 전체를 불러 오고 있다.

이경우 생기는 문제점은 user가 바뀔때마다 아래의 Home 컴포넌트는 재렌더링 된다는 점이다.

이것은 후에 redux를 사용해 전역으로 많은 컴포넌트를 연결했을때 모두 재렌더링 될 수 있다는 잠재적인 위험성을 갖고 있습니다.

```tsx
// /home.js

export default function Home() {
  const user = useSelector((state) => state.user);
	...
}
```

그렇다면 어떻게 해결해 줄 수 있을까?

방법은 객체 형태가 아닌 하나의 원시자료를 가지고 오는 것이다.

이렇게 하면 isLoading, id, password 가 변경될때만 재렌더링되는 것을 확실히 할 수 있습니다.

```tsx
// /home.js

export default function Home() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const id = useSelector((state) => state.user.id);
  const password = useSelector((state) => state.user.password);
	...
}
```

하지만 보통의 경우 한번에 모든 정보를 불러오고 수정한다면 기존 처럼 사용하거나 객체 분해 할당을 생각해 볼 수 있습니다.

```tsx
// /home.js

export default function Home() {
  const user = useSelector((state) => state.user);
	...
}
```

```tsx
// /home.js

export default function Home() {
  const { id, isLoading, password } = useSelector((state) => state.user);
	...
}
```