import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./HeaderMyquizz";
import Footer from "../components/Footer";
import "../styles/myquizz.css";
import { getQuizzesHistory } from "../services/api";

function HistoryQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userId = localStorage.getItem("user_ID");
        if (!userId) return console.error("User ID not found");

        const res = await getQuizzesHistory(userId);
        setQuizzes(res.data.data || []);
      } catch (error) {
        console.error("Failed to load quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

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
        </div>

        <div className="quiz-list">
          {quizzes.length === 0 ? (
            <p>No quizzes found.</p>
          ) : (
            quizzes.map((quiz) => (
              <div key={quiz.quiz_id} className="quiz-item">
                <img
                  src={quiz.image || "/default-thumbnail.jpg"}
                  alt={quiz.quiz_title}
                  className="quiz-thumbnail"
                />
                <div className="quiz-details">
                  <h3>{quiz.quiz_title}</h3>
                  <p>
                    <span>Play Date: {quiz.play_date}</span>
                  </p>
                  <div className="quiz-actions">
                    <button
                      className="play-btn"
                      onClick={() => navigate(`/quiz-review/${quiz.quiz_id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HistoryQuizzes;
