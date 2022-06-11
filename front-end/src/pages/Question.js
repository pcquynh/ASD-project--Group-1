import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Question({ questions }) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
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

  const showNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      reset();
    } else {
      navigate("/results");
    }
  };

  if (over) {
    showNextQuestion();
  }
  if (questions.length > 0) {
    return (
      <Container>
        <Row className="text-center" onChange={showNextQuestion}>
          <Col>
            <p class="fw-bold display-2">{`0:${seconds
              .toString()
              .padStart(2, "0")}`}</p>
          </Col>
        </Row>
        <Row className="text-center font-weight-bold">
          <Col>
            <h1>
              Question {currentQuestion + 1}/{questions.length}
            </h1>
            <br></br>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-7 border border-dark">
            <h5>{questions[currentQuestion].question}</h5>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <Row className="justify-content-center">
          <a
            href="#"
            class="col-7 btn btn-dark btn-lg active"
            role="button"
            aria-pressed="true"
            onClick={showNextQuestion}
          >
            A. {questions[currentQuestion].choiceA}
          </a>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <a
            href="#"
            class="col-7 btn btn-dark btn-lg active"
            role="button"
            aria-pressed="true"
            onClick={showNextQuestion}
          >
            B. {questions[currentQuestion].choiceB}
          </a>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <a
            href="#"
            class="col-7 btn btn-dark btn-lg active"
            role="button"
            aria-pressed="true"
            onClick={showNextQuestion}
          >
            C. {questions[currentQuestion].choiceC}
          </a>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <Col className="col-4">
            <h5>Your Score: 0</h5>
          </Col>
          <Col className="col-3 text-end">
            <h5>Total time taken: 0:00s</h5>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Question;
