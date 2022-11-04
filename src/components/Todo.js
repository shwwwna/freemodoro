import { Check, Clear } from "@mui/icons-material";
import React from "react";

const Todo = ({ text, todo, todos, setTodos }) => {
	const deleteHandler = () => {
		setTodos(todos.filter((el) => el.id !== todo.id));
	};
	const completeHandler = () => {
		setTodos(
			todos.map((el) => {
				if (el.id === todo.id) {
					return {
						...el,
						completed: !el.completed,
					};
				}
				return el;
			})
		);
	};

	return (
		<>
			<div className="todo">
				<li className={`todo-item ${todo.completed ? "completed" : ""}`}>
					{text}
				</li>
				<button className="complete-btn" onClick={completeHandler}>
					<Check />
				</button>
				<button className="trash-btn" onClick={deleteHandler}>
					<Clear />
				</button>
			</div>
		</>
	);
};

export default Todo;
