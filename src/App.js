import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import moment from "moment";
import { useState, useEffect } from "react";
import { HighlightOff, PauseCircleOutline } from "@mui/icons-material";
import { format, format2, format3 } from "./utils/Format";
import Modal from "./components/Modal";
import Tabs from "./pages/Tabs";
// import useSound from "use-sound";

//
// STYLED COMPONENTS
//

// DIVIDERS
const Background = styled.div`
	height: 100%;
	background-color: ${(props) => props.bg};
	transition: all 0.5s;

	/* TODO option to align left or center */
	/* @media only screen and (max-width: 460px) {
		align-items: flex-start;
		padding-left: 1rem;
	} */
`;

const Bar = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: 1rem;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: end;
	width: 100%;
	color: #000000;
	opacity: 0.5;
`;

const PageOne = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Display = styled.div`
	margin-bottom: 20px;
`;

const Timer = styled.div`
	margin-top: 2rem;
`;

const PageTwo = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
`;

const IconContainer = styled.div``;

// ELEMENTS

const H1 = styled.span`
	font-size: 2.3rem;
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
	display: block;
	/* align-items: center;
	justify-content: space-evenly; */
	transition: all 0.2s;
	margin-bottom: 1rem;

	&:hover {
		background-color: white;
		color: black;
		box-shadow: 4px 4px 0 #000;
	}
	&:active {
		background-color: transparent;
		outline-offset: 1px;
	}
`;

const Icon = styled.button`
	cursor: pointer;
	background: none;
	border: none;
	font-size: large;
`;

const SmallText = styled.span`
	text-align: center;
	font-size: 0.6rem;
`;

const Span = styled.span`
	display: block;
`;

//
// DEFINE APP
//

const App = () => {
	const [wtime, setWtime] = useState(
		JSON.parse(localStorage.getItem("wtime")) || 0
	);
	const [wtimerOn, setWtimerOn] = useState(false);
	const [rtime, setRtime] = useState(
		JSON.parse(localStorage.getItem("rtime")) || 0
	);
	const [rtimerOn, setRtimerOn] = useState(false);
	const [firstTime, setfirstTime] = useState("");
	const [ratio, setRatio] = useState(5);

	// to change document title
	useEffect(() => {
		function title() {
			if (rtimerOn) return format3(rtime) + " REST";
			if (wtimerOn) return format3(wtime) + " WORK";
			if (wtime === 0 && rtime === 0) return "LET'S GO!";
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

	// to set time launched = page is first loaded
	// TODO: when wtime is changed, not when page is first loaded
	useEffect(() => {
		setfirstTime(moment.now());
	}, [wtime]);

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
	let workDebt = rtime * ratio - wtime;
	let restDebt = wtime / ratio - rtime;

	// sound effects
	// const [playSuccess] = useSound("./assets/success.mp3", { volume: 0.25 });
	// const [playNotify] = useSound("./assets/notify.mp3", { volume: 0.25 });

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
		saveTimes();
	}
	function saveTimes() {
		localStorage.setItem("wtime", JSON.stringify(wtime));
		localStorage.setItem("rtime", JSON.stringify(rtime));
	}

	function handleClear() {
		if (window.confirm("Are you sure you want to clear session?") === true) {
			actuallyClear();
		}
	}

	function actuallyClear() {
		setWtime(0);
		setRtime(0);
		handlePause();
		localStorage.clear();
		window.location.reload();
	}

	// conditionally rendered elements
	function defineMessage() {
		if (workDebt > 1000) return <>I have to work extra {format2(workDebt)}</>;
		if (rtimerOn && restDebt >= 300000)
			return <>I deserve rest for {format2(restDebt)}</>;
		if (rtimerOn && restDebt > 0 && restDebt < 300000)
			return <>I can rest for at most {format2(restDebt)}</>;
		return;
	}

	function defineTimer() {
		if (wtimerOn)
			return (
				<>
					Work
					{format(wtime)}
				</>
			);
		if (rtimerOn)
			return (
				<>
					Rest
					{format(rtime)}
				</>
			);

		if (!wtime && !rtime) return <H1>Let's go!</H1>;
		return (
			<>
				<Span>Work {format2(wtime)}</Span>
				<Span>Rest {format2(rtime)}</Span>
			</>
		);
	}

	function defineButtons() {
		if (!wtimerOn && !rtimerOn)
			return (
				<>
					<Button onClick={handleWork}>Work</Button>
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

	//
	// RENDERED APP
	//
	return (
		<>
			<Helmet>
				<link rel="icon" type="image/png" href={favicon} sizes="16x16" />
			</Helmet>
			<Background bg={defineBackground}>
				<Bar>
					<Modal />
				</Bar>
				<PageOne>
					<Wrapper>
						<Display>
							{defineMessage()}
							<Timer>{defineTimer()}</Timer>
						</Display>
						{defineButtons()}
						<IconContainer>
							<Icon onClick={handlePause}>
								<PauseCircleOutline
									color={!wtimerOn && !rtimerOn ? "disabled" : ""}
								/>
							</Icon>
							<Icon onClick={handleClear}>
								<HighlightOff color={!wtime && !rtime ? "disabled" : ""} />
							</Icon>
						</IconContainer>
						<SmallText>
							launched{" "}
							{moment(firstTime).format("h:mm A") +
								" - " +
								moment(firstTime).fromNow()}{" "}
							<br />
							{!wtimerOn && !rtimerOn && (wtime || rtime)
								? "session saved"
								: ""}
						</SmallText>
					</Wrapper>
				</PageOne>
				<PageTwo>
					<Tabs />
				</PageTwo>
			</Background>
		</>
	);
};

export default App;
