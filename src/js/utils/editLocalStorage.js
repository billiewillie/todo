import checkLocalStorage from "./checkLocalStorage";

const editLocalStorage = (e) => {
	const item = e.target;
	const itemId = Number(item.closest(".taskElement").getAttribute("id"));
	const todos = checkLocalStorage();

	if (item.className === "checkbox") {
		if (todos.some((item) => item.id === itemId)) {
			const editedTodo = todos.find((item) => item.id === itemId);
			editedTodo.completed = item.checked;
			localStorage.setItem("todos", JSON.stringify(todos));
		}
	}
};

export default editLocalStorage;
