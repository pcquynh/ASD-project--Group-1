import React from "react";
import NextGameCountdown from "./NextGameCountdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { GiCheckMark } from "react-icons/gi"
import { BsXLg } from "react-icons/bs"
import "../App.css";

function Results({ score, time, answers }) {
  let currentDate = new Date().toLocaleDateString("sv").slice(0, 10);
  let points = 0;
  let timeBonus = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === true) {
      timeBonus = Math.abs(time[i] - 15) * 10;
      points += 100 + timeBonus;
    }
  }

  // local storage
  let gameScores = JSON.parse(localStorage.getItem("scores") || "[]");
  gameScores.push({ currentDate, points });
  localStorage.setItem("scores", JSON.stringify(gameScores));

  let scoreArray = gameScores.map((game) => game.points);
  let totalGames = scoreArray.length;
  let highestScore = Math.max.apply(null, scoreArray);
  let averageScore = scoreArray.reduce((a, b) => a + b, 0) / scoreArray.length;

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-md-7 border border-dark border-2 p-3 text-center bg-white">
            <h1>Game over!</h1>
            <br></br>
            <Row className="text-center">
            <table>
              <thead>
                <tr>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {answers.map((rightOrWrong, i) => {
                    return <td key={i}>{rightOrWrong ? <GiCheckMark color="green" /> : <BsXLg color="red" />}</td>;
                  })}
                </tr>
                <tr>
                  {time.map((timeTaken, i) => {
                    return <td className="w-15" key={i}>{timeTaken}s</td>;
                  })}
                </tr>
              </tbody>
            </table>
            </Row>
            <br></br>
            <h5>Your Score: {points} Points</h5>
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

export default Results;
