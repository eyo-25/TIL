# Writing Markup with JSX

*JSX* 는 JavaScript 파일 내에서 HTML과 유사한 마크업을 작성할 수 있는 JavaScript용 구문 확장입니다. component를 작성하는 다른 방법이 있지만 대부분의 React 개발자는 JSX의 간결함을 선호하며 대부분의 코드베이스에서 이를 사용합니다.

## ****JSX: Putting markup into JavaScript****

웹은 HTML, CSS 및 JavaScript를 기반으로 구축되었습니다. 수년 동안 웹 개발자는 콘텐츠를 HTML로, 디자인을 CSS로, 로직을 JavaScript로, 종종 별도의 파일에 보관했습니다! 콘텐츠는 HTML 내에서 마크업되었지만 페이지의 로직은 JavaScript에서 별도로 존재했습니다.

![writing_jsx_js.webp](Writing%20Markup%20with%20JSX%20c0e04e7799dd45da9e8dda691124b5af/writing_jsx_js.webp)

![writing_jsx_html.webp](Writing%20Markup%20with%20JSX%20c0e04e7799dd45da9e8dda691124b5af/writing_jsx_html.webp)

그러나 웹이 점점 더 상호 작용하게 되면서 logic이 점점 더 콘텐츠를 결정했습니다. JavaScript가 HTML을 담당했습니다! 이것이 **React에서 렌더링 논리와 마크업이 같은 위치, 즉 구성 요소에 함께 존재하는 이유입니다.**

![writing_jsx_sidebar.webp](Writing%20Markup%20with%20JSX%20c0e04e7799dd45da9e8dda691124b5af/writing_jsx_sidebar.webp)

![writing_jsx_sidebar.webp](Writing%20Markup%20with%20JSX%20c0e04e7799dd45da9e8dda691124b5af/writing_jsx_sidebar%201.webp)

버튼의 렌더링 논리와 마크업을 함께 유지하면 편집할 때마다 서로 동기화가 유지됩니다. 반대로 버튼의 마크업과 사이드바의 마크업과 같이 관련되지 않은 세부 정보는 서로 격리되어 있어 둘 중 하나를 스스로 변경하는 것이 더 안전합니다.

각 React component는 React가 브라우저에 렌더링하는 일부 마크업을 포함할 수 있는 JavaScript 함수입니다. React component는 JSX라는 구문 확장을 사용하여 해당 마크업을 나타냅니다. **JSX는 HTML과 많이 비슷해 보이지만 조금 더 엄격하고 동적 정보를 표시할 수 있습니다**. 이를 이해하는 가장 좋은 방법은 일부 HTML 마크업을 JSX 마크업으로 변환하는 것입니다.

> JSX와 React는 별개의 두 가지입니다. 함께 사용되는 경우가 많지만 서로 독립적으로 사용할 수 있습니다 .  **JSX는 구문 확장이고 React는 JavaScript 라이브러리**입니다.
> 

## ****Converting HTML to JSX****

(완전히 유효한) HTML이 있다고 가정합니다.

```jsx
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```

그리고 당신은 그것을 당신의 component에 넣고 싶습니다.

```jsx
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve the spectrum technology
    </ul>
  );
}
```

그러나 위처럼 return문에 HTML을 그대로 붙여 넣게 되면 작동하지 않습니다. JSX가 HTML보다 더 엄격하고 규칙이 몇 가지 더 많기 때문입니다! 오류 메시지를 읽으면 마크업을 수정하도록 안내하거나 아래 안내를 따를 수 있습니다.

## ****JSX의 규칙****

****단일 루트 요소 반환****

component에서 여러요소를 반환하려면 **단일 상위 태그로 요소를 래핑**합니다.

예를 들어 <div>를 래핑요소로 사용할 수 있습니다

```jsx
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```

마크업에 엑스트라`<div>`를 추가하고 싶지 않다면 대신 다음 `<></>`과 같이 작성할 수 있습니다.

```jsx
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

이 빈 태그를 Fragment라고 합니다 *[.](https://react.dev/reference/react/Fragment)* 프래그먼트를 사용하면 브라우저 HTML 트리에 흔적을 남기지 않고 항목을 그룹화할 수 있습니다.

****여러 JSX 태그를 래핑해야 하는 이유는 무엇입니까?****

JSX는 HTML처럼 보이지만 내부적으로는 일반 JavaScript 객체로 변환됩니다. 배열로 래핑하지 않고는 함수에서 두 객체를 반환할 수 없습니다. 이는 두 개의 JSX 태그를 다른 태그나 Fragment로 래핑하지 않고 반환할 수 없는 이유를 설명합니다.

## ****Close all the tags****

JSX에서는 태그가 명시적으로 닫혀야 합니다.  `<img>`와 같은 자동 닫힘 태그는  `<img />` 같이 명시적으로 닫겨야 하고 `<li>oranges`와 같은 래핑 태그는 `<li>oranges</li>`로 작성되어야 합니다.

다음은 Hedy Lamarr의 이미지와 목록 항목이 닫힌 모습입니다.

```jsx
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

## ****camelCase all most of the things!****

JSX는 JavaScript로 바뀌고 JSX로 작성된 속성은 JavaScript 객체의 키가 됩니다. 자신의 구성 요소에서 이러한 속성을 변수로 읽어들이고 싶을 때가 많습니다. 그러나 JavaScript에는 변수 이름에 대한 제한이 있습니다. 예를 들어 **이름에 대시를 포함하거나 `class`와 같은 예약어를 사용할 수 없습니다.**

이것이 React에서 많은 HTML 및 SVG 속성이 camelCase로 작성되는 이유입니다. 예를들어 `class` 는 예약어 이므로 React에서는 해당 DOM 속성의`className` 이름을 따서 대신 작성합니다 .

```jsx
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

DOM 구성 요소 소품 목록에서 이러한 모든 속성을 찾을 수 있습니다 . 하나라도 틀려도 걱정하지 마세요. React는 브라우저 콘솔에 수정 가능한 메시지를 출력합니다.

아래는 최종 변환 결과입니다.

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

## ****요약****

이제 JSX가 존재하는 이유와 구성 요소에서 JSX를 사용하는 방법을 알았습니다.

- React component는 서로 관련되어 있기 때문에 마크업과 함께 렌더링 논리를 그룹화합니다.
- JSX는 HTML과 유사하지만 몇 가지 차이점이 있습니다.
- 오류 메시지는 종종 마크업을 수정하는 올바른 방향을 알려줍니다.