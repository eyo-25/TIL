# 해시 테이블_베스트 앨범 실습 map활용

[https://school.programmers.co.kr/learn/courses/30/lessons/42587](https://school.programmers.co.kr/learn/courses/30/lessons/42587)

# **😀 해시 테이블을 map으로 구현한 코드**

---

```jsx
function solution(genres, plays) {
  const genreMap = new Map();

  genres
    .map((genre, index) => [genre, plays[index]])
    .forEach(([genre, play], index) => {
      const data = genreMap.get(genre) || { total: 0, songs: [] };
      genreMap.set(genre, {
        total: data.total + play,
        songs: [...data.songs, { play, index }]
          .sort((a, b) => b.play - a.play)
          .slice(0, 2),
      });
    });

  return [...genreMap.entries()]
    .sort((a, b) => b[1].total - a[1].total)
    .flatMap((item) => item[1].songs)
    .map((song) => song.index);
}
```

# 😎 **분석**

---

입력으로 `genres`와 `plays`가 아래와 같이 들어 왔을때를 기준으로 합니다.

```jsx
["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500]
```

0️⃣ 먼저 map객체를 생성한다.

```jsx
const genreMap = new Map();
```

1️⃣ `genres` 를 배열의 요소와 인덱스를 받아 배열로 매핑합니다.

```jsx
  genres
    .map((genre, index) => [genre, plays[index]])
```

매핑된 값입니다.

```jsx
[
  [ 'classic', 500 ],
  [ 'pop', 600 ],
  [ 'classic', 150 ],
  [ 'classic', 800 ],
  [ 'pop', 2500 ]
]
```

2️⃣ 매핑된 값을 다시 forEach로 순회합니다.

1) 매핑된 요소를 [genre, play]를 구조분해 할당으로 받아오고 index도 받아 옵니다.

```jsx
.forEach(([genre, play], index) => {
```

2) genreMap.get(genre)에 값이 없을 경우 data에 기본값 `{ total: 0, songs: [] }`을 넣어 주고

해당 장르에 값이 있을 경우 값을 가져와서 data에 할당해준다.

(장르에 해당하는 데이터를 불러오고 없으면 기본값으로 세팅한다.)

```jsx
const data = genreMap.get(genre) || { total: 0, songs: [] };
```

3) 다음으론 genreMap자료에 data값에 현재값을 더해 genreMap.set을 해준다.

현재 genre를 키로 설정하고

```jsx
genreMap.set(genre, {})
```

값으로는 data에 저장된 total에 현재앨범의 play를 누적하여 total에 저장하고

```jsx
total: data.total + play,
```

스프레드 문법으로 total의 요소와 현재 앨범의 정보(index와 play량)를 배열 songs에 저장합니다.

```jsx
songs: [...data.songs, { play, index }]
```

play량을 기준으로 정렬하고(객체 play값으로 sort) 2개까지 잘라냅니다.(play으로 두개까지만 가능) 

```jsx
.sort((a, b) => b.play - a.play)
.slice(0, 2),
```

매핑된 값입니다.

```jsx
Map(2) {
  'classic' => { total: 1450, songs: [ [Object], [Object] ] },
  'pop' => { total: 3100, songs: [ [Object], [Object] ] }     
}
```

각각 장르에 저장된 값 입니다.

```jsx
console.log(genreMap.get("classic"));

//print
{
  total: 1450,
  songs: [ { play: 800, index: 3 }, { play: 500, index: 0 } ]
}
```

```jsx
console.log(genreMap.get("pop"));

//print
{
  total: 3100,
  songs: [ { play: 2500, index: 4 }, { play: 600, index: 1 } ]
}
```

3️⃣ 저장된 map자료를 배열안에 나열하고 정렬후 인덱스만 매핑한다.

1) 먼저 Map 자료를 `.entries()` 메서드를 통해 [key, value]로 나열하고 스프레드 문법으로 배열안에 담아줍니다.

```jsx
[...genreMap.entries()]

// print
[
  [ 'classic', { total: 1450, songs: [Array] } ],
  [ 'pop', { total: 3100, songs: [Array] } ]
]
```

2) 위의 배열을 sort를 통해 배열의 1번째의 객체에 total을 기준으로 내림차순 정렬합니다.

```jsx
.sort((a, b) => b[1].total - a[1].total)

// print
[
	[ 'pop', { total: 3100, songs: [Array] } ]
  [ 'classic', { total: 1450, songs: [Array] } ],
]
```

3)이후에 배열의 1번째에 있는 객체의 index만 매핑해서 결과를 반환합니다.

```jsx
.map((song) => song.index);

// print
[ 4, 1, 3, 0 ]
```

# 🤔 **배울점**

---

해시테이블문제를 해결할때 Map을 이용하여 메서드들을 이용하여 쉽게 문제를 해결 할 수 있다는 점을 배웠습니다.

또한 해시 테이블안에 객체나 배열 데이터를 저장하고 이를 정렬하거나 정제하는 법도 배워서 자바스크립트에서 찾는데 상수시간을 가지는 강력한 객체를 이용한 해시테이블을 배울 수 있어 유익한문제 였습니다.