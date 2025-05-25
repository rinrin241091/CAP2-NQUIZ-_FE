import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQuizAttemptsByUserAndQuiz,
  getQuizReviewBySession
} from "../services/api";
import "../assets/styles/QuizResultView.css";

export default function QuizResultView() {
  const { quizId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getQuizAttemptsByUserAndQuiz(user.user_id, quizId);
        const sessionList = res.data?.data || [];
        console.log("📌 Danh sách session nhận từ API:", sessionList);
        setSessions(sessionList);
        if (sessionList.length > 0) {
          setSelectedSession(sessionList[0].session_id);
        }
      } catch (err) {
        console.error("❌ Không lấy được danh sách lần chơi:", err);
      }
    };

    if (user?.user_id && quizId) {
      fetchSessions();
    }
  }, [quizId, user?.user_id]);

  useEffect(() => {
    const fetchReview = async () => {
      if (!selectedSession) return;
      try {
        const res = await getQuizReviewBySession(
          Number(selectedSession),
          user.user_id
        );
        const result = res.data?.data || [];
        console.log("📥 Kết quả review:", result);
        setQuestions(result);
      } catch (err) {
        console.error("❌ Lỗi khi lấy dữ liệu review:", err);
        setQuestions([]);
      }
    };

    fetchReview();
  }, [selectedSession, user.user_id]);

  return (
    <div className="quiz-review-root">
      <h2 className="quiz-review-title">📄 Quiz Review</h2>

      {sessions.length > 1 && (
        <div className="session-select">
          <label>Chọn lần chơi: </label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(Number(e.target.value))}
          >
            {sessions.map((s) => (
              <option key={s.session_id} value={s.session_id}>
                {new Date(s.start_time).toLocaleString()} - Score: {s.score}
              </option>
            ))}
          </select>
        </div>
      )}

      {questions.length === 0 ? (
        <p className="quiz-review-no-data">Không có dữ liệu review</p>
      ) : (
        questions.map((q, idx) => (
          <div key={q.question_id} className="quiz-review-question">
            <p>
              <strong>Câu {idx + 1}:</strong> {q.question_text}
            </p>
            <ul className="quiz-review-ul">
              {q.answers.map((ans) => {
                let className = "quiz-review-option";
                const isUserAnswer = Number(ans.answer_id) === Number(q.user_answer_id);

                if (isUserAnswer && !ans.correct) {
                  className += " incorrect";
                } else if (ans.correct) {
                  className += " correct";
                }

                return (
                  <li key={ans.answer_id} className="quiz-review-li">
                    <button className={className} disabled>
                      {ans.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
