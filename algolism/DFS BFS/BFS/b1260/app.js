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
const graph = Array.from({ length: N }, () => []);
map.forEach(([start, end]) => {
  graph[start - 1].push(end - 1);
  graph[end - 1].push(start - 1);
});
graph.forEach((el) => el.sort((a, b) => a - b));

const visitedDFS = Array.from({ length: N }, () => 0);
const visitedBFS = Array.from({ length: N }, () => 0);
const answerDFS = [];
const answerBFS = [];
let cnt = 1;

DFS(R - 1);
function DFS(node) {
  if (!visitedDFS[node]) {
    visitedDFS[node] = cnt;
    answerDFS.push(node + 1);
    // cnt++;
    graph[node].forEach((next) => {
      if (visitedDFS[next] === 0) {
        DFS(next);
      }
    });
  }
}

BFS();
function BFS() {
  const queue = new Queue();
  queue.enqueue(R - 1);
  while (!queue.isEmpty()) {
    const dequeue = queue.dequeue();
    // 탐색하지 않은 노드면 방문
    if (visitedBFS[dequeue] === 0) {
      visitedBFS[dequeue] = cnt;
      answerBFS.push(dequeue + 1);
      // cnt++;
      graph[dequeue].forEach((next) => {
        if (visitedBFS[next] === 0) {
          queue.enqueue(next);
        }
      });
    }
  }
}

console.log(answerDFS.join(" "));
console.log(answerBFS.join(" "));
