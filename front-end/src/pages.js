import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Welcome to Speedtriv!</h1>
          <br></br>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-7 border border-dark">
          <h5>
            <p>
              Speedtriv is a daily trivia game, with an emphasis on speed and
              trivia!
            </p>
            <p>You get 6 questions, with 3 answers to choose from.</p>
            <p>Each question runs on a 15 second timer.</p>
            <p>
              Your total score and time taken will be displayed after each game.
            </p>
            <p>Good luck and have fun!</p>
          </h5>
        </Col>
      </Row>
      <br></br>
      <Row className="justify-content-center">
        <a
          href="#"
          class="col-7 btn btn-dark btn-lg active"
          role="button"
          aria-pressed="true"
          onClick={() => navigate("/game")}
        >
          Start
        </a>
      </Row>
    </Container>
  );
}

export function Game() {
  const [over, setOver] = useState(false);
  const [seconds, setSeconds] = useState(15);

  const tick = () => {
    if (over) return;
    if (seconds === 0) setOver(true);
    else {
      setSeconds(seconds - 1);
    }
  };

  const reset = () => {
    setSeconds(parseInt(15));
    setOver(false);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <p>{`0:${seconds.toString().padStart(2, "0")}`}</p>
          <h1>Question 1/6</h1>
        </Col>
      </Row>
    </Container>
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
