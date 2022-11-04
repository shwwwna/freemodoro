import React from "react";
import { Accordion, AccordionPanel, Box } from "grommet";
import styled from "styled-components";

const MyBox = styled(Box)`
	padding: 1rem;
	min-width: 50%;
`;

const Todo = () => {
	return (
		<>
			<MyBox fill="horizontal">
				<Accordion animate={true} multiple={false}>
					<AccordionPanel label="To-do">
						<MyBox>Panel 1 content</MyBox>
					</AccordionPanel>
				</Accordion>
			</MyBox>
		</>
	);
};

export default Todo;
