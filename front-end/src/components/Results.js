import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";


function Results({ score, time, answers }) {
  let points = 0;
  let timeBonus = 0;
  for(let i = 0; i<answers.length;i++){
      if (answers[i] == true){
          timeBonus = Math.abs(time[i] - 15) * 10;
        }
        points += 100 + timeBonus;
      }


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
          <table>
            <thead>
              <tr>
              <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            {answers.map( (rightOrWrong) => {
                        return(<td>
                        {rightOrWrong ? "Correct" : "Incorrect"}
                        </td>)
                      })}
            </tr>
            <tr>
              {time.map( (timeTaken) => {
            return(<td>{timeTaken}s</td>)
          })}
            </tr>
            </tbody>
          </table>  
          <h5>Your Score: {points} Points</h5>
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