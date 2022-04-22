import checkLocalStorage from "./checkLocalStorage";

const saveLocalTodos = (todo) => {
	const todos = checkLocalStorage();

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
};

export default saveLocalTodos;
