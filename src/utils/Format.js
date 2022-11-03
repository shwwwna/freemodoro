import React from "react";
import styled from "styled-components";

const Text = styled.span`
	font-size: 36px;
`;

// to format time
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

export { format, format2, format3 };
