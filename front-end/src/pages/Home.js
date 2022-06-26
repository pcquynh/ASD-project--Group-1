import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
    <Container className="d-flex flex-column min-vh-100 justify-content-center">
      <Row className="align-self-center">
      <img src="speedtriv2.png"></img>
      </Row>
      <Row className="text-center">
        <Col>
          <h1>Welcome!</h1>
          <br></br>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-md-7 border border-dark">
          <h5>
            <p>
              Speedtriv is a daily trivia game, with an emphasis on speed and
              trivia!
            </p>
            <p>You get 6 questions, with 3 answers to choose from.</p>
            <p>Each question runs on a 15 second timer.</p>
            <p>
              Your total score and time taken will be displayed after each game.
            </p>
            <p>Bonus points will be awarded based on speed.</p>
            <p>Good luck and have fun!</p>
          </h5>
        </Col>
      </Row>
      <br></br>
      <Row className="justify-content-center">
        <button
          className="col-7 btn btn-dark btn-lg active"
          onClick={() => navigate("/game")}>
          Start
        </button>
      </Row>
    </Container>
    </>
  );
}

export default Home;