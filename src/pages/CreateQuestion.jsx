import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionTypeSelector from '../components/QuestionTypeSelector';
import FileUpload from '../components/common/FileUpload';
import { createQuiz, createQuestion } from '../services/api';
import '../styles/CreateQuestion.css';

function CreateQuestion() {
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState('');
  const [questionType, setQuestionType] = useState('multiple_choice');
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [trueFalseAnswer, setTrueFalseAnswer] = useState(null);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [questionCount, setQuestionCount] = useState(1);

  // Xử lý khi người dùng chọn loại câu hỏi
  const handleSelectType = (type) => {
    setQuestionType(type);
    // Reset answers khi chuyển loại câu hỏi
    setAnswers([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
    if (type === 'true_false') {
      setTrueFalseAnswer(null);
    }
  };

  // Xử lý khi người dùng upload file
  const handleFileContentChange = (content) => {
    setQuestionText(content);
  };

  // Thêm đáp án mới
  const addAnswer = () => {
    if (answers.length < 4) {
      setAnswers([...answers, { text: '', isCorrect: false }]);
    }
  };

  // Xóa đáp án
  const removeAnswer = (index) => {
    if (answers.length > 2) {
      const newAnswers = answers.filter((_, i) => i !== index);
      // Đảm bảo luôn có ít nhất một đáp án đúng cho multiple choice
      if (questionType === 'multiple_choice' && !newAnswers.some(a => a.isCorrect)) {
        newAnswers[0].isCorrect = true;
      }
      setAnswers(newAnswers);
    }
  };

  // Cập nhật nội dung đáp án
  const updateAnswerText = (index, text) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
  };

  // Cập nhật đáp án đúng
  const updateCorrectAnswer = (index) => {
    const newAnswers = [...answers];
    if (questionType === 'multiple_choice') {
      // Multiple choice: chỉ cho phép chọn 1 đáp án đúng
      newAnswers.forEach((answer, i) => {
        answer.isCorrect = i === index;
      });
    } else {
      // Checkboxes: cho phép chọn nhiều đáp án đúng
      newAnswers[index].isCorrect = !newAnswers[index].isCorrect;
    }
    setAnswers(newAnswers);
  };

  // Tạo quiz mới
  const createNewQuiz = async () => {
    try {
      const quizData = {
        title: quizTitle || `Quiz ${new Date().toLocaleDateString()}`,
        description: '',
        creator_id: 1, // This should be replaced with actual user ID from auth context
        is_public: 1
      };

      const response = await createQuiz(quizData);
      setCurrentQuizId(response.data.quiz_id);
      return response.data.quiz_id;
    } catch (error) {
      console.error('Lỗi khi tạo quiz:', error);
      alert('Không thể tạo quiz mới: ' + error.message);
      return null;
    }
  };

  // Lưu câu hỏi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if ((questionType === 'multiple_choice' || questionType === 'checkboxes') && 
        !answers.some(answer => answer.isCorrect)) {
      alert('Vui lòng chọn ít nhất một đáp án đúng!');
      return;
    }

    if (!questionText.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    if (questionType !== 'true_false') {
      const emptyAnswers = answers.some(answer => !answer.text.trim());
      if (emptyAnswers) {
        alert('Vui lòng nhập nội dung cho tất cả các đáp án!');
        return;
      }
    }

    try {
      // Create quiz if not exists
      let quizId = currentQuizId;
      if (!quizId) {
        quizId = await createNewQuiz();
        if (!quizId) return;
      }

      // Prepare question data
      const questionData = {
        quiz_id: quizId,
        question_text: questionText.trim(),
        question_type: questionType,
        answers: questionType === 'multiple_choice' || questionType === 'checkboxes' ? 
          answers.map(answer => ({
            text: answer.text.trim(),
            isCorrect: answer.isCorrect
          })) : undefined,
        true_false_answer: questionType === 'true_false' ? trueFalseAnswer : undefined
      };

      // Create question
      await createQuestion(questionData);

      alert('Câu hỏi đã được lưu thành công!');
      
      // Reset form for next question
      setQuestionCount(prev => prev + 1);
      setQuestionText('');
      setAnswers([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ]);
      setTrueFalseAnswer(null);

    } catch (error) {
      console.error('Chi tiết lỗi:', error);
      alert(`Lỗi: ${error.message}`);
    }
  };

  return (
    <div className="create-question-page">
      <div className="sidebar">
        <QuestionTypeSelector onSelectType={handleSelectType} />
      </div>

      <div className="main-content">
        <div className="header">
          <button 
            className="done-btn"
            onClick={() => navigate('/quizzes')}
          >
            Done
          </button>
          <button className="preview-btn">Preview</button>
          <span className="question-counter">Câu hỏi #{questionCount}</span>
        </div>

        <form onSubmit={handleSubmit} className="question-form">
          {!currentQuizId && (
            <div className="form-group">
              <label>Tên Quiz:</label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Nhập tên quiz (không bắt buộc)"
                className="quiz-title-input"
              />
            </div>
          )}

          {/* Nhập câu hỏi */}
          <div className="form-group">
            <label>Nội dung câu hỏi:</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Nhập câu hỏi tại đây..."
              rows="4"
              required
            />
            <FileUpload onFileContentChange={handleFileContentChange} />
          </div>

          {/* Nhập đáp án (tùy loại câu hỏi) */}
          {(questionType === 'multiple_choice' || questionType === 'checkboxes') && (
            <div className="form-group">
              <label>
                Đáp án: 
                <span className="answer-hint">
                  {questionType === 'multiple_choice' 
                    ? ' (Chọn 1 đáp án đúng)' 
                    : ' (Có thể chọn nhiều đáp án đúng)'}
                </span>
              </label>
              {answers.map((answer, index) => (
                <div key={index} className="answer-item">
                  <input
                    type="text"
                    value={answer.text}
                    onChange={(e) => updateAnswerText(index, e.target.value)}
                    placeholder={`Đáp án ${index + 1}`}
                    required
                  />
                  <label>
                    <input
                      type={questionType === 'multiple_choice' ? 'radio' : 'checkbox'}
                      name={questionType === 'multiple_choice' ? 'correctAnswer' : `answer${index}`}
                      checked={answer.isCorrect}
                      onChange={() => updateCorrectAnswer(index)}
                    />
                    Đáp án đúng
                  </label>
                  {answers.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeAnswer(index)}
                      className="remove-answer-btn"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              ))}
              {answers.length < 4 && (
                <button type="button" onClick={addAnswer}>
                  Thêm đáp án
                </button>
              )}
            </div>
          )}

          {questionType === 'true_false' && (
            <div className="form-group">
              <label>Đáp án:</label>
              <label>
                <input
                  type="radio"
                  name="trueFalse"
                  value="true"
                  checked={trueFalseAnswer === 'true'}
                  onChange={() => setTrueFalseAnswer('true')}
                  required
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="trueFalse"
                  value="false"
                  checked={trueFalseAnswer === 'false'}
                  onChange={() => setTrueFalseAnswer('false')}
                  required
                />
                False
              </label>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {currentQuizId ? 'Lưu và Thêm Câu Hỏi Tiếp' : 'Tạo Quiz và Lưu Câu Hỏi'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuestion;