const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, ...rest] = input;
const [X, Y] = N.split(" ").map(Number);
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

const queue = new Queue();
let answer = 0;

// 처음에 1인 녀석들을 모두 서칭해서 queue에 넣고 작업
for (let i = 0; i < Y; i++) {
  for (let j = 0; j < X; j++) {
    if (map[i][j] === 1) {
      queue.enqueue([[j, i], 0]);
    }
  }
}

while (!queue.isEmpty()) {
  const dequeue = queue.dequeue();
  if (answer < dequeue[1]) {
    answer = dequeue[1];
  }
  BFS(dequeue);
}

function BFS([[x, y], time]) {
  const offset = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  offset.forEach((el) => {
    const nx = x + el[0];
    const ny = y + el[1];
    if (0 <= nx && 0 <= ny && nx < X && ny < Y && map[ny][nx] === 0) {
      map[ny][nx] = 1;
      queue.enqueue([[nx, ny], time + 1]);
    }
  });
}

solution();
function solution() {
  // 0 탐색
  for (let i = 0; i < Y; i++) {
    for (let j = 0; j < X; j++) {
      if (map[i][j] === 0) {
        return console.log(-1);
      }
    }
  }
  return console.log(answer);
}
