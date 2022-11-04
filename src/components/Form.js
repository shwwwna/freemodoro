import { Add } from "@mui/icons-material";
import React from "react";

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
	const inputTextHandler = (e) => {
		setInputText(e.target.value);
	};
	const submitTodoHandler = (e) => {
		e.preventDefault();
		setTodos([
			...todos,
			{
				text: inputText,
				completed: false,
				id: Math.random() * 1000,
			},
		]);
		setInputText("");
	};
	const statusHandler = (e) => {
		setStatus(e.target.value);
	};

	return (
		<>
			<form>
				<input
					value={inputText}
					onChange={inputTextHandler}
					type="text"
					className="todo-input"
				/>
				<button
					className="todo-button"
					type="submit"
					onClick={submitTodoHandler}>
					<Add />
				</button>
				<div className="select">
					<select onChange={statusHandler} name="todos" className="filter-todo">
						<option value="all">All</option>
						<option value="completed">Completed</option>
						<option value="uncompleted">Uncompleted</option>
					</select>
				</div>
			</form>
		</>
	);
};

export default Form;
