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
  const [secondsOnQuestion, setSecondsOnQuestion] = useState(15);
  const [loading, setLoading] = useState(false);
  let currentDate = new Date().toISOString().slice(0, 10);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetch("/api/question");
      const body = await result.json();
      setQuestions(body);
      setLoading(false);
    };
    fetchData();
  }, []);

  const tick = () => {
    if (over) return;
    if (secondsOnQuestion === 0) setOver(true);
    else {
      setSecondsOnQuestion(secondsOnQuestion - 1);
    }
  };

  const reset = () => {
    setSecondsOnQuestion(parseInt(15));
    setOver(false);
    setShowResults(false);
  };

  // useEffect(() => {
  //   const questionTimer = setInterval(() => tick(), 1000);
  //   return () => clearInterval(questionTimer);
  // });

  const showNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      reset();
    } else {
      setShowResults(true);
    }
  };

  async function checkAnswer(answer) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      question: questions[currentQuestion].question,
      choice: answer,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("http://localhost:8000/api/checkanswer", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "correct") {
          setScore(score + 1);
        }
      })
      .catch((error) => console.log("error", error));

    showNextQuestion();
  }

  if (over) {
    showNextQuestion();
  }

  const updateCurrentDateQuestion = async (id) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usedDate: currentDate }),
    };
    const response = await fetch(
      `http://localhost:8000/api/update/${id}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  };

  let currentDateQuestions = [];
  if (loading === false && questions.length > 0) {
    currentDateQuestions = questions
      .filter((q) => q.usedDate === currentDate)
      .slice(0, 6);
    if (currentDateQuestions.length === 0) {
      currentDateQuestions = questions.slice(0, 6);
      console.log(currentDateQuestions);
      currentDateQuestions.forEach((q) => {
        console.log(q._id);
        updateCurrentDateQuestion(q._id);
      });
    }
  }

  if (currentDateQuestions.length > 0) {
    return (
      <Container>
        <Row className="text-center" onChange={showNextQuestion}>
          <Col>
            <p class="fw-bold display-2">{`0:${secondsOnQuestion
              .toString()
              .padStart(2, "0")}`}</p>
          </Col>
        </Row>
        {/* todo: update total time and waiting time for next round */}
        {showResults ? (
          <Row className="justify-content-center">
            <Col className="col-4">
              <h1>Game over!</h1>
              <h5>Your Score: {score}</h5>
            </Col>
            <Col className="col-3 text-end">
              <h5>Total time taken: 0:00s</h5>
              <h5>Next SpeedTriv</h5>
            </Col>
          </Row>
        ) : (
          <Row className="text-center font-weight-bold">
            <Col>
              <h1>
                Question {currentQuestion + 1}/{currentDateQuestions.length}
              </h1>
              <br></br>
            </Col>
          </Row>
        )}
        <Question
          question={currentDateQuestions[currentQuestion]}
          checkAnswer={checkAnswer}
          score={score}
        />
      </Container>
    );
  }
}

export default Game;
