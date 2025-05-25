import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/GameRoom.css";
import socket from "../socket";
import { saveGameResults } from "../services/api";

export default function GameRoom() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isHost = queryParams.get("isHost") === "true";

  const { roomId } = useParams();
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedMultiAnswers, setSelectedMultiAnswers] = useState([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [allAnswered, setAllAnswered] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [scores, setScores] = useState([]);
  const [finalScores, setFinalScores] = useState([]);
  const [winner, setWinner] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [shortAnswerText, setShortAnswerText] = useState("");
  const [allResponses, setAllResponses] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const quizId = state?.quizId || null;

  useEffect(() => {
    socket.on("newQuestion", (data) => {
      setQuestion(data.question);
      setOptions(data.answers);
      setQuestionType(data.question_type);
      setAnswered(false);
      setSelectedAnswerIndex(null);
      setSelectedMultiAnswers([]);
      setCorrectAnswerIndex(null);
      setCorrectAnswers([]);
      setAllAnswered(false);
      setSeconds(data.time_limit || data.timer || 10);
      setStartTime(Date.now());
      setIsPaused(false);
      setShortAnswerText("");
    });

    socket.on("answerResult", (data) => {
      setScores(data.scores);
      setCorrectAnswerIndex(data.correctAnswer);
      setCorrectAnswers(data.correctAnswers || []);
      setFinalScores((prev) => {
        const updated = [...prev];
        data.scores.forEach((newPlayer) => {
          const idx = updated.findIndex((p) => p.name === newPlayer.name);
          if (idx !== -1) {
            updated[idx].score = newPlayer.score;
          } else {
            updated.push({ name: newPlayer.name, score: newPlayer.score });
          }
        });
        return updated;
      });
      setAllAnswered(true);
      // ❌ BỎ reset lại trạng thái sau 3s – không cần thiết
    });

    socket.on("gameOver", async (data) => {
      setWinner(data.winner);
      setFinalScores(data.scores ?? finalScores);
      setIsPaused(true);
      try {
        await saveGameResults({
          quizId,
          hostId: user?.user_id,
          roomPin: roomId,
          players: data.scores.map((p) => ({ name: p.name, score: p.score })),
          responses: allResponses
        });
      } catch (err) {
        console.error("❌ Failed to save game results:", err);
      }
    });

    socket.on("gamePaused", () => setIsPaused(true));
    socket.on("gameResumed", () => {
      setIsPaused(false);
      setStartTime(Date.now());
    });

    if (roomId) {
      socket.emit("getPlayers", roomId);
      socket.emit("requestCurrentQuestion", roomId);
    }

    return () => {
      socket.off("newQuestion");
      socket.off("answerResult");
      socket.off("gameOver");
      socket.off("gamePaused");
      socket.off("gameResumed");
    };
  }, [roomId, finalScores, allResponses]);

  useEffect(() => {
    if (seconds === 0 || isPaused) return;
    const timerId = setInterval(() => setSeconds((sec) => sec - 1), 1000);
    return () => clearInterval(timerId);
  }, [seconds, isPaused]);

  const handleSingleChoice = (index) => {
    if (answered) return;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setSelectedAnswerIndex(index);
    setAnswered(true);
    setAllResponses((prev) => [
      ...prev,
      {
        playerName: user?.username,
        questionText: question,
        answerIndex: index,
        timeTaken
      }
    ]);
    socket.emit("submitAnswer", roomId, index, timeTaken);
  };

  const handleMultipleChoiceToggle = (index) => {
    if (answered) return;
    setSelectedMultiAnswers((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSubmitMultipleChoice = () => {
    if (answered || selectedMultiAnswers.length === 0) return;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setAnswered(true);
    setAllResponses((prev) => [
      ...prev,
      {
        playerName: user?.username,
        questionText: question,
        answerIndices: selectedMultiAnswers,
        timeTaken
      }
    ]);
    socket.emit("submitMultipleAnswers", roomId, selectedMultiAnswers, timeTaken);
  };

  const handleSubmitShortAnswer = () => {
    if (answered || !shortAnswerText.trim()) return;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setAnswered(true);
    setAllResponses((prev) => [
      ...prev,
      {
        playerName: user?.username,
        questionText: question,
        answerText: shortAnswerText.trim(),
        timeTaken
      }
    ]);
    socket.emit("submitShortAnswer", roomId, shortAnswerText.trim(), timeTaken);
  };

  const handleBackHome = () => navigate("/Home");

  const togglePause = () => {
    if (!isHost) return;
    socket.emit(isPaused ? "resumeGame" : "pauseGame", roomId);
    setIsPaused(!isPaused);
  };

  const renderOptions = () => {
    if (questionType === "Short Answer") {
      return (
        <div className="short-answer-input">
          <input
            type="text"
            value={shortAnswerText}
            onChange={(e) => setShortAnswerText(e.target.value)}
            placeholder="Enter your answer..."
            disabled={answered}
          />
          <button
            className="multi-submit-btn"
            onClick={handleSubmitShortAnswer}
            disabled={answered || !shortAnswerText.trim()}
          >
            Submit
          </button>
        </div>
      );
    }

    if (questionType === "Multiple Choice") {
      return (
        <>
          <ul className="game-ul">
            {options.map((answer, idx) => {
              let className = "game-options";
              if (correctAnswers.includes(idx)) className += " game-correct";
              if (selectedMultiAnswers.includes(idx)) className += " game-selected-highlight";
              return (
                <li key={idx} className="game-li">
                  <button
                    className={className}
                    onClick={() => handleMultipleChoiceToggle(idx)}
                    disabled={answered}
                  >
                    {answer.text}
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            className="multi-submit-btn"
            onClick={handleSubmitMultipleChoice}
            disabled={answered || selectedMultiAnswers.length === 0}
          >
            Submit Answer
          </button>
        </>
      );
    }

    return (
      <ul className="game-ul">
        {options.map((answer, idx) => {
          let className = "game-options";
          if (correctAnswerIndex === idx) className += " game-correct";
          if (selectedAnswerIndex === idx) className += " game-selected-highlight";
          return (
            <li key={idx} className="game-li">
              <button
                className={className}
                onClick={() => handleSingleChoice(idx)}
                disabled={answered}
              >
                {answer.text}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  if (winner) {
    return (
      <div id="game-root">
        <h1 className="winner">🎉 Winner is {winner} 🎉</h1>
        <div className="game-final-report">
          <h2>Final Scores</h2>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {finalScores.map((player, idx) => (
                <tr key={idx}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="back-home-btn" onClick={handleBackHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="game-root">
      <div className="game-quiz-div">
        <p className="game-remaining-time">⏳ Remaining Time: {seconds}s</p>
        {isHost && (
          <button className="pause-btn" onClick={togglePause}>
            {isPaused ? "▶️ Resume" : "⏸ Pause"}
          </button>
        )}
        <div className="game-question">
          <p className="game-question-text">{question}</p>
        </div>
        {renderOptions()}
        {/* <div className="game-scores">
          {scores.map((player, idx) => (
            <p key={idx}>
              {player.name}: {player.score}
            </p>
          ))}
        </div> */}
      </div>
    </div>
  );
}
