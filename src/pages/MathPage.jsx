import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./HeaderMyquizz";
import Footer from "../components/Footer";
import "../assets/styles/Entertainment.css";
import { getMath, getQuizzesSocket } from "../services/api";
import socket from "../socket";

function MathPage() {
  const [math, setMath] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.username || "Người chơi";

  useEffect(() => {
    const fetchMath = async () => {
      try {
        const res = await getMath(); // ✅ gọi hàm đúng cách
        setMath(res.data.data || []);
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      }
    };

    fetchMath();
  }, []);

const handlePlayNow = async (quizId) => {
  try {
    const res = await getQuizzesSocket(quizId); // quizId truyền từ quiz.quiz_id
    if (res.data.success && res.data.data.length > 0) {
      const questions = res.data.data;
      console.log("🧪 FE gửi questions vào socket:", questions);

      socket.emit("createRoom", name, quizId, questions);

      socket.once("roomCreated", (roomId) => {
        navigate(`/waiting-room/${roomId}`, {
          state: {
            quizId,
            isHost: true,
            playerName: name,
          },
        });
      });
    } else {
      alert("❌ Quiz này chưa có câu hỏi nào!");
    }
  } catch (err) {
    console.error("Lỗi khi lấy câu hỏi:", err);
    alert("❌ Lỗi khi tạo phòng chơi!");
  }
};


  return (
    <div className="category-page">
      <Header />
      <main className="main-content">
        <div className="category-header">
          <h1>Math Quizzes</h1>
          <div className="filter-dropdown">
            <label htmlFor="filter">Sort by:</label>
            <select id="filter" defaultValue="Best match">
              <option>Best match</option>
              <option>Most played</option>
              <option>Most liked</option>
              <option>Newest first</option>
              <option>Oldest first</option>
            </select>
          </div>
        </div>

        <div className="quiz-list">
          {math.map((quiz) => (
            <div key={quiz.quiz_id} className="quiz-item">
              <img
                src={quiz.image}
                alt={quiz.title}
                className="quiz-thumbnail"
              />
              <div className="quiz-details">
                <h3>{quiz.title}</h3>
                <p>
                  <span>Plays: {quiz.play_count}</span>
                </p>
                <div className="quiz-actions">
                  <button
                    className="play-btn"
                    onClick={() => handlePlayNow(quiz.quiz_id)}
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MathPage;
