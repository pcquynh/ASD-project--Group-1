import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";


function Results({ score, time }) {
  // TODO: Incorporate time into scoring system
  // const scoring = () => {
  //   let points = 0;
  //   points += score * 100;
  //   points += 
  // }

  const [timeDifferenceHour, setTimeDifferenceHour] = useState("");
  const [timeDifferenceMinute, setTimeDifferenceMinute] = useState("");
  const [timeDifferenceSecond, setTimeDifferenceSecond] = useState("");
  let nextDay = new Date();
  nextDay.setHours(24, 0, 0, 0);
  const midnight = nextDay.getTime()/1000
  let currentTime = (new Date().getTime())/1000;

  setInterval( () => {
      let timeDifferenceMS = midnight - currentTime;
      setTimeDifferenceHour(Math.floor(timeDifferenceMS/3600)) ;
      timeDifferenceMS = timeDifferenceMS - (timeDifferenceHour * 3600);
      setTimeDifferenceMinute(Math.floor(timeDifferenceMS/60));
      timeDifferenceMS = timeDifferenceMS - (timeDifferenceMinute * 60);
      setTimeDifferenceSecond((Math.floor(timeDifferenceMS)));
  }, 1000)
  
  return (
    <>
    <Container>
      <Row className="justify-content-center">
        <Col className="col-7 border border-dark text-center">
          <h1>Game over!</h1>
          <br></br>
          <h5>Answers Correct: {score}/6</h5>
          <h5>Total time taken: {time}s</h5>
          <h5>Your Score: ___ Points</h5>
          <br></br>
          <h5>Next SpeedTriv</h5>
          <h6>Hours: {timeDifferenceHour}</h6>
          <h6>Minutes: {timeDifferenceMinute}</h6>
          <h6>Seconds: {timeDifferenceSecond}</h6>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Results;