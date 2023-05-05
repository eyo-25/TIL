const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, ...rest] = input;
const graph = rest.map((el) => el.trim().split("").map(Number));

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
const answer = [];

// 완전탐색
for (let i = 0; i < N; i++) {
  for (let j = 0; j < graph[i].length; j++) {
    // 탐색가능
    if (graph[i][j] === 1) {
      queue.enqueue([j, i]);
      answer.push(1);
      while (!queue.isEmpty()) {
        const [x, y] = queue.dequeue();
        graph[y][x] = 0;
        BFS(x, y);
      }
    }
  }
}

function BFS(x, y) {
  const distances = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  distances.forEach((next) => {
    const nx = x + next[0];
    const ny = y + next[1];
    if (0 <= nx && 0 <= ny && graph[ny] && graph[ny][nx] === 1) {
      graph[ny][nx] = 0;
      answer[answer.length - 1]++;
      queue.enqueue([nx, ny]);
    }
  });
}

console.log([answer.length, ...answer.sort((a, b) => a - b)].join("\n"));
