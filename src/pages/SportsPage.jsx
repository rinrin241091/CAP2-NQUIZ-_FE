import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SportsQuizGame from '../components/SportsQuizGame';
import '../assets/styles/Sports.css';

function SportsPage() {
  const [showGame, setShowGame] = useState(false);
  const sportsQuizzes = [
    { 
      id: 1, 
      title: 'Name The Sports People', 
      plays: 1234, 
      likes: 567, 
      date: 'April 5, 2024',
      image: '/player1.jpg',
      description: 'Test your knowledge of famous sports personalities!'
    },
    { id: 2, title: 'Basketball Stars Challenge', plays: 2345, likes: 789, date: 'April 4, 2024' },
    { id: 3, title: 'Olympic Games History', plays: 3456, likes: 890, date: 'April 3, 2024' },
    { id: 4, title: 'Tennis Champions Quiz', plays: 4567, likes: 901, date: 'April 2, 2024' },
    { id: 5, title: 'Cricket World Cup Facts', plays: 5678, likes: 912, date: 'April 1, 2024' },
  ];

  if (showGame) {
    return (
      <div className="category-page">
        <Header />
        <main className="main-content">
          <div className="game-container">
            <button className="back-btn" onClick={() => setShowGame(false)}>
              ← Back to Quizzes
            </button>
            <SportsQuizGame />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="category-page">
      <Header />
      <main className="main-content">
        <div className="category-header">
          <h1>Sports Quizzes</h1>
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
        <div className="featured-quiz">
          <div className="featured-content">
            <img src={sportsQuizzes[0].image} alt={sportsQuizzes[0].title} className="featured-image" />
            <div className="featured-details">
              <h2>{sportsQuizzes[0].title}</h2>
              <p>{sportsQuizzes[0].description}</p>
              <button className="play-now-btn" onClick={() => setShowGame(true)}>
                Play Now
              </button>
            </div>
          </div>
        </div>
        <div className="quiz-list">
          {sportsQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-item">
              <img src={quiz.image} alt={quiz.title} className="quiz-thumbnail" />
              <div className="quiz-details">
                <h3>{quiz.title}</h3>
                <p>
                  <span>Plays: {quiz.plays}</span> | <span>Likes: {quiz.likes}</span> | <span>{quiz.date}</span>
                </p>
                <button className="play-btn" onClick={() => setShowGame(true)}>
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

export default SportsPage; 