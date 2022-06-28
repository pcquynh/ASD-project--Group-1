import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import NextGameCountdown from "../components/NextGameCountdown";

function Statistics() {
  let scoreArray = 0;
  let totalGames = 0;
  let highestScore = 0;
  let averageScore = 0;

  // local storage
  let gameScores = JSON.parse(localStorage.getItem("scores") || "[]");
  if (gameScores.length > 0) {
    scoreArray = gameScores.map((game) => game.points);
    totalGames = scoreArray.length;
    highestScore = Math.max.apply(null, scoreArray);
    averageScore = scoreArray.reduce((a, b) => a + b, 0) / scoreArray.length;
  }

  return (
    <>
      <Container className="d-flex flex-column min-vh-100 justify-content-center">
      <Row className="align-self-center">
      <img src="speedtriv2.png"></img>
      </Row>
        <Row className="justify-content-center">
          <Col className="col-md-7 border border-dark border-2 p-3 text-center bg-white">
            <h1>Game Statistics!</h1>
            <br></br>
            <h5>Total games played: {totalGames} </h5>
            <h5>Highest Score: {highestScore}</h5>
            <h5>Average Score: {Math.round(averageScore)}</h5>
            <br></br>
            <NextGameCountdown />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Statistics;
