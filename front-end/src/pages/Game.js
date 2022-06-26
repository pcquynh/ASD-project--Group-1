import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Question from "../components/Question";
import { Container, Row, Col } from "react-bootstrap";
import Results from "../components/Results";
import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();
  const [timeTaken, setTimeTaken] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [secondsOnQuestion, setSecondsOnQuestion] = useState(15);
  let currentDate = new Date().toLocaleDateString("sv").slice(0, 10);
  const [showResults, setShowResults] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [buttonColorA, setButtonColorA] = useState(
    "col-7 btn btn-dark btn-lg active"
  );
  const [buttonColorB, setButtonColorB] = useState(
    "col-7 btn btn-dark btn-lg active"
  );
  const [buttonColorC, setButtonColorC] = useState(
    "col-7 btn btn-dark btn-lg active"
  );
  const [playable, setPlayable] = useState(false);

  // local storage
  const checkPlayable = () => {
    let gameScores = JSON.parse(localStorage.getItem("scores") || "[]");
    if (gameScores.length === 0) {
      setPlayable(true);
    } else {
      let dateArray = gameScores.map((game) => game.currentDate);
      let totalDate = dateArray.length;
      let lastPlayedDate = dateArray[totalDate - 1];
      if (lastPlayedDate < currentDate) {
        setPlayable(true);
      }
    }
  };

  //button styles - default, correct, incorrect
  const default_button = "col-7 btn btn-dark btn-lg active";
  const green_button = "col-7 btn btn-success btn-lg disabled";
  const red_button = "col-7 btn btn-danger btn-lg disabled";

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/question/${currentDate}`);
      const body = await result.json();
      setQuestions(body);
    };
    fetchData();
    checkPlayable();
  }, []);

  const reset = () => {
    setSecondsOnQuestion(parseInt(15));
    setTimerActive(true);
    setShowResults(false);
  };

  useEffect(() => {
    let questionTimer = null;
    if (timerActive) {
      questionTimer = setInterval(
        () => setSecondsOnQuestion(secondsOnQuestion - 1),
        1000
      );
    } else if (!timerActive && secondsOnQuestion !== 0) {
      setTimeTaken([...timeTaken, Math.abs(secondsOnQuestion - 15)]);
      clearInterval(questionTimer);
    }
    if (timerActive && secondsOnQuestion === 0) {
      setTimeTaken([...timeTaken, Math.abs(secondsOnQuestion - 15)]);
      clearInterval(questionTimer);
      checkAnswer("Timeout");
    }
    return () => clearInterval(questionTimer);
  }, [timerActive, secondsOnQuestion]);

  const showNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      reset();
    } else {
      setTimerActive(false);
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

    await fetch("/api/checkanswer", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === answer) {
          setScore(score + 1);
          setIsCorrect([...isCorrect, true]);
          if (answer === "A") {
            setButtonColorA(green_button);
            setButtonColorB(red_button);
            setButtonColorC(red_button);
          }
          if (answer === "B") {
            setButtonColorA(red_button);
            setButtonColorB(green_button);
            setButtonColorC(red_button);
          }
          if (answer === "C") {
            setButtonColorA(red_button);
            setButtonColorB(red_button);
            setButtonColorC(green_button);
          }
        } else {
          setIsCorrect([...isCorrect, false]);
          if (answer === "A") {
            setButtonColorA(red_button);
            if (result === "B") {
              setButtonColorB(green_button);
              setButtonColorC(red_button);
            } else {
              setButtonColorC(green_button);
              setButtonColorB(red_button);
            }
          }
          if (answer === "B") {
            setButtonColorB(red_button);
            if (result === "A") {
              setButtonColorA(green_button);
              setButtonColorC(red_button);
            } else {
              setButtonColorC(green_button);
              setButtonColorA(red_button);
            }
          }
          if (answer === "C") {
            setButtonColorC(red_button);
            if (result === "B") {
              setButtonColorB(green_button);
              setButtonColorA(red_button);
            } else {
              setButtonColorA(green_button);
              setButtonColorB(red_button);
            }
          }
        }
      })
      .catch((error) => console.log("error", error));

    setTimeout(() => {
      setButtonColorA(default_button);
      setButtonColorB(default_button);
      setButtonColorC(default_button);
      showNextQuestion();
    }, 1500);
  }
  if (playable === false) {
    navigate("/statistics");
  }
  if (questions.length > 0 && playable === true) {
    return (
      <Container className="d-flex flex-column min-vh-100 justify-content-center">
        {showResults ? (
          <Results score={score} answers={isCorrect} time={timeTaken} />
        ) : (
          <>
            <Row className="text-center" onChange={showNextQuestion}>
              <Col>
                <p className="fw-bold display-2">{`0:${secondsOnQuestion
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
            <Question
              question={questions[currentQuestion]}
              checkAnswer={checkAnswer}
              score={score}
              setTimerActive={setTimerActive}
              buttonColorA={buttonColorA}
              buttonColorB={buttonColorB}
              buttonColorC={buttonColorC}
            />
          </>
        )}
        <Row className="align-self-center">
      <img src="speedtriv_small.png"></img>
      </Row>
      </Container>
    );
  }
}

export default Game;
