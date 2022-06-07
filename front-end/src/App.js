import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Game, Results, Statistics } from "./pages";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;
