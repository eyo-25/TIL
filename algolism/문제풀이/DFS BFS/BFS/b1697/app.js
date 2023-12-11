const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

class Node {
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

  isEmpty() {
    return this.size === 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  dequeue() {
    if (this.head === null) return null;
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    if (this.head === null) {
      this.tail = null;
    }
    return value;
  }

  peek() {
    return this.head.value;
  }
}

const visited = new Array(100001).fill(0);
const queue = new Queue();
let cnt = 0;
let leng = 0;

visited[N];
queue.enqueue(N);
while (!queue.isEmpty()) {
  leng = queue.size;
  for (let i = 0; i < leng; i++) {
    const dequeue = queue.dequeue();
    if (dequeue === K) {
      console.log(cnt);
      break;
    }
    BFS(dequeue);
  }
  cnt++;
}

function BFS(x) {
  const arr = [x - 1, x + 1, x * 2];
  arr.forEach((el) => {
    if (0 <= el && el <= 100000 && visited[el] === 0) {
      visited[el] = 1;
      queue.enqueue(el);
    }
  });
}
