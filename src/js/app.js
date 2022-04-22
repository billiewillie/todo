import { query, queryId } from "./utils/query";
import addTodo from "./utils/addTodo";
import deleteTodo from "./utils/deleteTodo";
import filterTodo from "./utils/filterTodo";
import getTodos from "./utils/getTodos";
import renderElement from "./utils/renderElement";
import editLocalStorage from "./utils/editLocalStorage";

import NiceSelect from "nice-select2/dist/js/nice-select2";
import MicroModal from "micromodal";

// localStorage.clear();

const todoInput = queryId("newTask");
const todoButton = queryId("newTaskBtn");
const todoList = query(".taskList");
const todoFilter = query(".filter-todo");
const dropdown = query(".dropdown");

new NiceSelect(todoFilter, { searchable: false });

document.addEventListener("DOMContentLoaded", () => {
	dropdown.style.opacity = 1;

	MicroModal.init({
		awaitCloseAnimation: true,
	});

	const todos = getTodos();
	todos.forEach(({ id, value, completed }) => {
		const element = renderElement(id, value, completed);
		todoList.insertAdjacentHTML("afterbegin", element);
	});

	fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			data.forEach(({ id, title, completed }) => {
				const element = renderElement(id, title, completed);
				todoList.insertAdjacentHTML("afterbegin", element);
			});
		})
		.catch((err) => {
			throw new Error(err);
		});
});

todoButton.addEventListener("click", (e) => {
	e.preventDefault();
	if (todoInput.value) {
		addTodo(todoInput.value);
		todoInput.value = "";
	}
});

todoList.addEventListener("click", (e) => {
	deleteTodo(e), editLocalStorage(e);
});

todoFilter.addEventListener("change", filterTodo);
