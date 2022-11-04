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

const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 30%;
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
								<i>I have to work extra...</i>
							</li>
							<li>
								<i>I can rest for at most...</i>
							</li>
							<li>
								<i>I deserve rest for...</i>
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
						<IconContainer>
							<a
								href="https://twitter.com/shwwwna"
								target="_blank"
								rel="noreferrer">
								<Twitter fontSize="small" />
							</a>
							<a
								href="https://github.com/shwwwna/freemodoro"
								target="_blank"
								rel="noreferrer">
								<GitHub fontSize="large" />
							</a>
							<a
								href="https://www.instagram.com/shwwwna/"
								target="_blank"
								rel="noreferrer">
								<Instagram fontSize="small" />
							</a>
						</IconContainer>
						<div>
							Made with so much 💖 <br />
							Android app coming soon
						</div>
					</SmallText>
				</Box>
			</Modal>
		</>
	);
}
