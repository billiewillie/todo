import { query } from "./query";
const todoList = query(".taskList");
import getRandomInt from "./getRandomInt";
import saveLocalTodos from "./saveLocalTodos";
import renderElement from "./renderElement";

const addTodo = (value) => {
	const id = getRandomInt(999);
	const element = renderElement(id, value);
	saveLocalTodos({ id, value: value.trim(), completed: false });
	todoList.insertAdjacentHTML("beforeend", element);
};

export default addTodo;
