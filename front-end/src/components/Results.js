import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

function Results({ score, time }) {
  console.log(time);
  let totalTime = (Date.now() - time)/1000;
  return (
    <>
      <Row className="justify-content-center">
        <Col className="col-4">
          <h1>Game over!</h1>
          <h5>Your Score: {score}</h5>
        </Col>
        <Col className="col-3 text-end">
          <h5>Total time taken: {totalTime}s</h5>
          <h5>Next SpeedTriv</h5>
        </Col>
      </Row>
    </>
  );
}

export default Results;