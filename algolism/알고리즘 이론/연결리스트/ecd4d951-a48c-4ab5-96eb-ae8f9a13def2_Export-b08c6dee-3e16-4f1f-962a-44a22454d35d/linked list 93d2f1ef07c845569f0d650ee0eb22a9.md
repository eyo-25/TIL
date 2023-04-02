# linked list

## **연결 리스트의 개념**

---

연결리스트(linked list)는 자료를 담고 있는 선형(linear) 자료구조 중 하나입니다. 이 자료구조는 순서가 있는 데이터 요소들을 메모리 상에서 연속적인 위치에 저장하는 배열과 달리, **연결리스트는 포인터(pointer)를 사용하여 데이터 요소들이 서로 연결된 형태로 저장**됩니다.

![xccxc.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/xccxc.jpg)

## **연결 리스트의 특징**

---

연결리스트는 **배열과 달리 삽입과 삭제가 용이하며, 데이터 요소의 크기가 가변적일 때 특히 유용**합니다. 그러나 탐색에 필요한 시간이 배열보다 오래 걸리기 때문에 탐색이 빈번하게 일어나는 경우에는 비효율적입니다.

- 메모리가 허용하는한 요소를 제한없이 추가할 수 있다.
- 탐색은 O(n)이 소요된다.
- 요소를 추가하거나 제거할 때는 O(1)이 소요된다.
- 연결리스트는 단일 연결리스트, 이중 연결리스트, 환형 연결리스트 등의 종류가 있습니다.

## 배열과 연결리스트의 차이

---

### 메모리 차이

배열은 순차적으로 사용되기 때문에 메모리 영역을 연속적으로 사용합니다.

**1) 메모리 영역**

반면 연결리스트는 퍼져있는 메모리영역을 포인터를 사용해서 각영역을 참조합니다.

![z.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/z.jpg)

**2) 데이터 요소 삭제/추가**

**배열 요소 삭제**

배열의 요소를 삭제했을 경우 선형시간이 소요되게 됩니다. 그 이유는 삭제된 요소 공백을 메꾸기 위해서 뒷요소들을 앞으로 당겨야 하기 때문입니다.

**배열 요소 추가**

마찬가지로 요소를 추가하는 경우에도 마찬가지로 선형시간이 소요되며 그 이유는 요소를 추가하기 위해 뒷 요소를 한칸씩 뒤로 밀어야하기 때문입니다.

![dfd.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/dfd.jpg)

![선형.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25EC%2584%25A0%25ED%2598%2595.jpg)

**연결 리스트 요소 삭제**

1. 삭제할 요소를 선택한다.
2. 삭제할 요소를 가리키는 이전요소의 포인터를 삭제하고 삭제할 요소의 다음 요소를 가리킨다.
3. 그리고 나서 삭제할 요소를 완전히 삭제한다.

![삭제할 요소 선택.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25EC%2582%25AD%25EC%25A0%259C%25ED%2595%25A0_%25EC%259A%2594%25EC%2586%258C_%25EC%2584%25A0%25ED%2583%259D.jpg)

![ㅌㅊㅊ.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258C%25E3%2585%258A%25E3%2585%258A.jpg)

![ㅌㅊㅌ.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258C%25E3%2585%258A%25E3%2585%258C.jpg)

**연결 리스트 요소 추가**

1. 추가할 요소를 생성한다.
2. 추가할 요소의 포인터를 끼워놓을 요소의 다음요소를 가리키게 만듭니다.
3. 이후 끼워넣을 요소의 이전 요소의 포인터를 끼워넣을 요소를 가리키도록 수정합니다.

![1.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/1.jpg)

![ㅋㅋㅌㅊ.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258B%25E3%2585%258B%25E3%2585%258C%25E3%2585%258A.jpg)

![ㅊㅇ.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258A%25E3%2585%2587.jpg)

> 배열과는 다르게 연결리스트의 삭제와 추가는 수행하는데 [상수시간](https://www.notion.so/7fadd8045689425885798ccbee10d850)밖에 소요 되지 않는다.
> 

## Singly Linked List

---

### 개념

단일 연결 리스트는 Head에서 Tail까지 단방향으로 이어지는 연결 리스트입니다.

Head는 가장 첫번째 요소를 말하고 Tail은 가장 마지막 요소를 뜻합니다.

![ㅌㅊ.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258C%25E3%2585%258A.jpg)

### 요소 찾기

연결리스트에서 4를 찾는다면 연결리스트는 배열과는 달리 4를 찾을 때 Head부터 4라는 데이터를 만날때 까지 포인터를 따라서 차례되로 탐색하기 떄문에 선형시간 O(n)이 걸리게 된다.

![ㅌㅊ'.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258C%25E3%2585%258A%201.jpg)

### 요소 추가

연결리스트에서 3을 중간에 추가를 하게 된다고 하면, 추가되는 요소에 넣는곳의 전 요소의 포인터를 가르키게 하고 추가할 요소는 넣는 곳의 다음요소를 가리키게 되면 되는 간단한 로직이기에 상수시간만이 소요된다.

단, 상수시간은 추가하는 부분만 해당하고 만약 2나 4를 가진 곳을 알아내고 추가를 하게된다면 탐색로직이 실행되어 선형시간이 추가로 소요된다. 따라서 추가를 위한 탐색을 하지 않도록 주의해서 구현을 하여야한다.

![ㅊㅍㅎ.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258A%25E3%2585%258D%25E3%2585%258E.jpg)

### 요소 삭제

삭제할 요소의 전에 위치한 요소의 포인터를 삭제할 요소다음 요소의 위치로 옮기고 삭제할 요소를 삭제를 하면 되기에 상수시간만이 소요된다.

![ㅊ퍼.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258A%25ED%258D%25BC.jpg)

## Doubly Linked List

---

### 개념

양방향으로 이어지는 연결 리스트 Singly Linked List 보다 자료구조의 크기가 조금 더 크고 다음과 이전을 가리키는 두개의 포인터를 가지고 있다.

![ㅌㅊㅊ차.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/%25E3%2585%258C%25E3%2585%258A%25E3%2585%258A%25EC%25B0%25A8.jpg)

### 요소 추가

1. 추가할 요소의 next포인터를 추가위치의 다음 요소를 가리킨다.
2. 추가위치의 이전 요소의 다음 노드가 추가 요소를 가리키도록 수정한다.
3. 추가위치의 다음 요소의 이전 노드가 추가할 요소를 가리키도록 한다.
4. 추가할 요소의 이전 노드를 추가위치의 이전 요소를 가리키도록 한다.

![vbb.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/vbb.jpg)

> 단일 연결 리스트와 마찬가지로 상수시간만이 소요된다.
> 

### 요소 삭제

1. 삭제할 요소의 이전 요소의 다음노드가 삭제할 요소 다음 요소를 가리키도록 수정한다.
2. 삭제할 요소의 다음 요소의 이전노다가 삭제할 요소 이전 요소를 가리키도록 수정한다.
3. 삭제할 요소를 삭제하도록한다.

![cvd.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/cvd.jpg)

> 이중 연결 리스트의 추가와 마찬가지로 상수시간만이 소요된다.
> 

## Circular Linked List

---

단일 혹은 이중 연결 리스트와 동일하고 Tail이 Head로 연결되는 점만이 다른 연결 리스트이다. 특징으로는 환형을 띄고 있기 때문에 중간부터 탐색해도 전체를 탐색할 수 있고 메모리를 아껴 쓸 수 있다.  또한 원형 큐등을 만들때도 사용 됩니다.

![xcxcx.JPG](linked%20list%2093d2f1ef07c845569f0d650ee0eb22a9/xcxcx.jpg)

## 연결 리스트 구현

---

```jsx
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  find(value) {
    let currNode = this.head;
    while (currNode.value !== value) {
      currNode = currNode.next;
    }
    return currNode;
  }

  append(newValue) {
    const newNode = new Node(newValue);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  insert(node, newValue) {
    const newNode = new Node(newValue);
    newNode.next = node.next;
    node.next = newNode;
  }

  remove(value) {
    let prevNode = this.head;
    while (prevNode.next.value !== value) {
      prevNode = prevNode.next;
    }
    if (prevNode.next !== null) {
      prevNode.next = prevNode.next.next;
    }
  }
  display() {
    let currNode = this.head;
    let displayString = "[";

    while (currNode !== null) {
      displayString += `${currNode.value}, `;
      currNode = currNode.next;
    }
    displayString = displayString.substring(0, displayString.length - 2);
    displayString += "]";
    console.log(displayString);
  }
}
```