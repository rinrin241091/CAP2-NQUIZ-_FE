import React, { useState } from "react";
import Header from "./HeaderMyquizz";
import Footer from "../components/Footer";
import "../styles/myquizz.css";

function MyQuizz() {
  const [showGame, setShowGame] = useState(false);

  // Giả lập dữ liệu quiz (bạn nên thay bằng dữ liệu thực)
  const entertainmentQuizzes = [
    {
      id: 1,
      title: "Guess the Movie",
      description: "Can you name these famous movies from one frame?",
      image: "/images/movie-quiz.jpg",
      plays: 1200,
      likes: 250,
      date: "2025-05-18",
    },
    {
      id: 2,
      title: "Pop Music Trivia",
      image: "/images/music-quiz.jpg",
      plays: 890,
      likes: 180,
      date: "2025-04-22",
    },
    {
      id: 3,
      title: "TV Show Quotes",
      image: "/images/tv-quiz.jpg",
      plays: 760,
      likes: 140,
      date: "2025-03-15",
    },
  ];

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
          {entertainmentQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-item">
              <img
                src={quiz.image}
                alt={quiz.title}
                className="quiz-thumbnail"
              />
              <div className="quiz-details">
                <h3>{quiz.title}</h3>
                <p>
                  <span>Plays: {quiz.plays}</span> |{" "}
                </p>
                <button
                  className="play-btn"
                  onClick={() => setShowGame(true)}
                >
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyQuizz;
