
# Freemodoro - Dynamic Pomodoro
# https://freemodoro.vercel.app/

Freemodoro is a Pomodoro timer that gives you freedom in setting your work & rest times! 

- instead of a timer, a stopwatch
- instead of forcing you to stop working, toggle anytime to switch to break
- minutes of break is calculated proportionally (work : break = 5:1, 25:5)
- so your deep work and flow will not be interrupted
- so you will not take overtime breaks

# Built with
  - React
  - Styled-components
  - Material UI Icons

# Installation

To install Freemodoro locally, please follow the steps below:
  - Clone repo to your machine
  - Open the root of the project and install all dependencies with `npm i` 
  - Project has various scripts to run:
    - `npm start` - running local version
    - `npm run test` - run tests

# Roadmap
1. localstorage
1. refactor for switch case / nested conditionals
	 display mode for paused: 
	- white background; 
	- show both work and rest; 
	- title: PAUSED
1. display time page is first loaded, intl relativetimeformat
"working since 00:00 PM <1 hour ago / n hours ago"
1. popup mode
small browser, show favicon
1. dark mode toggle
1. option to clear worktime and breaktime every time
1. notify when break credit = 0
1. options to set ratio: 5 (easy), 6 (med), 7 (hard)

# Source

The code of this repository is inspired by https://github.com/Vandesm14/ratio-timer

# Contact
Have suggestions, errors, or want to contribute?

Contact Sheena at shwwwna@gmail.com
