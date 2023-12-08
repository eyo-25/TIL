# useLayoutEffect

## 문제인식

---

기존에 chatLogData를 useEffect의 의존성 배열에 설정하여 인피니티 스크롤로 다음 페이지가 호출되었을 경우 이전의 스크롤까지 내려주도록 설정하였습니다.

```jsx
// components/chat/ChatLog.tsx

function ChatLog({ chatLogData, data, fetchNextPage }: props) {
	...

  const contentsRender = (formattedContents: FormattedContents) => {
    return Object.keys(formattedContents).map((date) => (
      <li key={date} className="flex flex-col mx-4 first:mt-7">
        <h3 className="mb-4 text-xs text-center text-gray-700">{date}</h3>
        <ul className="flex flex-col-reverse">
          {formattedContents[date].map(({ question, answer, time }, index) => (
            <li key={index} className="w-full mb-[17px]">
							...
            </li>
          ))}
        </ul>
      </li>
    ));
  };

  useEffect(() => {
    if (prevPageRef.current !== data.pages.length) {
      scrollbarRef.current?.scrollTop(
        scrollbarRef.current?.getScrollHeight() - prevScrollRef.current
      );
    } else {
      scrollbarRef.current?.scrollToBottom();
    }
    prevPageRef.current = data.pages.length;
  }, [chatLogData]);

	...

	return (
		<>
			{contentsRender(chatLogData).reverse()}
		</>
	)
}
```

따라서 다음 페이지가 호출되어 현재 컴포넌트에서 props로 받아오는 chatLogData가 변경되게 되어 재렌더링이 일어나게 되고 useEffect 의존성 배열에 설정된 chatLogData의 변화를 감지하고 스크롤을 설정하게 됩니다.

이렇게 되면 빠르게 스크롤이 설정되면 괜찮지만 그렇지 않은 경우 렌더링이 된 후 스크롤이 설정되면서 약간의 흔들림이나 깜빡임이 발생하게 됩니다.

## useLayoutEffect

---

위와같은 일이 일어나는 이유는 useEffect의 경우 렌더링이 끝난후 비동기적으로 동작하기 때문입니다. 이를 해결하기 위해 저는 useLayoutEffect를 사용하였습니다.

useLayoutEffect은 렌더링 후 화면에 그려지기 전에 동기적으로 동작하며 주로 레이아웃과 같은 계산을 할때 사용합니다. 위 문제 역시 렌더링전에 스크롤값을 설정하는 로직이므로 적절히 활용합니다.

```jsx
// components/chat/ChatLog.tsx

useLayoutEffect(() => {
  if (prevPageRef.current !== data.pages.length) {
    scrollbarRef.current?.scrollTop(
      scrollbarRef.current?.getScrollHeight() - prevScrollRef.current
    );
  } else {
    scrollbarRef.current?.scrollToBottom();
  }
  prevPageRef.current = data.pages.length;
}, [chatLogData]);
```

## 요약

---

재렌더링이 발생할 때의 과정은 다음과 같습니다:

1. **Props변경**: 컴포넌트에 전달된 props인 chatLogData가 변경되면, React는 해당 컴포넌트를 재렌더링합니다.
2. **Render함수 실행**: React는 새로운 가상 DOM을 생성하고, chatLogData를 기반으로 컴포넌트의 `**contentsRender**` 함수를 실행하여 새로운 UI를 생성합니다.
3. **DOM 업데이트**: 새로 생성된 UI는 가상 DOM과 현재 DOM을 비교하여 변경된 부분을 실제 DOM에 업데이트합니다.
4. **Effects 실행**: 이후에는 다음과 같은 라이프사이클 메서드 또는 훅들이 실행됩니다:
   - **useEffect**: 컴포넌트가 렌더링된 후에 비동기적으로 실행됩니다. 이는 렌더링과 무관하게 동작합니다.
   - **useLayoutEffect**: **`useEffect`**와 비슷하지만, 동기적으로 실행되며, 렌더링 이후, 컴포넌트가 실제로 화면에 그려지기 전에 실행됩니다.

따라서, **`useLayoutEffect`**는 **`useEffect`**와 비슷하지만, 실행 시점이 다릅니다. **`useLayoutEffect`**는 렌더링 직전에 동기적으로 실행되어 DOM 업데이트 이전에 발생합니다. 이로 인해 렌더링 이후의 깜빡임과 같은 UI 깜빡임 문제를 해결하였습니다.
