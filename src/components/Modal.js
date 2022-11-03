import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
	GitHub,
	HighlightOff,
	Instagram,
	MoreVert,
	PauseCircleOutline,
	Twitter,
} from "@mui/icons-material";
import styled from "styled-components";

const boxStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	lineHeight: 1.3,
};

const buttonStyle = {
	cursor: "pointer",
};

const H2 = styled.h2`
	margin-bottom: 0.8rem;
`;

const Li = styled.li`
	display: flex;
	align-items: center;
	list-style: circle;
	margin-top: 1rem;
`;

const SmallText = styled.span`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	font-size: 0.6rem;
	margin-top: 2rem;
`;

export default function BasicModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<MoreVert style={buttonStyle} onClick={handleOpen} />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={boxStyle}>
					{/* TODO Settings */
					/* <H2>Settings</H2>
					Align: Left - Center */
					/* Theme: Light - Dark */}
					<H2>How to use</H2>
					<ol>
						<li>
							Click <b>Work </b>to start work session
						</li>
						<li>
							Click <b>Rest </b>to switch to rest
						</li>
						<li>Follow the messages</li>
						<ul>
							<li>
								<i>I have to work extra ___</i>
							</li>
							<li>
								<i>I can rest for at most ___</i>
							</li>
							<li>
								<i>I deserve rest for ___</i>
							</li>
						</ul>
					</ol>
					<Li>
						<PauseCircleOutline /> to pause and save session
					</Li>
					Session will NOT be saved otherwise
					<Li>
						<HighlightOff /> to clear session
					</Li>
					<SmallText>
						<div>
							<a
								href="https://github.com/shwwwna/freemodoro"
								target="_blank"
								rel="noreferrer">
								<GitHub />
							</a>
							<a
								href="https://twitter.com/shwwwna"
								target="_blank"
								rel="noreferrer">
								<Twitter />
							</a>
							<a
								href="https://www.instagram.com/shwwwna/"
								target="_blank"
								rel="noreferrer">
								<Instagram />
							</a>
						</div>
						<div>Made by Sheena with so much 💖</div>
					</SmallText>
				</Box>
			</Modal>
		</>
	);
}
