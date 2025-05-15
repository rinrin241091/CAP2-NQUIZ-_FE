import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/GameRoom.css";
import socket from "../socket";

export default function GameRoom() {
  const { roomId } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState(null);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    socket.on("newQuestion", (data) => {
      setQuestion(data.question);
      setOptions(data.answers);
      setAnswered(false);
      setSelectedAnswerIndex(null);
      setSeconds(data.timer);
      setStartTime(Date.now());
    });

    socket.on("answerResult", (data) => {
      setScores(data.scores);
    });

    socket.on("gameOver", (data) => {
      setWinner(data.winner);
    });

    if (roomId) {
      socket.emit("getPlayers", roomId);
    }

    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("gameOver");
    };
  }, [roomId]);

  useEffect(() => {
    if (seconds === 0) return;
    const timerId = setInterval(() => {
      setSeconds((sec) => sec - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [seconds]);

  const handleAnswer = (index) => {
    if (answered) return;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setSelectedAnswerIndex(index);
    socket.emit("submitAnswer", roomId, index, timeTaken);
    setAnswered(true);
  };

  if (winner) {
    return <h1>🎉 Winner is {winner} 🎉</h1>;
  }

return (
  <div id="game-root">
    <p className="game-room-id">Room ID: {roomId}</p>
    <div className="game-quiz-div">
      <p className="game-remaining-time">⏳ Remaining Time: {seconds}s</p>
      <div className="game-question">
        <p className="game-question-text">{question}</p>
      </div>
      <ul className="game-ul">
        {options.map((answer, idx) => (
          <li key={idx} className="game-li">
            <button
              className={`game-options ${selectedAnswerIndex === idx ? "game-selected" : ""}`}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
            >
              {answer.text}
            </button>
          </li>
        ))}
      </ul>
      <div className="game-scores">
        {scores.map((player, idx) => (
          <p key={idx}>
            {player.name}: {player.score}
          </p>
        ))}
      </div>
    </div>
  </div>
);

}
