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
        <button
          className={buttonColorA}
          onClick={
            () => {
              setTimerActive(false);
              checkAnswer("A");
            }
            }
        >
          A. {question.choiceA}
        </button>
      </Row>
      <br></br>
      <Row className="justify-content-center">
        <button
          className={buttonColorB}
          onClick={
            () => {
              setTimerActive(false);
              checkAnswer("B");
            }
          }
        >
          B. {question.choiceB}
        </button>
      </Row>
      <br></br>
      <Row className="justify-content-center">
        <button
          className={buttonColorC}
          onClick={() => {
            setTimerActive(false);
            checkAnswer("C");
          }}
        >
          C. {question.choiceC}
        </button>
      </Row>
      <br></br>
    </>
  );
}

export default Question;
