import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

function Game() {
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
        <p class="fw-bold display-2">{`0:${seconds.toString().padStart(2, "0")}`}</p>
        </Col>
      </Row>
      <Row className="text-center font-weight-bold">
        <Col>
          <h1>Question 1/6</h1>
          <br></br>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-7 border border-dark">
          <h5>
            Which movie released in 1991, stars Arnold Schwarzenegger,
            Linda Hamilton, and Edward Furlong?
          </h5>
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
          // onClick={() => navigate("/game")}
        >
          A. Total Recall
        </a>
      </Row>
      <br></br>
      <Row className="justify-content-center">
        <a
          href="#"
          class="col-7 btn btn-dark btn-lg active"
          role="button"
          aria-pressed="true"
          // onClick={() => navigate("/game")}
        >
          B. Terminator 2
        </a>
      </Row>
      <br></br>
      <Row className="justify-content-center">
        <a
          href="#"
          class="col-7 btn btn-dark btn-lg active"
          role="button"
          aria-pressed="true"
          // onClick={() => navigate("/game")}
        >
          C. Last Action Hero
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

export default Game; 