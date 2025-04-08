<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
// import SearchComponent from './components/SearchComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import SportsPage from './pages/SportsPage';

// Main App component
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports" element={<SportsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// HomePage component
function HomePage() {
  return (
    <>
      <Header />
      <Navigation />
      <main className="main-content">
        <HeroSection />
        <QuizSection title="Recently published" buttonText="Play Now" quizzes={recentlyPublishedQuizzes} />
        <QuizSection title="Popular among people for all" buttonText="Play Now" quizzes={popularAmongPeopleQuizzes} />
        <VoteSection />
        <QuizSection title="Best voting right now" buttonText="Play Now" quizzes={bestVotingQuizzes} />
        <QuizSection title="Random selection" buttonText="Play Now" quizzes={randomSelectionQuizzes} />
      </main>
      <Footer />
    </>
  );
}

// Header component
// function Header() {
//   return (
//     <header className="header">
//       <div className="top-bar">
//         <div className="home-nquiz">Home NQUIZ</div>
//       </div>
//       <div className="main-header">
//         <div className="logo">NQUIZ</div>
//         <SearchComponent />
//         <div className="header-buttons">
//           <button className="settings-btn">⚙️</button>
//           <button className="sign-in-btn">Sign In</button>
//         </div>
//       </div>
//     </header>
//   );
// }

// Navigation component
function Navigation() {
  const navigate = useNavigate();
  const navItems = [
    { icon: "🏠", label: "A to Z Quizzes" },
    { icon: "🏆", label: "Leaderboard" },
    { icon: "⭐", label: "Select a fix" },
    { icon: "🏠", label: "Home" },
    { icon: "🔍", label: "Lockscan" },
    { icon: "💰", label: "Balance & More" },
    { icon: "🎮", label: "Sports", path: "/sports" }
  ];

  return (
    <nav className="main-nav">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <div 
            key={index} 
            className="nav-item"
            onClick={() => item.path && navigate(item.path)}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-label">{item.label}</div>
          </div>
        ))}
      </div>
    </nav>
  );
}

// Hero section with two cards
function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-card create-quiz">
        <div className="hero-content">
          <img src="/create-quiz-character.png" alt="Character" className="hero-image" />
          <div className="hero-text">
            <h2>Create a quiz</h2>
            <p>Play for free with 500 participants</p>
            <button className="hero-btn">Create custom</button>
          </div>
        </div>
      </div>
      <div className="hero-card ai-quiz">
        <div className="hero-content">
          <img src="/ai-quiz-character.png" alt="AI Character" className="hero-image" />
          <div className="hero-text">
            <h2>A.I.</h2>
            <p>Generate a quiz from any subject or pdf</p>
            <button className="hero-btn">Quiz generator</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Quiz section component (reusable)
function QuizSection({ title, buttonText, quizzes }) {
  return (
    <section className="quiz-section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="quiz-grid">
        {quizzes.map((quiz, index) => (
          <QuizCard key={index} quiz={quiz} buttonText={buttonText} />
        ))}
      </div>
    </section>
  );
}

// Quiz card component
function QuizCard({ quiz, buttonText }) {
  return (
    <div className="quiz-card">
      <div className="quiz-image-container">
        <img src={quiz.image} alt={quiz.title} className="quiz-image" />
      </div>
      <div className="quiz-details">
        <button className="play-btn">{buttonText}</button>
        <h3 className="quiz-title">{quiz.title}</h3>
        <div className="quiz-meta">
          <span className="by-author">By {quiz.author}</span>
          <span className="participants">{quiz.participants} participants</span>
        </div>
      </div>
>>>>>>> bce984c (Upload Files)
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
// Vote section component
function VoteSection() {
  return (
    <section className="vote-section">
      <div className="vote-content">
        <h2>Can't decide? Let players vote</h2>
        <button className="vote-btn">Start vote mode</button>
      </div>
    </section>
  );
}

// Footer component
// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-top">
//         <div className="footer-logo">
//           <img src="/nquiz-logo-footer.png" alt="NQUIZ" />
//         </div>
//         <div className="footer-links">
//           <div className="footer-column">
//             <h3>Page</h3>
//             <ul>
//               <li><a href="#">Page</a></li>
//               <li><a href="#">Page</a></li>
//               <li><a href="#">Page</a></li>
//             </ul>
//           </div>
//           <div className="footer-column">
//             <h3>Page</h3>
//             <ul>
//               <li><a href="#">Page</a></li>
//               <li><a href="#">Page</a></li>
//               <li><a href="#">Page</a></li>
//             </ul>
//           </div>
//           <div className="footer-column">
//             <h3>Page</h3>
//             <ul>
//               <li><a href="#">Page</a></li>
//               <li><a href="#">Page</a></li>
//               <li><a href="#">Page</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <div className="social-links">
//           <a href="#" className="social-icon">FB</a>
//           <a href="#" className="social-icon">TW</a>
//           <a href="#" className="social-icon">IG</a>
//           <a href="#" className="social-icon">LI</a>
//         </div>
//       </div>
//     </footer>
//   );
// }

// Mock data for quizzes
const recentlyPublishedQuizzes = [
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-1.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-2.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-3.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-4.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-5.jpg" },
];

const popularAmongPeopleQuizzes = [
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-6.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-7.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-8.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-9.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-10.jpg" },
];

const bestVotingQuizzes = [
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-11.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-12.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-13.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-14.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-15.jpg" },
];

const randomSelectionQuizzes = [
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-16.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-17.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-18.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-19.jpg" },
  { title: "Sample Quiz Title", author: "Username", participants: "5K", image: "/quiz-image-20.jpg" },
];

export default App;
>>>>>>> bce984c (Upload Files)
