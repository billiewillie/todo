import { query } from "./query";

const todoList = query(".taskList");

const filterTodo = (e) => {
	const todos = Array.from(todoList.children);
	todos.forEach((el) => {
		switch (e.target.value) {
			case "all":
				el.style.display = "flex";
				break;
			case "completed":
				if (query("input", el).checked) {
					el.style.display = "flex";
				} else {
					el.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!query("input", el).checked) {
					el.style.display = "flex";
				} else {
					el.style.display = "none";
				}
				break;
		}
	});
};

export default filterTodo;
