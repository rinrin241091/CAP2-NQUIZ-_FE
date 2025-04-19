import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SportsPage from "./pages/SportsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateQuestion from "./pages/CreateQuestion";

// Main App component
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-question" element={<CreateQuestion />} />
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
        <QuizSection
          title="Recently published"
          buttonText="Play Now"
          quizzes={recentlyPublishedQuizzes}
        />
        <QuizSection
          title="Popular among people for all"
          buttonText="Play Now"
          quizzes={popularAmongPeopleQuizzes}
        />
        <VoteSection />
        <QuizSection
          title="Best voting right now"
          buttonText="Play Now"
          quizzes={bestVotingQuizzes}
        />
        <QuizSection
          title="Random selection"
          buttonText="Play Now"
          quizzes={randomSelectionQuizzes}
        />
      </main>
      <Footer />
    </>
  );
}

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
    { icon: "🎮", label: "Sports", path: "/sports" },
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
  const navigate = useNavigate();
  
  return (
    <section className="hero-section">
      <div className="hero-card create-quiz">
        <div className="hero-content">
          <img
            src="/create-quiz-character.png"
            alt="Character"
            className="hero-image"
          />
          <div className="hero-text">
            <h2>Create a quiz</h2>
            <p>Play for free with 500 participants</p>
            <button 
              className="hero-btn"
              onClick={() => navigate('/create-question')}
            >
              Create custom
            </button>
          </div>
        </div>
      </div>
      <div className="hero-card ai-quiz">
        <div className="hero-content">
          <img
            src="/ai-quiz-character.png"
            alt="AI Character"
            className="hero-image"
          />
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
    </div>
  );
}

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

// Mock data for quizzes
const recentlyPublishedQuizzes = [
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-1.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-2.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-3.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-4.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-5.jpg",
  },
];

const popularAmongPeopleQuizzes = [
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-6.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-7.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-8.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-9.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-10.jpg",
  },
];

const bestVotingQuizzes = [
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-11.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-12.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-13.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-14.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-15.jpg",
  },
];

const randomSelectionQuizzes = [
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-16.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-17.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-18.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-19.jpg",
  },
  {
    title: "Sample Quiz Title",
    author: "Username",
    participants: "5K",
    image: "/quiz-image-20.jpg",
  },
];

export default App;
