import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

function Question({ question, checkAnswer = (f) => f, setTimerActive = f => f }) {
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
          onClick={
            () => {
              setTimerActive(false);
              checkAnswer("A");
            }
            }
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
          onClick={
            () => {
              setTimerActive(false);
              checkAnswer("B");
            }
          }
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
          onClick={() => {
            setTimerActive(false);
            checkAnswer("C");
          }}
        >
          C. {question.choiceC}
        </a>
      </Row>
      <br></br>
    </>
  );
}

export default Question;
