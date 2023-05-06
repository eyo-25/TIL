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
const E = Array.from(new Array(N), () => []);
map.forEach(([u, v]) => {
  E[u - 1].push(v - 1);
  E[v - 1].push(u - 1);
});
E.forEach((nextNodes) => {
  nextNodes.sort((a, b) => a - b);
});

const visited = new Array(N).fill(0);
const q = new Queue();
q.enqueue(R - 1);
let visitOrder = 1;

while (!q.isEmpty()) {
  const cur = q.dequeue();

  if (!visited[cur]) {
    visited[cur] = visitOrder;
    visitOrder += 1;

    E[cur].forEach((next) => {
      if (!visited[next]) q.enqueue(next);
    });
  }
}

// output
console.log(visited.join("\n"));
