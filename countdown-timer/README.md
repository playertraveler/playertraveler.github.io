# Countdown Timer

A simple web-based countdown timer that accepts minutes and seconds, validates input, and counts down to zero.

## Features

- Enter minutes and seconds
- Start the timer from idle
- Stop/pause while preserving remaining time
- Reset to the original entered duration
- Input validation with clear error messaging
- `MM:SS` time formatting with leading zeros

## Design Decisions

- The app uses a finite state machine (`idle`, `running`, `paused`) to keep timer behavior predictable.
- Input validation blocks invalid values before any countdown starts.
- Interval cleanup ensures only one timer interval runs at a time.
- UI control states are synchronized with timer state (including input disabling while running).
- The interface uses a dark glass-style visual system for polish while remaining simple and readable.

## How to Run

1. Open `countdown-timer/index.html` in any modern web browser.
2. Enter minutes and seconds.
3. Use **Start**, **Stop**, and **Reset** to control the countdown.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
