import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./HeaderMyquizz";
import Footer from "../components/Footer";
import "../styles/myquizz.css";
import socket from "../socket";
import {
  getQuizzesSocket,
  getQuizzesByUser,
  deleteQuiz,
} from "../services/api";

function MyQuizz() {
  const [quizzes, setQuizzes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.username || "Người chơi";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userId = localStorage.getItem("user_ID");
        if (!userId) return console.error("User ID not found");

        const res = await getQuizzesByUser(userId);
        setQuizzes(res.data.data || []);
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

const handlePlayNow = async (quizId) => {
  try {
    const res = await getQuizzesSocket(quizId);
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


  const handleDelete = async (quizId) => {
    try {
      await deleteQuiz(quizId);
      setQuizzes((prev) => prev.filter((q) => q.quiz_id !== quizId));
    } catch (error) {
      console.error("Lỗi khi xóa quiz:", error);
    }
  };

  // const handleUpdate = async (quizId) => {
  //   try {
  //     await updateQuizTitleById(quizId, editedTitle);
  //     setQuizzes((prev) =>
  //       prev.map((quiz) =>
  //         quiz.quiz_id === quizId ? { ...quiz, title: editedTitle } : quiz
  //       )
  //     );
  //     setEditingId(null);
  //   } catch (error) {
  //     console.error("Lỗi khi cập nhật quiz:", error);
  //   }
  // };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content-homepage">
        <div className="category-header">
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
          <button class="add-quiz-btn">
            Add Quiz
          </button>

        </div>

        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <div key={quiz.quiz_id} className="quiz-item">
              <img
                src={quiz.image}
                alt={quiz.title}
                className="quiz-thumbnail"
              />
              <div className="quiz-details">
                {editingId === quiz.quiz_id ? (
                  <>
                    <input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    {/* <button onClick={() => handleUpdate(quiz.quiz_id)}> */}
                      <button>
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h3>{quiz.title}</h3>
                    <p>
                      <span>Plays: {quiz.play_count}</span> |{" "}
                      <span>{quiz.create_date}</span>
                    </p>
                    <div className="quiz-actions">
                      <button
                        className="play-btn"
                        onClick={() => handlePlayNow(quiz.quiz_id)}
                      >
                        Play Now
                      </button>
                      <button
                        className="update-btn"
                        onClick={() => {
                          setEditingId(quiz.quiz_id);
                          setEditedTitle(quiz.title);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          setSelectedQuizId(quiz.quiz_id);
                          setShowConfirm(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Confirm Delete Popup */}
        {showConfirm && (
          <div className="confirm-popup">
            <div className="confirm-box">
              <p>Bạn có chắc chắn muốn xóa quiz này không?</p>
              <div className="confirm-buttons">
                <button
                  onClick={() => {
                    handleDelete(selectedQuizId);
                    setShowConfirm(false);
                  }}
                >
                  Xác nhận
                </button>
                <button onClick={() => setShowConfirm(false)}>Hủy</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MyQuizz;
