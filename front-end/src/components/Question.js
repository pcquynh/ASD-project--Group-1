import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";

function Question({ question, checkAnswer = (f) => f, setTimerActive = (f) => f, buttonColorA, buttonColorB, buttonColorC }) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-md-7 border border-dark border-2 p-3 text-center bg-white">
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
            onMouseDown={
              (e) => {
              e.preventDefault();
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
          onMouseDown={
            (e) => {
            e.preventDefault();
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
          onClick={
            () => {
            setTimerActive(false);
            checkAnswer("C");
          }
        }
          onMouseDown={
            (e) => {
            e.preventDefault();
          }
        }
        >
          C. {question.choiceC}
        </button>
      </Row>
      <br></br>
    </Container>
  );
}

export default Question;
