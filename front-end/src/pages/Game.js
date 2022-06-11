import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Question from "./Question";

function Game() {
  const [questions, setQuestions] = useState([]);

  // load the json data

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/api/question");
      const body = await result.json();
      setQuestions(body);
    };
    fetchData();
  }, []);
  return <Question questions={questions} />;
}

export default Game;
