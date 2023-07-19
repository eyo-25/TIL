# 지도 api

어플리케이션 등록 / 도메인 등록은 [공유하기](https://www.notion.so/5d929989dff54c0d89f21a450798f9eb?pvs=21) 문서를 참고해 주세요.

## **라이브러리 불러오기**

---

Kakao 지도 API를 불러오기 위해서는 두가지 방법을 사용할 수 있습니다.

첫번째로는 html에서 script 코드를 사용해서 동기적으로 불러오는 것입니다.

```tsx
// index.html

<script
	type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=앱키&autoload=false&libraries=services"
></script>
```

두번째로는 **비동기적이고 동적으로** useEffect를 사용하여 필요한 시점에 다운받는 것 입니다.

이같은 방식의 장점은 [공유하기](https://www.notion.so/5d929989dff54c0d89f21a450798f9eb?pvs=21) 문서를 참고할 수 있으며 보다 리액트스러운 방식입니다.

```tsx
useEffect(() => {
  const script = document.createElement('script');
  script.src =
    '//dapi.kakao.com/v2/maps/sdk.js?appkey=앱키&autoload=false&libraries=services';
  script.async = true;
  document.body.appendChild(script);

	...

  return () => {
    document.body.removeChild(script);
  };
}, []);
```

## 로드

---

- **script.onload**

**`script.onload`**는 JavaScript에서 **`<script>`** 태그로 외부 스크립트 파일을 동적이고 비동기적으로 로드한 후, 해당 스크립트 파일이 로드되었을 때 실행되는 이벤트 핸들러입니다.

따라서 외부 스크립트 파일의 로드가 완료되었을 때 실행되는 콜백 함수를 정의 해줍니다.

- **window.kakao.maps.load**

[https://apis.map.kakao.com/web/documentation/#load_load](https://apis.map.kakao.com/web/documentation/#load_load)

<aside>
📒 **공식문서에서 발췌**

v3 스크립트를 동적으로 로드하기위해 사용한다.

스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에

로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.

비동기 통신으로 페이지에 v3를 동적으로 삽입할 경우에 주로 사용된다.

v3 로딩 스크립트 주소에 파라미터로 `autoload=false`를 지정해 주어야 한다.

</aside>

```tsx
useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=앱키&autoload=false&libraries=services';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
				...
        setIsLoad(true);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
}, []);
```

## 지도,마커 초기값 생성하기

---

[https://apis.map.kakao.com/web/documentation/#Map](https://apis.map.kakao.com/web/documentation/#Map)

[https://apis.map.kakao.com/web/documentation/#MarkerClusterer](https://apis.map.kakao.com/web/documentation/#MarkerClusterer)

위에서 우리는 v3가 모두 로드된 후, 콜백함수를 통해 코드를 사용할 수 있습니다.

이제 `**kakao.maps.Map**` , `**kakao.maps.Marker**`를 통해 지도와 마커를 생성하고 useState에 저장합니다.

( 이후에 계속해서 변경할것이기 때문이며 초기값의 경우 이때 설정해서 기본 위치를 잡아 줄 수 있지만 현재 프로젝트의 경우 특별한 시작점이 없으므로 sample의 위치로 잡아줍니다. )

```tsx
useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=앱키&autoload=false&libraries=services';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
				const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

				setMap(new window.kakao.maps.Map(container, options));
        setMarker(new window.kakao.maps.Marker());
        setIsLoad(true);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
}, [map, marker]);
```

또한 `setIsLoad(true);` 를 설정해주어 초기값을 설정하기전에 다른 기능을 사용할 수 없도록 제어합니다.

## 클릭이벤트 등록하기

---

[https://apis.map.kakao.com/web/sample/addMarkerClickEvent/](https://apis.map.kakao.com/web/sample/addMarkerClickEvent/)

map이 존재하는 경우 useEffect를 통해 **`kakao.maps.event.addListener`** 으로 map이 변경되었을때 최신 map의 상태에 맞는 클릭이벤트를 등록해 줍니다.

```tsx
useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
	    }
}, [map, marker]);
```

콜백함수의 mouseEvent에는 [LatLng](https://apis.map.kakao.com/web/documentation/#LatLng) 라는 객체를 생성할 수 있습니다.

이 객체는 getLat()과 getLng()를 통해 위도 경도를 받아 아래에서 위도경도 기반으로 정보를 요청합니다.

## 클릭한 위치에 마커 표시하기

---

[https://apis.map.kakao.com/web/documentation/#services_Geocoder](https://apis.map.kakao.com/web/documentation/#services_Geocoder)

**kakao.maps.services.Geocoder() : 주소-좌표간 변환 서비스 객체를 생성**

```tsx
const geocoder = new window.kakao.maps.services.Geocoder();
```

**coord2Address(x, y, callback, options)  : 좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청**

- 공식 문서 예시
    
    ```tsx
    var geocoder = new kakao.maps.services.Geocoder();
    
    var coord = new kakao.maps.LatLng(37.56496830314491, 126.93990862062978);
    var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
        }
    };
    
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    ```
    

(도로명 주소는 없을 수 있기 때문에 삼항연산자를 사용하여 도로명 주소를 사용하고 없다면 구 주소를 이용하도록 합니다.) 

```tsx
 geocoder.coord2Address(
          mouseEvent.latLng.getLng(),
          mouseEvent.latLng.getLat(),
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const addr = result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;

              setAdress(addr);
              marker.setMap(map);
              marker.setPosition(mouseEvent.latLng);
            }
          }
);
```

이후에 marker에서 제공하는 메서드인 **setMap()를 통해 맵에 마커를 올리고 setPosition()를 통해 마커의 좌표를 지정해 줍니다.**

[https://apis.map.kakao.com/web/documentation/#Marker](https://apis.map.kakao.com/web/documentation/#Marker)

```tsx
window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(
          mouseEvent.latLng.getLng(),
          mouseEvent.latLng.getLat(),
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const addr = result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;

              setAdress(addr);
              marker.setMap(map);
              marker.setPosition(mouseEvent.latLng);
            }
          }
        );
});
```

## 이미지 마커 표시하기

---

[https://apis.map.kakao.com/web/sample/markerWithCustomOverlay/](https://apis.map.kakao.com/web/sample/markerWithCustomOverlay/)

imageSrc와 imageSize를 통해 new kakao.maps.MarkerImage()의 인자로 넣어 생성하고 마커를 생성할때 image 속성에 넣어줍니다.

```tsx
useEffect(() => {
    script.onload = () => {
				...

        const imageSrc = '/src/assets/icons/marker_icon.png';
        const imageSize = new kakao.maps.Size(34, 45);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        setMap(new window.kakao.maps.Map(container, options));
        setMarker(new window.kakao.maps.Marker({ position: map, image: markerImage }));
        setIsLoad(true);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
}, [isLoad]);
```

## **마커에 인포윈도우 표시하기**

---

[https://apis.map.kakao.com/web/sample/markerWithInfoWindow/](https://apis.map.kakao.com/web/sample/markerWithInfoWindow/)

## 주소검색

---

[https://postcode.map.daum.net/guide#usage](https://postcode.map.daum.net/guide#usage)

daum.Postcode의 생성자로 생성하고 우편번호 검색 결과 목록에서 특정 항목을 클릭한 경우, 해당 정보를 받아서 처리할 콜백 함수를 정의하는 부분입니다. (null일때는 oncomplete 작동 x)

[https://postcode.map.daum.net/guide#sample](https://postcode.map.daum.net/guide#sample)

```tsx
new daum.Postcode({
    oncomplete: function(data) {
        //data는 사용자가 선택한 주소 정보를 담고 있는 객체이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
    }
});
```

kakao.maps.services.Geocoder()로 주소-좌표간 변환 서비스 객체를 생성하고 받아온 data.address(주소)를 addressSearch를 통해 검색합니다.

[https://apis.map.kakao.com/web/documentation/#services_Geocoder_addressSearch](https://apis.map.kakao.com/web/documentation/#services_Geocoder_addressSearch)

- 예시
    
    ```tsx
    var geocoder = new kakao.maps.services.Geocoder();
    
    var callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            console.log(result);
        }
    };
    
    geocoder.addressSearch('해남군 송지면', callback);
    ```
    

```tsx
geocoder.addressSearch(data.address, 콜백)

new daum.Postcode({
    oncomplete: function(data) {
          geocoder.addressSearch(
            data.address,
            function (
              result: kakao.maps.services.GeocoderResult[],
              status: kakao.maps.services.Status
            ) {
              if (status === window.kakao.maps.services.Status.OK) {
                const searchPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                map.panTo(searchPosition);
                setAdress(data.address);
                marker.setPosition(searchPosition);
                marker.setMap(map);
              }
            }
          );
        },
    }
});
```

이후 콜백에서는 결과와 상태를 받아 상태가 ok라면 x,y 값을 받아 WGS84 좌표 정보를 가지고 있는 객체를 생성합니다.

[https://apis.map.kakao.com/web/documentation/#LatLng](https://apis.map.kakao.com/web/documentation/#LatLng)

```tsx
 const searchPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
```

이 지점으로 panTo()를 이용하여 중심좌표를 부드럽게 연결 합니다.

[https://apis.map.kakao.com/web/documentation/#Map_panTo](https://apis.map.kakao.com/web/documentation/#Map_panTo)

```tsx
map.panTo(searchPosition);
```

또한 마커와 주소를 검색한 주소로 설정해줍니다.

```tsx
marker.setPosition(searchPosition);
marker.setMap(map);
```

전체코드

```tsx
const onInputClickHandler = () => {
    if (map && marker) {
      new window.daum.Postcode({
        oncomplete: function (data: postData) {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.addressSearch(
            data.address,
            function (
              result: kakao.maps.services.GeocoderResult[],
              status: kakao.maps.services.Status
            ) {
              if (status === window.kakao.maps.services.Status.OK) {
                const currentPos = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                map.panTo(currentPos);
                setAdress(data.address);
                marker.setPosition(currentPos);
                marker.setMap(map);
              }
            }
          );
        },
      }).open();
    }
  };
```

## 타입정의

---

현재 컴파일 시점에서 window에서 kakao와 daum을 인식할 수 없으므로 타입을 정의 해주어야한다.

```tsx
declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}
```

****kakao.maps.d.ts를 설치하여 기본적인 타입을 설정해 줍니다.****

[https://www.npmjs.com/package/kakao.maps.d.ts](https://www.npmjs.com/package/kakao.maps.d.ts)

다만 kakao.maps.services의 GeocoderResult는 정의 되어있지 않으므로 kakao.maps.services의 네임스페이스에 GeocoderResult를 정의해줍니다.

```tsx
declare namespace kakao.maps.services {
  export interface GeocoderResult {
    road_address?: {
      address_name: string;
    };
    address?: {
      address_name: string;
    };
    x: number;
    y: number;
  }
}
```