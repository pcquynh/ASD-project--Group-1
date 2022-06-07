import React from "react";

export function Home() {
  return (
    <>
      <h1>Welcome to Speedtriv!</h1>
      <ul>
        <li>
          Speedtriv is a daily trivia game, with an emphasis on speed and
          trivia!
        </li>
        <li>You get 6 questions, with 3 answers to choose from.</li>
        <li>Each question runs on a 15 second timer.</li>
        <li>
          Your total score and time taken will be displayed after each game.
        </li>
        <li>Gook luck and have fun!</li>
      </ul>
      <button>Start</button>
    </>
  );
}

export function Game() {
  return (
    <>
      <h1>Question 1/6</h1>
    </>
  );
}

export function Results() {
  return (
    <>
      <h1>Your results</h1>
    </>
  );
}

export function Statistics() {
  return (
    <>
      <h1>Statistics</h1>
    </>
  );
}
