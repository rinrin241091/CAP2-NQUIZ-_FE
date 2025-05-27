// QuizEditorPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/styles/QuizEditorPage.css";
import axiosInstance from '../services/axiosConfig';

import {
  CheckSquare,
  Square,
  ListOrdered,
  Sliders,
  MapPin,
  Image as ImageIcon,
  FileText,
  Bot,
  Info,
  Edit,
  Trash,
} from "lucide-react";

export default function QuizEditorPage() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  console.log('QuizEditorPage - quizId:', quizId);

  const [questionTypes, setQuestionTypes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [errorQuestions, setErrorQuestions] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  // Calculate the current questions to display
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/question-types`);
        const data = await res.json();
        setQuestionTypes(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setQuestionTypes([]);
      }
    };
    fetchQuestionTypes();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) {
        setLoadingQuestions(false);
        return;
      }
      setLoadingQuestions(true);
      setErrorQuestions('');
      try {
        const res = await axiosInstance.get(`/api/quizzes/${quizId}/questions`);
        console.log('Questions API response:', res.data);
        setQuestions(Array.isArray(res.data) ? res.data : res.data?.data || []);
      } catch (err) {
        setErrorQuestions('Không thể tải danh sách câu hỏi.');
        setQuestions([]);
      } finally {
        setLoadingQuestions(false);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const handleSlideClick = (slideType) => {
    if (slideType === "Buttons") {
      if (window.location.pathname !== "/one-correct-answer") {
        navigate("/one-correct-answer");
      }
    } else if (slideType === "Checkboxes") {
      if (window.location.pathname !== "/multiple-correct-answers") {
        navigate("/multiple-correct-answers");
      }
    } else {
      alert(`Slide type "${slideType}" chưa được hỗ trợ.`);
    }
  };

  const handleEdit = (questionId) => {
    // Logic to edit the question
    console.log(`Edit question with ID: ${questionId}`);
  };

  const handleDelete = (questionId) => {
    // Logic to delete the question
    console.log(`Delete question with ID: ${questionId}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(questions.length / questionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="quiz-editor-container">
      <div className="quiz-editor-header">
        <div className="quiz-editor-header-left">
          <h1 className="logo" onClick={() => navigate("/")} >NQUIZ</h1>
          <button
            className="btn-back-editor"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
        <div className="quiz-editor-header-right">
          {/* <button className="btn-preview-editor">Preview</button> */}
          <button className="btn-done-editor">Done</button>
        </div>
      </div>

      <div className="quiz-main-content">
        <h1 className="quiz-editor-title">Chọn loại câu hỏi</h1>
        <div className="slide-types-grid">
          {questionTypes.map((type) => {
            const handleClick = () => {
              if (type.question_type_id === 1) {
                navigate(`/one-correct-answer/${quizId}`, { state: { quizId: quizId,questionTypeId: type.question_type_id } });
              } else if (type.question_type_id === 2) {
                navigate(`/multiple-correct-answers/${quizId}`, { state: { quizId: quizId, questionTypeId: type.question_type_id } });
              } else if (type.question_type_id === 3) {
                navigate(`/short-answer/${quizId}`, { state: { quizId: quizId, questionTypeId: type.question_type_id } });
              } else {
                alert('Chức năng này chưa hỗ trợ!');
              }
            };
            return (
              <div
                key={type.question_type_id}
                className="slide-type-card"
                onClick={handleClick}
              >
                <div className="slide-title">{type.name}</div>
                <div className="slide-desc">{type.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="existing-questions-section">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Câu hỏi hiện có</h2>
        {loadingQuestions ? (
          <div>Đang tải câu hỏi...</div>
        ) : errorQuestions ? (
          <div style={{ color: 'red' }}>{errorQuestions}</div>
        ) : currentQuestions.length === 0 ? (
          <div>Chưa có câu hỏi nào.</div>
        ) : (
          <ul>
            {currentQuestions.map(question => (
              <li key={question.question_id} className="question-item">
                <p><strong>{question.question_text}</strong></p>
                <div className="question-actions">
                  <Edit className="icon edit-icon" onClick={() => handleEdit(question.question_id)} />
                  <Trash className="icon delete-icon" onClick={() => handleDelete(question.question_id)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {questions.length > questionsPerPage && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Trước</button>
          <span>Trang {currentPage} / {Math.ceil(questions.length / questionsPerPage)}</span>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(questions.length / questionsPerPage)}>Sau</button>
        </div>
      )}

      {/* <div className="quiz-editor-footer">
        
        <button
          className="btn-settings-editor"
          type="button"
          onClick={() => navigate("/quiz-settings")}
        >
          Settings
        </button>

        <button className="btn-add-slide-editor">+</button>
      </div> */}
    </div>
  );
}
