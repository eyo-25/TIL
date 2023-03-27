# Your First Component

컴포넌트는 React의 핵심 개념 중 하나입니다. 이는 사용자 인터페이스(UI)를 구축하는 기반이며, 이는 React 여정을 시작하기에 완벽한 장소가 됩니다!

## **Components: UI building blocks**

웹에서 HTML을 사용하면 `<h1>` 와 `<li>`같은 기본 제공 태그 집합을 사용하여 풍부한 구조화된 문서를 만들 수 있습니다.

```jsx
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

이 마크업은 이 기사 `<article>`, 제목 `<h1>`및 목차`<ol>`를 정렬된 목록으로 나타냅니다.

스타일을 위한 CSS 및 상호 작용을 위한 JavaScript와 결합된 이와 같은 마크업은 웹에서 볼 수 있는 모든 사이드바, 아바타, 모달, 드롭다운 등의 모든 UI 뒤에 존재합니다.

React를 사용하면 마크업, CSS 및 JavaScript를 **사용자 지정 “component"로 결합하여 앱을 위한 재사용 가능한 UI를 만들 수 있습니다.** 위에서 본 목차 코드는 모든 페이지에서 렌더링할 수 있는 component인 `<TableOfContents />`로 바뀔 수 있습니다. 내부적으로는 여전히 `<article>`, `<h1>`등과 같은 동일한 HTML 태그를 사용합니다.

HTML 태그와 마찬가지로 component를 구성, 정렬 및 중첩하여 전체 페이지를 디자인할 수 있습니다. 예를 들어 읽고 있는 문서 페이지는 React component로 구성되어 있습니다.

```jsx
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

프로젝트가 성장함에 따라 이미 작성한 component를 재사용하여 많은 디자인을 구성하여 개발 속도를 높일 수 있음을 알게 될 것입니다. 위의 목차는 `<TableOfContents />`을 사용하여 모든 화면에 추가할 수 있습니다.

## ****Defining a component****

전통적으로 웹 페이지를 만들 때 웹 개발자는 콘텐츠를 표시한 다음 일부 JavaScript를 뿌려 상호 작용을 추가했습니다. 이것은 상호 작용이 웹에서 있으면 좋은 것일 때 훌륭하게 작동했었고 현재는 많은 앱들이 사용하고 있습니다.

React는 여전히 동일한 기술을 사용하면서 상호 작용을 우선시합니다. **React 구성 요소는 마크업을 뿌릴 수 있는 JavaScript 기능입니다 .**

```jsx
export default function Profile() {
  return (
	   <img
				src="https://i.imgur.com/MK3eW3As.jpg"
				alt="Katherine Johnson"
			/>
  )
}
```

**구성 요소를 빌드하는 방법은 다음과 같습니다.**

****1단계: 구성 요소 내보내기****

접두사 는 표준 JavaScript 구문인 `export default` 입니다 (React에만 국한되지 않음) 이것은 나중에 다른 파일에서 가져올 수 있도록 파일의 기본 기능을 표시할 수 있습니다.

****2단계: 함수 정의****

이름 으로 `Profile` 과 함께  `function Profile() { }`JavaScript 함수를 정의합니다.

> **주의** : React component는 일반 JavaScript 함수이지만 **해당 이름은 대문자로 시작해야 합니다** . 그렇지 않으면 작동하지 않습니다!
> 

****3단계: 마크업 추가****

component는  `src`와 `alt` 속성이 있는 `<img />` 태그를 반환합니다 . HTML처럼 작성되었지만 실제로는 JavaScript입니다! 이 구문을 **JSX** 라고 하며 JavaScript 내부에 마크업을 삽입할 수 있습니다.

다음 component에서와 같이 반환 문을 모두 한 줄에 작성할 수 있습니다.

```jsx
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

그러나 마크업이 모두 키워드와 같은 줄에 있지 않으면 `return`에 한 쌍의 괄호로 묶어야 합니다.

```jsx
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

> **주의** : 괄호와 함께 없으면 return 뒤의 line들은 모두 무시됩니다.
> 

## ****Using a component****

이제 `Profile` component를 정의했으므로 다른 구성 요소 안에 중첩할 수 있습니다. 예를 들어 여러 `Profile` components를 구성요소로 사용하는 `Gallery` component를  내보낼 수 있습니다.

```jsx
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

## ****What the browser sees****

대소문자의 차이점을 확인하세요.

- <section>은 소문자이므로 React는 우리가 HTML 태그를 참조한다는 것을 알고 있습니다.
- <Profile />은 `P` 라는 대문자로 시작하므로, React는 우리가 `Profile`라는 component를 사용하고 싶다는 것을 알고 있습니다.

그리고 `Profile`은 더 많은 HTML을 포함합니다. 결국 브라우저에 표시되는 내용은 다음과 같습니다.

```jsx
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

## ****Nesting and organizing components****

component는 일반 JavaScript 함수이므로 동일한 파일에 여러 component를 보관할 수 있습니다. 이는 component가 상대적으로 작거나 서로 밀접하게 관련되어 있을 때 편리합니다.

`Profile` 파일이 복잡해지면 언제든지 별도의 파일로 이동할 수 있습니다. import에 대한 페이지에서 곧 이 작업을 수행하는 방법을 배우게 됩니다 [.](https://react.dev/learn/importing-and-exporting-components)

`Profile` component가 `Gallery` 내부에서 렌더링 되기때문에(심지어 여러번!) 각 component를 ”자식”으로 렌더링하는 `Gallery`는 부모 component 라고 말할 수 있습니다. 이것은 React의 마법의 일부입니다. component 를 한 번 정의한 다음 원하는 만큼 여러 위치에서 사용할 수 있습니다.

> **주의 :** component는 다른 구성 요소를 렌더링할 수 있지만 **해당 정의를 중첩해서는 안 됩니다.**
> 

```jsx
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

위의 스니펫은 매우 느리고 버그를 일으킵니다. [](https://react.dev/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state)대신 최상위 수준에서 모든 구성 요소를 정의합니다.

```jsx
export default function Gallery() {
  // ...
}

// ✅ Declare components at the top level
function Profile() {
  // ...
}
```

하위 component가 상위component의 일부 데이터를 필요로 하는 경우 중첩 정의 대신 props으로 전달합니다 .

## ****Components all the way down****

React 애플리케이션은 “root" component에서 시작합니다. “root"는 일반적으로 새 프로젝트를 시작할 때 자동으로 생성됩니다. 예를들어 CodeSandbox 또는 Create React App 을 사용하는 경우 루트 component는 `src/App.js` 에 저장되고 Next.js 프레임워크를 사용하는 경우“root" component는 `pages/index.js` 에 정의됩니다.

대부분의 **React 앱은 component를 끝까지 사용합니다**. 즉, 버튼과 같은 재사용 가능한 부분에 component를 사용할 뿐만 아니라 사이드바, 목록 및 궁극적으로 전체 페이지와 같은 더 큰 부분에도 component를 사용하게 됩니다! component는 일부가 한 번만 사용되는 경우에도 UI 코드 및 마크업을 구성하는 편리한 방법입니다.

React 기반 프레임워크는 이를 한 단계 더 발전시킵니다. **빈 HTML 파일을 사용하고 React가 JavaScript로 페이지를 관리**하도록 하는 대신 React component에서 자동으로 HTML을 생성합니다. 이렇게 하면 JavaScript 코드가 로드되기 전에 앱에서 일부 콘텐츠를 표시할 수 있습니다.

## 요약

1. **React를 사용하면 앱에 대한 재사용 가능한 UI 요소인** component를 만들 수 있습니다 .
2. React 앱에서 UI의 모든 부분은 component입니다.
3. React component는 다음을 제외하고 일반 JavaScript 함수입니다.
    - 이름은 항상 대문자로 시작합니다.
    - JSX 마크업을 반환합니다.