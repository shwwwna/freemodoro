import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import moment from "moment";
import { useState, useEffect } from "react";
import { GitHub, HighlightOff, PauseCircleOutline } from "@mui/icons-material";
import { format, format2, format3 } from "./utils/Format";

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
	flex-direction: column;

	/* @media only screen and (max-width: 460px) {
		align-items: flex-start;
		padding-left: 1rem;
	} */
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
	border: 2px solid black;
	padding: 6px 12px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	transition: box-shadow 0.2s;

	&:hover {
		background-color: transparent;
		color: black;
		box-shadow: 4px 4px 0 #000;
	}
	&:active {
		background-color: white;
		outline-offset: 1px;
	}
`;

const ButtonContainer = styled.div``;

const Github = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: 1rem;
	color: black;
	opacity: 0.3;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	mix-blend-mode: color-burn;
`;

const SmallText = styled.span`
	text-align: center;
	font-size: 0.6rem;
`;

const App = () => {
	const [wtime, setWtime] = useState(0);
	const [wtimerOn, setWtimerOn] = useState(false);
	const [rtime, setRtime] = useState(0);
	const [rtimerOn, setRtimerOn] = useState(false);
	const [firstTime, setfirstTime] = useState("");

	// to change document title
	useEffect(() => {
		function title() {
			if (rtimerOn) return format3(rtime) + " REST";
			if (wtimerOn) return format3(wtime) + " WORK";
			if (wtime === 0 && rtime === 0) return "LET'S START!";
			return `PAUSED - ${format3(wtime)} WORK`;
		}

		document.title = title();
	}, [wtime, rtime, wtimerOn, rtimerOn]);

	// to change favicon
	let favicon = defineFavicon();
	function defineFavicon() {
		if (rtimerOn) return "r_favicon.ico";
		if (wtimerOn) return "w_favicon.ico";
		return "p_favicon.ico";
	}

	// to set time launched
	useEffect(() => {
		setfirstTime(moment.now());
	}, []);

	// work timer
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

	// rest timer
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

	// to calculate debt and credit
	let workDebt = rtime * 5 - wtime;
	let restDebt = wtime / 5 - rtime;

	// buttons
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

	// conditionally rendered elements
	function defineMessage() {
		if (workDebt > 1000) return <>I have to work extra {format2(workDebt)}</>;
		if (restDebt >= 300000) return <>I deserve rest for {format2(restDebt)}</>;
		if (rtimerOn && restDebt < 300000 && restDebt > 0)
			return <>I can rest for at most {format2(restDebt)}</>;
		return;
	}

	function defineTimer() {
		if (wtimerOn)
			return (
				<>
					Work <br /> {format(wtime)}
				</>
			);
		if (rtimerOn)
			return (
				<>
					Rest <br />
					{format(rtime)}
				</>
			);

		if (wtime === 0 && rtime === 0) return <Text>Let's start!</Text>;
		return (
			<>
				Work {format2(wtime)} <br />
				Rest {format2(rtime)}
			</>
		);
	}

	function defineButtons() {
		if (!wtimerOn && !rtimerOn)
			return (
				<>
					<Button onClick={handleWork}>Work</Button> <br />
					<Button onClick={handleRest}>Rest</Button>
				</>
			);
		return <Button onClick={handleToggle}>{wtimerOn ? "Rest" : "Work"}</Button>;
	}

	function defineBackground() {
		if (rtimerOn) return "#b2dfdb";
		if (wtimerOn) return "#ffcdd2";
		return "#fff3e0";
	}

	return (
		<>
			<Helmet>
				<link rel="icon" type="image/png" href={favicon} sizes="16x16" />
			</Helmet>
			<Wrapper bg={defineBackground}>
				<Github>
					<div></div>
					<div></div>
					<div>
						<a href="https://github.com/shwwwna/freemodoro" target="_blank">
							<GitHub />
						</a>
					</div>
				</Github>
				<Timers>
					<Display>
						{defineMessage()}
						<br />
						<br />
						{defineTimer()}
					</Display>
					{defineButtons()}
					<br />
					<ButtonContainer>
						<Icon onClick={handlePause}>
							<PauseCircleOutline />
						</Icon>
						<Icon onClick={handleClear}>
							<HighlightOff />
						</Icon>
						{/* <Icon>
							<ArrowCircleDown style={{ transform: "rotate(90deg)" }} />
						</Icon> */}
					</ButtonContainer>
					<SmallText>
						launched {moment(firstTime).format("h:mm A")}
						{" - "}
						{moment(firstTime).fromNow()}
					</SmallText>
				</Timers>
			</Wrapper>
		</>
	);
};

export default App;
