// QuizEditorPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/styles/QuizEditorPage.css";
import axiosInstance from '../services/axiosConfig';
import { Edit, Trash } from "lucide-react";
import { deleteQuestionById, getQuestionById, updateQuestionById } from "../services/api";

export default function QuizEditorPage() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const [questionTypes, setQuestionTypes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [errorQuestions, setErrorQuestions] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const questionsPerPage = 10;
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

  const fetchQuestions = async () => {
    if (!quizId) {
      setLoadingQuestions(false);
      return;
    }
    setLoadingQuestions(true);
    setErrorQuestions('');
    try {
      const res = await axiosInstance.get(`/api/quizzes/${quizId}/questions`);
      setQuestions(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      setErrorQuestions('Không thể tải danh sách câu hỏi.');
      setQuestions([]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handleDeleteConfirmed = async () => {
    try {
      const response = await deleteQuestionById(selectedQuestionId);
      if (response.data?.success) {
        setQuestions(prev => prev.filter(q => q.question_id !== selectedQuestionId));
        toast.success("🗑️ Đã xóa câu hỏi thành công!");
      } else {
        toast.error("❌ Không thể xóa câu hỏi.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa câu hỏi:", error);
      toast.error("❌ Đã xảy ra lỗi khi xóa.");
    } finally {
      setShowConfirm(false);
      setSelectedQuestionId(null);
    }
  };

  const handleEdit = async (questionId) => {
    try {
      const res = await getQuestionById(questionId);
      if (res.data.question_type_id === 3 && (!res.data.answers || res.data.answers.length === 0)) {
        res.data.answers = [{ answer_text: "", is_correct: true }];
      }
      setEditFormData(res.data);
      setShowEditModal(true);
    } catch (err) {
      alert("Không thể tải dữ liệu câu hỏi để chỉnh sửa.");
    }
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
          <h1 className="logo-quiz-editor" onClick={() => navigate("/")}>NQUIZ</h1>
          <button className="btn-back-editor" onClick={() => navigate("/")}>← Back to Home</button>
        </div>
        <div className="quiz-editor-header-right">
          <button className="btn-done-editor">Done</button>
        </div>
      </div>

      <div className="quiz-main-content">
        <h1 className="quiz-editor-title">Chọn loại câu hỏi</h1>
        <div className="slide-types-grid">
          {questionTypes.map((type) => {
            const handleClick = () => {
              const routeMap = {
                1: "/one-correct-answer",
                2: "/multiple-correct-answers",
                3: "/short-answer"
              };
              const path = routeMap[type.question_type_id];
              if (path) {
                navigate(`${path}/${quizId}`, {
                  state: { quizId, questionTypeId: type.question_type_id }
                });
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
                  <Trash
                    className="icon delete-icon"
                    onClick={() => {
                      setSelectedQuestionId(question.question_id);
                      setShowConfirm(true);
                    }}
                  />
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

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Bạn có chắc chắn muốn xóa câu hỏi này?</p>
            <div className="modal-actions">
              <button onClick={handleDeleteConfirmed}>Xóa</button>
              <button onClick={() => setShowConfirm(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editFormData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Chỉnh sửa câu hỏi</h3>

            <label>Nội dung câu hỏi</label>
            <textarea
              className="full-width-input"
              value={editFormData.question_text}
              onChange={e => setEditFormData({ ...editFormData, question_text: e.target.value })}
            />

            <label>Thời gian (giây)</label>
            <input
              type="number"
              className="full-width-input"
              value={editFormData.time_limit}
              onChange={e => setEditFormData({ ...editFormData, time_limit: Number(e.target.value) })}
            />

            {editFormData.question_type_id === 3 ? (
              <>
                <label>Đáp án đúng (Trả lời ngắn)</label>
                <input
                  type="text"
                  className="full-width-input"
                  value={editFormData.answers?.[0]?.answer_text || ""}
                  onChange={e => {
                    const newAnswer = { answer_text: e.target.value, is_correct: true };
                    setEditFormData({ ...editFormData, answers: [newAnswer] });
                  }}
                />
              </>
            ) : (
              <>
                <label>Đáp án</label>
                {editFormData.answers.map((ans, idx) => (
                  <div key={idx} className="answer-row">
                    <input
                      type={editFormData.question_type_id === 2 ? "checkbox" : "radio"}
                      checked={ans.is_correct}
                      onChange={() => {
                        const updatedAnswers = editFormData.answers.map((a, i) => ({
                          ...a,
                          is_correct:
                            editFormData.question_type_id === 2
                              ? i === idx
                                ? !a.is_correct
                                : a.is_correct
                              : i === idx,
                        }));
                        setEditFormData({ ...editFormData, answers: updatedAnswers });
                      }}
                      className="answer-checkbox"
                    />
                    <input
                      type="text"
                      value={ans.answer_text}
                      onChange={e => {
                        const updatedAnswers = [...editFormData.answers];
                        updatedAnswers[idx].answer_text = e.target.value;
                        setEditFormData({ ...editFormData, answers: updatedAnswers });
                      }}
                      className="answer-input"
                    />
                    {editFormData.answers.length > 2 && (
                      <button
                        onClick={() => {
                          const updatedAnswers = editFormData.answers.filter((_, i) => i !== idx);
                          setEditFormData({ ...editFormData, answers: updatedAnswers });
                        }}
                        className="answer-delete"
                        title="Xóa đáp án"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}

                <button
                  className="add-answer-btn"
                  onClick={() => {
                    if (editFormData.answers.length < 6) {
                      const newAnswer = { answer_text: "", is_correct: false };
                      setEditFormData({
                        ...editFormData,
                        answers: [...editFormData.answers, newAnswer]
                      });
                    } else {
                      toast.warn("Chỉ được tối đa 6 đáp án");
                    }
                  }}
                  disabled={editFormData.answers.length >= 6}
                >
                  ➕ Thêm đáp án
                </button>
              </>
            )}

            <div className="modal-actions">
              <button
                onClick={async () => {
                  try {
                    await updateQuestionById(editFormData.question_id, {
                      ...editFormData,
                      time_limit: Number(editFormData.time_limit),
                      points: Number(editFormData.points),
                    });

                    toast.success("Cập nhật thành công!");
                    setShowEditModal(false);
                    setEditFormData(null);
                    fetchQuestions();
                  } catch {
                    toast.error("Lỗi khi cập nhật.");
                  }
                }}
              >
                Lưu
              </button>
              <button onClick={() => setShowEditModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}