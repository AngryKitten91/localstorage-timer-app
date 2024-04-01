# Simple Raw JS Timer App

Task Timer is a simple JavaScript application designed to help you track the time it takes to finish various tasks.

[(Working Demo)](https://angrykitten91.github.io/localstorage-timer-app/)

## Features

- **Task Timer**: Start and stop a timer for each task to measure the time taken. Reset if needed
- **Timer Management**: Add and remove tasks as needed.
- **Accurate Tracking**: Precisely measure the duration of each task.
- **LocalStorage**: Don't loose track of you timers when you're gone. Timers will persist in your local storage and if left running will count time when tou're gone

## Usage

1. **Add Timer**: Click on the "Add" button to create a new timer with yout name of choice.
2. **Start Timer**: Start the timer by clicking on the "Start" button.
3. **Stop Timer**: Click on the "Stop" button to stop the timer when the task is complete.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/AngryKitten91/localstorage-timer-app.git
   ```

2. Navigate to the project directory

3. Install node dependencies

   ```
   npm i
   ```

4. Run dev server with webpack

   ```
   npm start
   ```

5. Build final package with webbpack to `/dist` folder, and deploy on your server.

   ```
   npm run build
   ```
