import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Question from "../components/Question";
import { Container, Row, Col } from "react-bootstrap";
// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Results from "../components/Results";

function Game() {
  const [startTime] = useState(Date.now());
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [secondsOnQuestion, setSecondsOnQuestion] = useState(15);
  const [loading, setLoading] = useState(false);
  let currentDate = new Date().toISOString().slice(0, 10);
  const [showResults, setShowResults] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [buttonColorA, setButtonColorA] = useState("col-7 btn btn-dark btn-lg active");
  const [buttonColorB, setButtonColorB] = useState("col-7 btn btn-dark btn-lg active");
  const [buttonColorC, setButtonColorC] = useState("col-7 btn btn-dark btn-lg active");
  // const [open, setOpen] = useState(false);
  // const closeModal = () => setOpen(false);

  //button styles - default, correct, incorrect
  const default_button = "col-7 btn btn-dark btn-lg active";
  const green_button = "col-7 btn btn-success btn-lg disabled";
  const red_button = "col-7 btn btn-danger btn-lg disabled";

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

  const reset = () => {
    setSecondsOnQuestion(parseInt(15));
    setTimerActive(true);
    setShowResults(false);
  };

  useEffect(() => {
    let questionTimer = null;
    if (timerActive){
      questionTimer = setInterval(() => setSecondsOnQuestion(secondsOnQuestion - 1), 1000);
    }else if (!timerActive && secondsOnQuestion !== 0){
      clearInterval(questionTimer);
    }
    if (timerActive && secondsOnQuestion === 0){
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

    await fetch("http://localhost:8000/api/checkanswer", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === answer) {
          setScore(score + 1);
          if (answer === "A") setButtonColorA(green_button);
          if (answer === "B") setButtonColorB(green_button);
          if (answer === "C") setButtonColorC(green_button);
        } else {
          if (answer === "A") setButtonColorA(red_button);
          if (answer === "B") setButtonColorB(red_button);
          if (answer === "C") setButtonColorC(red_button);
          if (result === "A") setButtonColorA(green_button);
          if (result === "B") setButtonColorB(green_button);
          if (result === "C") setButtonColorC(green_button);
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
      // .filter((q) => q.usedDate === currentDate)
      .slice(0, 6);
    if (currentDateQuestions.length === 0) {
      currentDateQuestions = questions
        .filter((q) => q.usedDate === null)
        .slice(0, 6);
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
        {/* todo: update total time and waiting time for next round */}
        {showResults ? 
        (
          <Results score={score} time={startTime} />
        ) : (
          <>
            <Row className="text-center" onChange={showNextQuestion}>
              <Col>
                <p class="fw-bold display-2">{`0:${secondsOnQuestion
                  .toString()
                  .padStart(2, "0")}`}</p>
              </Col>
            </Row>
            <Row className="text-center font-weight-bold">
              <Col>
                <h1>
                  Question {currentQuestion + 1}/{currentDateQuestions.length}
                </h1>
                <br></br>
              </Col>
            </Row>
            <Question
              question={currentDateQuestions[currentQuestion]}
              checkAnswer={checkAnswer}
              score={score}
              setTimerActive={setTimerActive}
              buttonColorA={buttonColorA}
              buttonColorB={buttonColorB}
              buttonColorC={buttonColorC}
              />
          </>
        )}
      </Container>
    );
  }
}

export default Game;
