// QuizEditorPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/QuizEditorPage.css";

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
} from "lucide-react";

const slideTypes = [
  { icon: <Square size={32} />, title: "Buttons", desc: "One correct answer" },
  {
    icon: <CheckSquare size={32} />,
    title: "Checkboxes",
    desc: "Multiple correct answers",
  },
  {
    icon: <ListOrdered size={32} />,
    title: "Reorder",
    desc: "Place answers in the correct order",
  },
  {
    icon: <Sliders size={32} />,
    title: "Range",
    desc: "Guess the answer on a scale",
  },
  {
    icon: <MapPin size={32} />,
    title: "Location",
    desc: "Pin the answer on a map",
  },
  {
    icon: <ImageIcon size={32} />,
    title: "Pinpoint",
    desc: "Pin the answer on an image",
  },
  {
    icon: <FileText size={32} />,
    title: "Type answer",
    desc: "Type the correct answer",
  },
  {
    icon: <Bot size={32} />,
    title: "AI assisted",
    desc: "Generate from a PDF",
  },
  {
    icon: <Info size={32} />,
    title: "Info slide",
    desc: "Provide more context",
  },
];

export default function QuizEditorPage() {
  const navigate = useNavigate();

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

  return (
    <div className="quiz-editor-container">
      <div className="quiz-editor-header">
        <div className="quiz-editor-header-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <button
            className="btn-back-editor"
            onClick={() => navigate("/create-quiz")}
          >
            ← Back to Create Quiz
          </button>
        </div>
        <div className="quiz-editor-header-right">
          <button className="btn-preview-editor">Preview</button>
          <button className="btn-done-editor">Done</button>
        </div>
      </div>

      <div className="quiz-main-content">
        <h1 className="quiz-editor-title">Add Slide</h1>

        <div className="slide-types-grid">
          {slideTypes.map((slide, index) => (
            <div
              key={index}
              className="slide-type-card"
              onClick={() => handleSlideClick(slide.title)}
            >
              <div className="slide-icon">{slide.icon}</div>
              <div>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-desc">{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="quiz-editor-footer">
        
        <button
          className="btn-settings-editor"
          type="button"
          onClick={() => navigate("/quiz-settings")}
        >
          Settings
        </button>

        <button className="btn-add-slide-editor">+</button>
      </div>
    </div>
  );
}
