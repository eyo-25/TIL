const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [boxSize, ...rest] = input;
const [M, N, H] = boxSize.split(" ").map(Number);
const map = rest.map((el) => el.split(" ").map(Number));

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

// [floor,[x,y],time]
const queue = new Queue();
const storage = {};
let cnt = 0;

// storage 설정
for (let i = 0; i < H; i++) {
  storage[i] = [];
  for (let j = 0; j < N; j++) {
    storage[i].push(map.shift());
  }
}

// 완탐하며 등록
for (let h = 0; h < H; h++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (storage[h][i][j] === 1) {
        queue.enqueue([h, [j, i], 0]);
      }
    }
  }
}

while (!queue.isEmpty()) {
  const dequeue = queue.dequeue();
  if (cnt < dequeue[2]) {
    cnt = dequeue[2];
  }
  BFS(dequeue);
}

function BFS([floor, [x, y], time]) {
  // [f,x,y]
  const offset = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, -1, 0],
    [0, 0, -1],
  ];

  offset.forEach((el) => {
    const nf = floor + el[0];
    const nx = x + el[1];
    const ny = y + el[2];
    if (
      0 <= nf &&
      0 <= nx &&
      0 <= ny &&
      nf < H &&
      nx < M &&
      ny < N &&
      storage[nf][ny][nx] === 0
    ) {
      storage[nf][ny][nx] = 1;
      queue.enqueue([nf, [nx, ny], time + 1]);
    }
  });
}

solution();
function solution() {
  // 0 탐색
  for (let h = 0; h < H; h++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (storage[h][i][j] === 0) {
          return console.log(-1);
        }
      }
    }
  }
  return console.log(cnt);
}
