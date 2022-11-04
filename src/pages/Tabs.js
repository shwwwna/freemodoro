import * as React from "react";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import TodoTab from "./TodoTab";
import RecordsTab from "./RecordsTab";
import AccountTab from "./AccountTab";

const grey = {
	50: "#f6f8fa",
	100: "#eaeef2",
	200: "#d0d7de",
	300: "#afb8c1",
	400: "#8c959f",
	500: "#6e7781",
	600: "#57606a",
	700: "#424a53",
	800: "#32383f",
	900: "#24292f",
};

const black = {
	0: "#fff",
	1: "#000",
};

const Tab = styled(TabUnstyled)`
	font-family: "Work Sans", sans-serif;
	color: #fff;
	cursor: pointer;
	font-size: 0.875rem;
	font-weight: 600;
	background-color: transparent;
	width: 100%;
	padding: 10px 12px;
	margin: 6px 6px;
	border: none;
	border-radius: 7px;
	display: flex;
	justify-content: center;

	&:hover {
		background-color: ${grey[400]};
	}

	&:focus {
		color: #fff;
		outline: 3px solid ${grey[200]};
	}

	&.${tabUnstyledClasses.selected} {
		background-color: #fff;
		color: ${grey[600]};
	}

	&.${buttonUnstyledClasses.disabled} {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const TabPanel = styled(TabPanelUnstyled)(
	({ theme }) => `
  width: 100%;
  max-width: 400px;
  font-family:  "Work Sans", sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 12px;
//   opacity: 0.6;
  `
);

const TabsList = styled(TabsListUnstyled)(
	({ theme }) => `
  min-width: 400px;
  background-color: ${grey[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `
);

export default function UnstyledTabsIntroduction() {
	return (
		<>
			<TabsUnstyled defaultValue={0}>
				<TabsList>
					<Tab>To-do</Tab>
					<Tab>Records</Tab>
					<Tab>Account</Tab>
				</TabsList>
				<TabPanel value={0}>
					<TodoTab />
				</TabPanel>
				<TabPanel value={1}>
					<RecordsTab />
				</TabPanel>
				<TabPanel value={2}>
					<AccountTab />
				</TabPanel>
			</TabsUnstyled>
		</>
	);
}
