import checkLocalStorage from "./checkLocalStorage";

const removeLocalTodos = (id) => {
	const todos = checkLocalStorage();
	const newTodos = todos.filter((item) => item.id !== id);
	localStorage.setItem("todos", JSON.stringify(newTodos));
};

export default removeLocalTodos;
