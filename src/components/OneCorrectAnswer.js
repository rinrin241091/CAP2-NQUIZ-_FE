// OneCorrectAnswer.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/OneCorrectAnswer.css";

export default function OneCorrectAnswer() {
  const navigate = useNavigate();

  return (
    <div className="one-correct-answer">
      {/* Header */}
      <div className="one-header">
        <div className="one-header-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <button className="btn-back-one" onClick={() => navigate("/quiz-editor")}>
            ← Back to Quiz
          </button>
        </div>
        <div className="one-header-right">
          <button className="btn-preview-one">Preview</button>
          <button className="btn-done-one">Done</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="one-main-content">
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
            <label className="label">Question</label>
            <textarea className="input" placeholder="Required" />
          </div>

          {/* Correct Answer */}
          <div className="one-form-group">
            <label className="label">Correct Answer</label>
            <input className="input" placeholder="Required" />
          </div>

          {/* False Answers */}
          <div className="one-form-group">
            <label className="label">False Answers</label>
            <input className="input" placeholder="Required" />
            <input className="input" placeholder="Optional" />
            <input className="input" placeholder="Optional" />
          </div>

          {/* Fun Fact */}
          <div className="one-form-group">
            <label className="label">Fun Fact</label>
            <input className="input" placeholder="Optional" />
            <div className="one-add-media">Add media to fun fact</div>
          </div>

          {/* Autocomplete */}
          <button className="one-autocomplete-ai">
            ⚡ Autocomplete with AI
          </button>

          {/* Options */}
          <div className="one-options-section">
            <select className="select">
              <option>Question voice: English (Charles)</option>
            </select>
            <select className="select">
              <option>Answer voice: English (Charles)</option>
            </select>
            <select className="select">
              <option>Question type: Buttons</option>
            </select>
            <select className="select">
              <option>Time: Normal time (20s)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="one-actions">
            <button className="btn-duplicate-one">Duplicate Slide</button>
            <button className="btn-delete-one">Delete Slide</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="one-footer">
        <button className="btn-settings-one">Settings</button>
        <button className="btn-add-slide-one">+</button>
      </div>
    </div>
  );
}
