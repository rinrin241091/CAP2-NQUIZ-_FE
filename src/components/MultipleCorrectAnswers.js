// OneCorrectAnswer.js
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../assets/styles/OneCorrectAnswer.css";
import axiosInstance from '../services/axiosConfig';

export default function OneCorrectAnswer() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { state } = useLocation();

  const questionTypeId = state?.questionTypeId;

  const [questionText, setQuestionText] = React.useState("");
  const [timeLimit, setTimeLimit] = React.useState(10);
  const [points, setPoints] = React.useState(1);
  const [answers, setAnswers] = React.useState([
    { answer_text: "", is_correct: true },
    { answer_text: "", is_correct: false },
    { answer_text: "", is_correct: false },
  ]);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [errorSubmit, setErrorSubmit] = React.useState('');

  const handleSubmitQuestion = async () => {
    setLoadingSubmit(true);
    setErrorSubmit('');

    const questionData = {
      quizId: quizId,
      questionTypeId: questionTypeId,
      questionText: questionText,
      timeLimit: timeLimit,
      points: points,
      answers: answers
    };

    console.log('Sending question data:', questionData);

    try {
      // Giả định endpoint để tạo câu hỏi là /api/questions
      const response = await axiosInstance.post('/api/questions', questionData);
      if (response.data) {
        // Thành công, quay lại trang editor hoặc làm gì đó khác
        navigate(`/quiz-editor/${quizId}`);
        // Có thể thêm thông báo thành công nếu cần
      }
    } catch (err) {
      setErrorSubmit(err.response?.data?.message || 'Có lỗi xảy ra khi tạo câu hỏi');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="one-correct-answer">
      {/* Header */}
      <div className="one-header">
        <div className="one-header-left">
          <h1>NQUIZ</h1>
          <button className="btn-back-one" onClick={() => navigate(`/quiz-editor/${quizId}`)}>
            ← Back to Quiz
          </button>
        </div>
        <div className="one-header-right">
          {/* <button className="btn-preview-one">Xem trước</button> */}
          <button
            className="btn-done-one"
            onClick={handleSubmitQuestion}
            disabled={loadingSubmit}
          >
            {loadingSubmit ? 'Đang lưu...' : 'Done'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="one-main-content">
        {/* Display submit error if any */}
        {errorSubmit && <div style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>{errorSubmit}</div>}

        {/* Left - Media Section */}
        <div className="one-media-section">
          <div className="one-media-box">
            <button className="btn-add-media-one">Add media</button>
            <button className="btn-generate-ai-one">⚡ Generate with AI</button>
          </div>
        </div>

        {/* Right - Form Section */}
        <div className="one-form-section">
          {/* Question */}
          <div className="one-form-group">
            <label className="label">Nội dung câu hỏi</label>
            <textarea
              className="input"
              placeholder="Nhập nội dung câu hỏi"
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
            />
          </div>
          {/* Time Limit */}
          <div className="one-form-group">
            <label className="label">Thời gian (giây)</label>
            <input
              className="input"
              type="number"
              min={5}
              max={300}
              value={timeLimit}
              onChange={e => setTimeLimit(Number(e.target.value))}
            />
          </div>
          {/* Points */}
          <div className="one-form-group">
            <label className="label">Điểm</label>
            <input
              className="input"
              type="number"
              min={1}
              max={100}
              value={points}
              onChange={e => setPoints(Number(e.target.value))}
            />
          </div>
          {/* Answers */}
          <div className="one-form-group">
            <label className="label">Đáp án</label>
            {answers.map((ans, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox" // ✅ Chỉnh từ radio sang checkbox
                  checked={ans.is_correct}
                  onChange={() =>
                    setAnswers(
                      answers.map((a, i) =>
                        i === idx ? { ...a, is_correct: !a.is_correct } : a
                      )
                    )
                  }
                  style={{ marginRight: 8 }}
                />
                <input
                  className="input"
                  placeholder={`Đáp án ${idx + 1}`}
                  value={ans.answer_text}
                  onChange={e =>
                    setAnswers(
                      answers.map((a, i) =>
                        i === idx ? { ...a, answer_text: e.target.value } : a
                      )
                    )
                  }
                  style={{ flex: 1 }}
                />
                {answers.length > 3 && (
                  <button
                    onClick={() => setAnswers(answers.filter((_, i) => i !== idx))}
                    style={{
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: 4,
                      cursor: 'pointer'
                    }}
                  >
                    Xóa
                  </button>
                )}
              </div>
            ))}

            {answers.length < 6 && (
              <button
                onClick={() =>
                  setAnswers([...answers, { answer_text: "", is_correct: false }])
                }
                style={{
                  marginTop: 8,
                  backgroundColor: '#2196f3',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                + Thêm đáp án
              </button>
            )}
          </div>          
        </div>
      </div>
    </div>
  );
}
