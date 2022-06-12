import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Question from "../components/Question";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

function Game() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [over, setOver] = useState(false);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/question");
      const body = await result.json();
      setQuestions(body);
    };
    fetchData();
  }, []);

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

  async function checkAnswer(answer) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "question": questions[currentQuestion].question,
      "choice": answer
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch("http://localhost:8000/api/checkanswer", requestOptions)
      .then(response => response.text())
      .then(result => {
        if(result=="correct"){
          setScore(score + 1);
        }
      })
      .catch(error => console.log('error', error));

    showNextQuestion();
  }

  if (over) {
    showNextQuestion();
  }

  if (questions.length > 6){
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
        <Question question={questions[currentQuestion]} checkAnswer={checkAnswer} score={score} />
      </Container>
    );
  }
}

export default Game;