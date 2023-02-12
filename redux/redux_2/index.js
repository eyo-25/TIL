import { legacy_createStore } from "redux";

//html
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

//constance
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//action creater
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text: text,
    date: Date.now(),
  };
};

const deleteToDo = (id) => {
  return { type: DELETE_TODO, id: id };
};

//reducer
const reducer = (prevstate, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: action.date };
      return [newToDoObj, ...prevstate];
    case DELETE_TODO:
      //filter는 배열을 순회하며 주어진 함수를 만족(true)하는 모든 요소를 모아 새배열로 반환
      return prevstate.filter((toDo) => toDo.id !== action.id);
    default:
      return prevstate;
  }
};

const store = legacy_createStore(reducer, []);

// dispatch
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};
const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id); //del버튼 클릭한 버튼태그의 부모Node의 id값
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  console.log(toDos);
  ul.innerHTML = "";
  toDos.map((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    li.id = toDo.id;
    li.innerText = toDo.text;
    btn.addEventListener("click", dispatchDeleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  dispatchAddToDo(text);
};

form.addEventListener("submit", onSubmit);
