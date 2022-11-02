import { GitHub, HighlightOff, PauseCircleOutline } from "@mui/icons-material";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Timers = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
`;

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.bg};
	transition: all 0.5s;
`;

const Icon = styled.button`
	cursor: pointer;
	background: none;
	border: none;
	font-size: large;
`;

const Display = styled.div`
	margin-bottom: 20px;
`;

const Text = styled.span`
	font-size: 36px;
`;

const Button = styled.button`
	font-size: 1.5rem;
	background-color: rgb(0, 0, 0);
	color: #fff;
	border-radius: 8px;
	width: 150px;
	border: 3px solid black;
	padding: 6px 12px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	transition: all 1ms;

	&:hover {
		background-color: transparent;
		color: black;
		border: 3px solid black;
	}
	&:active {
		background-color: white;
	}
`;

const ButtonContainer = styled.div``;

const Github = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	margin: 1rem;
	color: black;
`;

const App = () => {
	const [wtime, setWtime] = useState(0);
	const [wtimerOn, setWtimerOn] = useState(false);
	const [rtime, setRtime] = useState(0);
	const [rtimerOn, setRtimerOn] = useState(false);

	useEffect(() => {
		let title = rtimerOn ? format3(rtime) + " REST" : format3(wtime) + " WORK";

		document.title = title;
	}, [wtime, rtime]);

	useEffect(() => {
		let interval = null;

		if (wtimerOn) {
			interval = setInterval(() => {
				setWtime((prevTime) => prevTime + 1000);
			}, 1000);
		} else if (!wtimerOn) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [wtimerOn]);

	useEffect(() => {
		let interval = null;

		if (rtimerOn) {
			interval = setInterval(() => {
				setRtime((prevTime) => prevTime + 1000);
			}, 1000);
		} else if (!rtimerOn) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [rtimerOn]);

	//
	//
	//

	function handleWork() {
		setWtimerOn(true);
		setRtimerOn(false);
	}
	function handleRest() {
		setWtimerOn(false);
		setRtimerOn(true);
	}
	function handleToggle() {
		setWtimerOn((prev) => !prev);
		setRtimerOn((prev) => !prev);
	}
	function handlePause() {
		setWtimerOn(false);
		setRtimerOn(false);
	}
	function handleClear() {
		setWtime(0);
		setRtime(0);
		handlePause();
	}
	//
	//
	//

	function format(t) {
		let h = Math.floor(t / 60000 / 60);
		let m = Math.floor((t / 60000) % 60);
		let s = Math.floor((t / 1000) % 60);

		return (
			<div>
				{h > 0 && <Text>{h.slice(-2)}:</Text>}
				<Text>{("0" + m).slice(-2)}:</Text>
				<Text>{("0" + s).slice(-2)}</Text> <br />
			</div>
		);
	}

	function format2(t) {
		let h = Math.floor(t / 60000 / 60);
		let m = Math.floor((t / 60000) % 60);
		let s = Math.floor((t / 1000) % 60);

		return `${h > 0 ? `${h.slice(-2)}:` : ""}${("0" + m).slice(-2)}:${(
			"0" + s
		).slice(-2)}`;
	}

	function format3(t) {
		let h = Math.floor(t / 60000 / 60);
		let m = Math.floor((t / 60000) % 60);

		return `${h > 0 ? `${h}h` : ""} ${m}min`;
	}

	let workDebt = rtime * 5 - wtime;
	let restDebt = wtime / 5 - rtime;

	let favicon = rtimerOn ? "r_favicon.ico" : "w_favicon.ico";

	return (
		<>
			<Helmet>
				<link rel="icon" type="image/png" href={favicon} sizes="16x16" />
			</Helmet>
			<Wrapper bg={rtimerOn ? "#b2dfdb" : "#ffcdd2"}>
				<Github>
					<a href="https://github.com/shwwwna/freemodoro" target="_blank">
						<GitHub />
					</a>
				</Github>
				<Timers>
					<Display>
						{workDebt > 1000 ? (
							<>I have to work more for at least {format2(workDebt)}</>
						) : (
							""
						)}
						{restDebt >= 300000 ? `I can rest for ${format2(restDebt)}` : ""}
						{!rtimerOn && (
							<>
								<br />
								<br />
								Work <br />
								{format(wtime)}
							</>
						)}
						{rtimerOn && (
							<>
								{restDebt < 300000 && restDebt > 0 ? (
									<>I can rest for at most {format2(restDebt)}</>
								) : (
									""
								)}
								<br />
								<br />
								Rest <br />
								{format(rtime)}
							</>
						)}
					</Display>

					{!wtimerOn && !rtimerOn ? (
						<>
							<Button onClick={handleWork}>Work</Button> <br />
							<Button onClick={handleRest}>Rest</Button>
						</>
					) : (
						<Button onClick={handleToggle}>{wtimerOn ? "Rest" : "Work"}</Button>
					)}
					<br />
					<br />
					<ButtonContainer>
						<Icon onClick={handlePause}>
							<PauseCircleOutline />
						</Icon>

						<Icon onClick={handleClear}>
							<HighlightOff />
						</Icon>
					</ButtonContainer>
				</Timers>
			</Wrapper>
		</>
	);
};

export default App;
