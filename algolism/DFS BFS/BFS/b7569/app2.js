const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [boxSize, ...rest] = input;
const [M, N, H] = boxSize.split(" ").map(Number);
const map = rest.map((el) => el.split(" ").map(Number));

class Node {
  constructor(z, x, y, count) {
    this.z = z;
    this.x = x;
    this.y = y;
    this.count = count;
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

  enqueue(z, x, y, count) {
    const newNode = new Node(z, x, y, count);
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
    const head = this.head;
    this.head = this.head.next;
    this.size--;
    if (this.head === null) {
      this.tail = null;
    }
    return head;
  }

  peek() {
    return this.head.value;
  }
}

// h, x, y, cnt
const queue = new Queue();
const storage = {};
let cnt = 0;
let tomato = 0;

// storage 설정
for (let i = 0; i < H; i++) {
  storage[i] = [];
  for (let j = 0; j < N; j++) {
    storage[i].push(map.shift());
  }
}

// 완탐하며 등록
for (let z = 0; z < H; z++) {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (storage[z][y][x] === 1) {
        queue.enqueue(z, x, y, 0);
      } else if (storage[z][y][x] === 0) {
        tomato++;
      }
    }
  }
}

while (!queue.isEmpty()) {
  const { z, x, y, count } = queue.dequeue();
  if (cnt < count) {
    cnt = count;
  }
  BFS(z, x, y, count);
}

function BFS(z, x, y, count) {
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
    const nz = z + el[0];
    const nx = x + el[1];
    const ny = y + el[2];
    if (storage[nz]?.[ny]?.[nx] === 0) {
      storage[nz][ny][nx] = 1;
      queue.enqueue(nz, nx, ny, count + 1);
      tomato--;
    }
  });
}

if (0 < tomato) {
  console.log(-1);
} else {
  console.log(cnt);
}
