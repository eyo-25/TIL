const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [goal, ...rest] = input;
const [N, M, R] = goal.split(" ").map(Number);
const map = rest.map((el) => el.trim().split(" ").map(Number));

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

// process
const visited = new Array(N).fill(0);
const queue = new Queue();
let cnt = 1;
const graph = Array.from(new Array(N), () => []);
map.forEach(([start, end]) => {
  graph[start - 1].push(end - 1);
  graph[end - 1].push(start - 1);
});
graph.forEach((el) => el.sort((a, b) => b - a));

queue.enqueue(R - 1);
while (!queue.isEmpty()) {
  const node = queue.dequeue();
  if (visited[node] === 0) {
    visited[node] = cnt;
    cnt++;
    graph[node].forEach((el) => {
      if (visited[el] === 0) {
        queue.enqueue(el);
      }
    });
  }
}

// output
console.log(visited.join("\n"));
