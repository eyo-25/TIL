const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const [n, ...rest] = input;
const commands = rest.map((el) => el.trim());

// 노드 클래스 정의
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(newValue) {
    const newNode = new ListNode(newValue);
    if (!this.head) {
      // head가 없을때는 새로추가된 노드를 head와 tail로 지정해준다.
      this.head = newNode;
      this.tail = newNode;
    } else {
      // head가 있을때는 새로추가된 노드를 head와 tail로 지정해준다.
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // 큐의 크기 반환
  getSize() {
    return this.size;
  }

  // 큐에서 아이템 삭제
  dequeue() {
    if (!this.head) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    if (!this.head) {
      this.tail = null;
    }
    return value;
  }

  // 큐가 비어있는지 확인
  isEmpty() {
    return this.size === 0 ? 1 : 0;
  }

  front() {
    return this.head ? this.head.value : -1;
  }

  back() {
    return this.tail ? this.tail.value : -1;
  }
}

function solution(n, commands) {
  const queue = new Queue();
  const calculate = {
    push(x) {
      queue.enqueue(x);
    },
    pop() {
      const shift = queue.dequeue();
      return shift ? shift : -1;
    },
    size() {
      return queue.getSize();
    },
    empty() {
      return queue.isEmpty();
    },
    front() {
      return queue.front();
    },
    back() {
      return queue.back();
    },
  };

  const answer = commands.reduce((acc, cu) => {
    if (calculate[cu]) {
      return acc + "\n" + `${calculate[cu]()}`;
    } else {
      calculate["push"](cu.split(" ")[1]);
      return acc;
    }
  }, "");

  // console.log(answer.trim());
  return answer.trim();
}

solution(n, commands);
