import React from "react";
import { useState, useEffect } from "react";
import Form from "../components/Form";
import TodoList from "../components/TodoList";

const Todo = () => {
	// STATES
	const [inputText, setInputText] = useState("");
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem("todos")) || []
	);
	const [status, setStatus] = useState("all");
	const [filteredTodos, setFilteredTodos] = useState([]);

	// USE EFFECT
	useEffect(() => {
		filterHandler();
		saveLocalTodos();
	}, [todos, status]);

	// FUNCTIONS
	const filterHandler = () => {
		switch (status) {
			case "completed":
				setFilteredTodos(todos.filter((todo) => todo.completed === true));
				break;
			case "uncompleted":
				setFilteredTodos(todos.filter((todo) => todo.completed === false));
				break;
			default:
				setFilteredTodos(todos);
				break;
		}
	};

	// SAVE TO LOCAL
	const saveLocalTodos = () => {
		localStorage.setItem("todos", JSON.stringify(todos));
	};

	return (
		<>
			<Form
				inputText={inputText}
				todos={todos}
				setTodos={setTodos}
				setInputText={setInputText}
				setStatus={setStatus}
			/>
			<TodoList
				todos={todos}
				setTodos={setTodos}
				filteredTodos={filteredTodos}
			/>
		</>
	);
};

export default Todo;
