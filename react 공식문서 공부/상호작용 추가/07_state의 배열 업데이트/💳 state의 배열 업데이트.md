# 💳 state의 배열 업데이트

배열은 JavaScript에서 변경 가능하지만 state에 저장할 때는 변경 불가능한 것으로 취급해야 합니다. 객체와 마찬가지로 state에 저장된 배열을 업데이트하려면 새 배열을 만들고(또는 기존 배열의 복사본을 만든 다음) 새 배열을 사용하도록 state를 setting해야 합니다.

<aside>
📒 **여기서 배우는 것**

- React state에서 배열의 항목을 추가, 제거 또는 변경하는 방법
- 배열 내부의 객체를 업데이트하는 방법
- Immer로 배열 복사를 덜 반복적으로 만드는 방법
</aside>

## ****변형 없이 배열 업데이트****

---

JavaScript에서 배열은 또 다른 종류의 객체입니다. 객체와 마찬가지로 React state의 배열을 읽기전용으로 취급해야 합니다. 즉, `arr[0] = “bird”`와 같이 배열 내부에 항목을 재할당 해서는 안되며`push()`와 `pop()` 같이 배열을 변경하는 메서드도 사용해서는 안됩니다.

대신 배열을 업데이트할 때마다 새 배열을 state setter 함수에 전달해야 합니다. 이를 위해 `filter()`및 `map()` 과 같이 원본을 변경하지 않는 메서드를 호출하여 state의 원래배열을 복사하여 새배열을 만들 수 있습니다. 그런 다음 state를 복사한 새 배열로 저장할 수 있습니다.

다음은 일반적인 배열 작업의 참조 테이블입니다. React state 내부의 배열을 다룰 때 왼쪽 열의 메서드를 피하고 대신 오른쪽 열의 메서드를 선호해야 합니다.

| 행동 | 방지(배열을 변경) | 선호 (새 배열 반환) |
| --- | --- | --- |
| 첨가 | push,unshift | concat, [...arr] 스프레드 구문 |
| 풀이 | pop, shift,splice | filter, slice |
| 교체 | splice, arr[i] = 교체할것 | map |
| 정렬 | reverse,sort | 어레이 복사 후 정렬 |

또는 두 열의 메서드를 모두 사용할 수 있는 Immer를 사용할 수 있습니다.

<aside>
⚠️ **함정 : 불행하게도 `slice`와 `splice`이름은 비슷하지만 매우 다릅니다.**

- `slice`는 배열 또는 그 일부를 복사할 수 있습니다.
- `splice`는 항목을 삽입하거나 삭제하기 위해 배열을 **변경합니다.**

React에서는 state에서 객체나 배열을 변경하고 싶지 않기 때문에 훨씬 더 자주 `slice`사용 하게 될 것입니다. [객체 업데이트](https://www.notion.so/state-c617ecc695a943898e9030806b056fd4)에서는 변이(mutation)가 무엇이며 상태에 권장되지 않는 이유를 설명합니다.

</aside>

## ****배열에 추가****

---

`push()`는 원하지 않는 배열을 변형시킵니다.

```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        artists.push({
          id: nextId++,
          name: name,
        });
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

`push()` 대신 기존 항목을 넣고 끝에 새로운 항목을 포함하는 새 배열을 만듭니다. 이를 수행하는 방법에는 여러 가지가 있지만 가장 쉬운 방법은 `…` 배열 스프레드 문법을 사용하는 것입니다.

```jsx
setArtists( // state 대체
  [ // 새로운 배열을 만든다.
    ...artists, // 그것은 모든 이전의 artists를 포함한다.
    { id: nextId++, name: name } // 그리고 새로운 아이템을 끝에 넣는다.
  ]
);
```

이제 올바르게 작동하는 코드입니다.

```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

배열 스프레드 구문을 사용하면 항목을 원본 앞에`...artists` 배치하여 앞에 추가할 수도 있습니다.

```jsx
setArtists([
  { id: nextId++, name: name },
  ...artists // 이전 아이템들을 끝에 놓을 수 있습니다.
]);
```

> 이런 식으로 spread는 배열의 끝에 추가하여 새로운 아이템을 `unshift()` 할 수 있고 배열의 앞에 추가하여 새로운 아이템을 `push()` 할 수 있습니다.
> 

## 배열에서 제거

---

배열에서 항목을 제거하는 가장 쉬운 방법은 항목을 필터링하는 것입니다. 즉, 해당 항목을 포함하지 않는 새 배열을 생성합니다. 이렇게 하려면 다음과 같은 `filter` 방법을 사용하십시오.

```jsx
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

여기서 `artists.filter(a => a.id !== artist.id)`는 " ID가 다른 것들로 구성된 배열을 만든다 "는 의미입니다. 버튼을 누른 즉시 아티스트의 “삭제”버튼은 해당 아티스트를 배열에서 필터링한다음 리턴된 배열로 다시 렌더링하도록 요청합니다. `filter` 는 기존 배열을 수정하지 않습니다.

## ****배열 변환****

---

배열의 일부 또는 전체 항목을 변경하려는 경우 `map()`을 통해 새 배열을 만드는 데 사용할 수 있습니다. 전달할 `map` 함수는 데이터 또는 인덱스(또는 둘 다)를 기반으로 각 항목에 대해 수행할 작업을 결정할 수 있습니다.

이 예에서 배열은 두 개의 원과 정사각형의 좌표를 보유합니다. 버튼을 누르면 원만 50픽셀 아래로 이동합니다. `map()` 을 사용하여 새로운 데이터 배열을 생성하여 이를 수행합니다

```jsx
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // 네모는 변화없음
        return shape;
      } else {
        // 기존 y좌표에서 50px 내려간 새로운 원을 리턴한다.
        return {
          ...shape,
          y: shape.y + 50, // 기존 y좌표에서 50을 증가시킨다.
        };
      }
    });
    // Re-render with the new array
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        Move circles down!
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}
```

## ****배열의 항목 바꾸기****

---

배열에서 하나 이상의 항목을 대체하려는 경우가 특히 일반적입니다. `arr[0] = 'bird’` 와 같은 할당은 원래 배열을 변경하므로 대신 이를 위해 `map` 을 사용하는 것이 좋습니다.

항목을 바꾸려면 `map`으로 새 배열을 만듭니다. `map`호출 내에서 인덱스를 두 번째 인수로 받습니다. 이를 사용하여 원래 항목(첫 번째 인수)을 반환할지 다른 항목을 반환할지 여부를 결정합니다.

```jsx
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // 클릭한 인덱스에 해당하는 카운터만 증가 시킨다.
        return c + 1;
      } else {
        // 나머지는 변경하지 않는다.
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
```

![123.JPG](%F0%9F%92%B3%20state%E1%84%8B%E1%85%B4%20%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%20b3edfaecdef24569a428d1f9bf2cc597/123.jpg)

## ****배열에 삽입****

---

때로는 경우에 따라 시작도 끝도 아닌 특정 위치에 항목을 삽입해야 할 수 있습니다. 이렇게 하려면 메서드 `slice()`와 함께 `…`배열 스프레드 문법을 사용할 수 있습니다.

이 `slice()`메서드를 사용하면 배열의 "조각"을 잘라낼 수 있습니다. 항목을 삽입하려면 **삽입 지점 앞의 슬라이스, 새 항목, 원래 배열의 나머지 부분을 펼치는 배열**을 만듭니다.

이 예에서 삽입 버튼을 눌렀을때 항상 `index 1`에 삽입됩니다.

새로운 배열 = [ (0~insertAt까지 slice) (삽입할 요소) (insertAt~ 끝까지 slice) ]

```jsx
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // 삽입할 인덱스를 정한다.
    const nextArtists = [
      // 삽입할 포인터 전에 있을 아이템들 (0~insertAt까지 slice)
      ...artists.slice(0, insertAt),
      // 새로운 아이템
      { id: nextId++, name: name },
      // 삽입할 포인터 후에 있을 아이템들 (insertAt~ 끝까지)
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

![466.JPG](%F0%9F%92%B3%20state%E1%84%8B%E1%85%B4%20%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%20b3edfaecdef24569a428d1f9bf2cc597/466.jpg)

insertAt으로 설정한 인덱스 1에 계속해서 추가되는 것을 볼 수 있다.

## 배열****에 대한 기타 변경****

---

스프레드 구문 및 비변형 메서드 `map()`과 `filter()`  단독 으로 수행할 수 없는 작업이 있습니다. 예를 들어 배열을 뒤집거나 정렬할 수 있습니다. JavaScript에 `reverse()`및 `sort()` 메서드는 원래배열을 직접 변경하므로 직접 사용할 수 없습니다.

**그러나 array를 먼저 복사한 다음 변경할 수 있습니다.**

예를 들어 :

```jsx
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
```

여기서 먼저 `[...list]` 스프레드 구문을 사용하여 원본 배열의 복사본을 만듭니다. 이제 복사본이 있으므로 `nextList.reverse()` 또는 `nextList.sort()` 를 사용하여 `nextList[0] = "something”`처럼 개별 항목을 할당 할 수 도 있습니다.

그러나 **배열을 복사하더라도 배열 내부 의 기존 항목을 직접 변형할 수는 없습니다.** 이는 복사가 얕기 때문입니다. 새 배열에는 원래 배열과 동일한 항목이 포함됩니다. 따라서 복사된 배열 내부의 개체를 수정하면 기존 상태가 변경됩니다. 예를 들어, 이와 같은 코드는 문제입니다.

```jsx
const nextList = [...list];
nextList[0].seen = true; // Problem: mutates list[0]
setList(nextList);
```

nextList와 list는 두개의 다른 배열이지만, **`nextList[0]`과 `list[0]` 는 같은 객체를 가르키고 있습니다.** 따라서 `nextList[0].seen`이 변화하기 때문에, `list[0].seen` 또한 변화하고 있는 것 입니다. 이것은 피해야 하는 state 돌연변이(mutation)입니다! 중첩된 JavaSctipt 객체를 업데이트하는 것과 유사한 방식으로 이 문제를 해결할 수 있습니다. 방법은 다음과 같습니다.

## ****배열 내부의 객체 업데이트****

---

객체는 실제로 배열“내부”에 있지 않습니다. 코드에서 “내부”에 있는 것처럼 보일 수 있지만 배열의 각 객체는 배열이 “가리키는” 별도의 값(주소)입니다. 이것이 `list[0]`와 같은 중첩 필드를 변경할 때 주의해야하는 이유입니다. 다른 사람의 작품 목록은 배열의 동일한 요소를 가리킬 수 있습니다!

**중첩된 state를 업데이트할 때 업데이트하려는 지점부터 최상위 수준까지 복사본을 만들어야 합니다.** 이것이 어떻게 작동하는지 봅시다.

아래 예에서 두개의 개별 아트웍 목록은 동일한 초기 state를 가집니다. 이들은 격리되어야 하지만 돌연변이로 인해 state가 실수로 공유되고 한 목록의 확인란을 선택하면 다른 목록에 영향을 미칩니다.

```jsx
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

![캡처.JPG](%F0%9F%92%B3%20state%E1%84%8B%E1%85%B4%20%E1%84%87%E1%85%A2%E1%84%8B%E1%85%A7%E1%86%AF%20%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3%20b3edfaecdef24569a428d1f9bf2cc597/%25EC%25BA%25A1%25EC%25B2%2598.jpg)

My list와 Your list 둘중한곳의 체크박스를 눌러도 동시에 체크되는 것을 볼 수 있다.

문제는 다음과 같은 코드에 있습니다.

```jsx
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // Problem: mutates an existing item
setMyList(myNextList);
```

`myNextList` 배열 자체는 새 것이지만 `myList`안의 항목은 원본 배열과 동일합니다. 따라서 `artwork.seen`을 변경하면 원본 아트워크 항목이 변경됩니다. 해당 아트워크항목은 `yourList`에도 있기 때문에 버그를 일으킵니다. 이와같은 버그는 생각하기 어려울 수 있지만 고맙게도 상태 변경을 피하면 사라집니다.

**`map`변형 없이 이전 항목을 업데이트된 버전으로 대체하는 데 사용할 수 있습니다 .**

```jsx
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // 변경 사항이 있는 *새* 객체 만들기(새 객체의 주소 재할당)
    return { ...artwork, seen: nextSeen };
  } else {
    // No changes
    return artwork;
  }
}));
```

다음은 객체의 복사본을 만드는데 사용되는객체 스프레드 문법입니다 .

이 접근 방식을 사용하면 기존 state 항목이 변경되지 않고 이전의 버그가 수정됩니다.

```jsx
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // 변경 사항이 있는 *새* 객체 만들기(새 객체의 주소 재할당)
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        // 변경 사항이 있는 *새* 객체 만들기(새 객체의 주소 재할당)
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

> 일반적으로는 **방금 만든 객체만 변경해야 합니다.** 새 아트웍을 삽입하는 중이라면 변경할 수 있지만 이미 상태에 있는 것을 다루는 경우에는 복사본을 만들어야 합니다.
> 

## ****Immer로 간결한 업데이트 로직 작성****

---

객체와 마찬가지로 변형 없이 중첩 배열을 업데이트하면 약간 반복될 수 있습니다.

- 일반적으로 몇 수준 이상 상태를 업데이트할 필요가 없습니다. state 객체가 매우 깊은 경우 평면이 되도록 다르게 재구성 할 수 있습니다.
- state 구조를 변경하고 싶지 않다면 Immer를 사용하는 것이 좋습니다. Immer 를 사용 하면 편리하지만 변경 가능한 구문을 사용하여 작성할 수 있고 사본 생성을 처리할 수 있습니다.

Immer로 재작성한 Art Bucket List 예시는 다음과 같습니다.

```jsx
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

	//artwork.id, e.target.checked
  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

Immer를 사용하면 **다음과 같은 돌연변이 `artwork.seen = nextSeen`가 이제 괜찮습니다.**

```jsx
updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
```

*이는 원래* 상태를 변경하는 것이 아니라 Immer에서 제공하는 특수한 `draft`객체를 변경하기 때문입니다. 마찬가지로 `push()`및`pop()`와 같은 변형 방법을 `draft`의 내용에 적용할 수 있습니다.

이렇게 하면 상태를 변경하지 않고도 이벤트 핸들러를 매우 간결하게 유지할 수 있습니다.

## 요약

---

- 배열을 state에 넣을 수는 있지만 변경할 수는 없습니다.
- 배열을 변경하는 대신 배열의 새로운 버전을 만들고 state를 업데이트합니다.
- `[...arr, newItem]`배열 스프레드 구문을 사용하여 기존배열에서 새 항목을 추가한 배열을 만들 수 있습니다.
- `filter()`및 `map()` 을 사용하여 필터링 되거나 변환된 항목으로 새 배열을 만들 수 있습니다.
- Immer를 사용하여 코드를 간결하게 유지할 수 있습니다.