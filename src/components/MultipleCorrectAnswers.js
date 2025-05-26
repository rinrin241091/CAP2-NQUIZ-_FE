// MultipleCorrectAnswers.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/MultipleCorrectAnswers.css";

export default function MultipleCorrectAnswers() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizId = location.state?.quizId;
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [funFact, setFunFact] = useState("");

  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index][field] = value;
    setAnswers(updatedAnswers);
  };

  return (
    <div className="multiple-correct-answers">
      {/* Header */}
      <div className="multiple-header">
        <div className="multiple-header-left">
          <h1>NQUIZ</h1>
          <button className="btn-back-multiple" onClick={() => navigate(`/quiz-editor/${quizId}`)}>
            ← Back to Quiz
          </button>
        </div>
        <div className="multiple-header-right">
          <button className="btn-preview-multiple">Preview</button>
          <button className="btn-done-multiple">Done</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="multiple-main-content">
        {/* Left - Media */}
        <div className="multiple-media-section">
          <div className="multiple-media-box">
            <button className="btn-add-media-multiple">Add Media</button>
            <button className="btn-generate-ai-multiple">⚡ Generate with AI</button>
          </div>
        </div>

        {/* Right - Form */}
        <div className="multiple-form-section">
          {/* Question */}
          <div className="multiple-form-group">
            <label className="label">Question</label>
            <textarea
              className="input"
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* Answers */}
          <div className="multiple-form-group">
            <label className="label">Answers</label>
            {answers.map((ans, index) => (
              <div key={index} className="answer-row">
                <input
                  type="checkbox"
                  checked={ans.isCorrect}
                  onChange={(e) =>
                    handleAnswerChange(index, "isCorrect", e.target.checked)
                  }
                />
                <input
                  type="text"
                  className="input answer-input"
                  placeholder={`Answer ${index + 1}`}
                  value={ans.text}
                  onChange={(e) =>
                    handleAnswerChange(index, "text", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* Fun Fact */}
          <div className="multiple-form-group">
            <label className="label">Fun Fact</label>
            <input
              className="input"
              placeholder="Optional fun fact"
              value={funFact}
              onChange={(e) => setFunFact(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="multiple-footer">     
      </div>
    </div>
  );
}
