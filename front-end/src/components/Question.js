import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

function Question({ question, checkAnswer = f => f, score}) {
    return (
      <>
        <Row className="justify-content-center">
          <Col className="col-7 border border-dark">
            <h5>{question.question}</h5>
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
            onClick={() => checkAnswer("A")}
          >
            A. {question.choiceA}
          </a>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <a
            href="#"
            class="col-7 btn btn-dark btn-lg active"
            role="button"
            aria-pressed="true"
            onClick={() => checkAnswer("B")}
          >
            B. {question.choiceB}
          </a>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <a
            href="#"
            class="col-7 btn btn-dark btn-lg active"
            role="button"
            aria-pressed="true"
            onClick={() => checkAnswer("C")}
          >
            C. {question.choiceC}
          </a>
        </Row>
        <br></br>
        <Row className="justify-content-center">
          <Col className="col-4">
            <h5>Your Score: {score}</h5>
          </Col>
          <Col className="col-3 text-end">
            <h5>Total time taken: 0:00s</h5>
          </Col>
        </Row>
      </>
    )
}
export default Question;
