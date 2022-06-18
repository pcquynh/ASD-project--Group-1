import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

function Question({ question, checkAnswer = (f) => f, setTimerActive = (f) => f, buttonColorA, buttonColorB, buttonColorC }) {
  return (
    <>
      <Row className="justify-content-center">
        <Col className="col-7 border border-dark text-center">
          <h5>{question.question}</h5>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <Row className="justify-content-center">
        <a
          href="#"
          className={buttonColorA}
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
          className={buttonColorB}
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
          className={buttonColorC}
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
