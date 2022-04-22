import removeLocalTodos from "./removeLocalTodos";

const deleteTodo = (e) => {
	const item = e.target;
	if (item.closest(".taskElement-close")) {
		const todo = item.closest(".taskElement");
		const todoId = Number(todo.getAttribute("id"));
		todo.classList.add("fall");
		todo.addEventListener("transitionend", () => {
			todo.remove();
			removeLocalTodos(todoId);
		});
	}
};

export default deleteTodo;
