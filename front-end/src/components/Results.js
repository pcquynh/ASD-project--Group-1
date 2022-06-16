import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function Results({ score, time }) {
  // TODO: Incorporate time into scoring system
  // const scoring = () => {
  //   let points = 0;
  //   points += score * 100;
  //   points += 
  // }

  let totalTime = (Date.now() - time)/1000;
  return (
    <>
    <Container>
      <Row className="justify-content-center">
        <Col className="col-7 border border-dark text-center">
          <h1>Game over!</h1>
          <br></br>
          <h5>Answers Correct: {score}/6</h5>
          <h5>Total time taken: {totalTime}s</h5>
          <h5>Your Score: ___ Points</h5>
          <br></br>
          <h5>Next SpeedTriv</h5>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Results;