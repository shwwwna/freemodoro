import React from 'react';

import App from "../App";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Freemodoro',
  component: App,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => <App/>;

export const Main = Template.bind({});
