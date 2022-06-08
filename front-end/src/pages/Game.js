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
          <p>{`0:${seconds.toString().padStart(2, "0")}`}</p>
          <h1>Question 1/6</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Game; 