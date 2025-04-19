import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import {
  Home,
  Book,
  SportsEsports,
  Public,
  History,
  Language,
  Science,
  SportsSoccer,
  EmojiEvents,
  Search,
  Star,
} from '@mui/icons-material';
import '../styles/homepage.css';

const categories = [
  { icon: <Home />, label: 'Start', path: '/' },
  { icon: <Book />, label: 'Art & Literature', path: '/art-literature' },
  { icon: <SportsEsports />, label: 'Entertainment', path: '/entertainment' },
  { icon: <Public />, label: 'Geography', path: '/geography' },
  { icon: <History />, label: 'History', path: '/history' },
  { icon: <Language />, label: 'Languages', path: '/languages' },
  { icon: <Science />, label: 'Science & Nature', path: '/science' },
  { icon: <SportsSoccer />, label: 'Sports', path: '/sports' },
  { icon: <EmojiEvents />, label: 'Trivia', path: '/trivia' },
];

const HomePage = () => {
  const [gamePin, setGamePin] = useState('');
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="NQUIZ Logo" />
        </div>
        <div className="join-game">
          <TextField
            placeholder="Join Game? Enter PIN:"
            value={gamePin}
            onChange={(e) => setGamePin(e.target.value)}
            className="pin-input"
          />
          <Button variant="contained" color="primary" className="sign-in-btn">
            Sign in
          </Button>
        </div>
      </header>

      {/* Categories */}
      <nav className="categories">
        {categories.map((category, index) => (
          <Link to={category.path} key={index} className="category-item">
            <div className="category-icon">{category.icon}</div>
            <span>{category.label}</span>
          </Link>
        ))}
      </nav>

      {/* Main Features */}
      <Container className="main-features">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="feature-card create-quiz">
              <CardContent>
                <div className="feature-icon">
                  <img src="/create-quiz-icon.png" alt="Create Quiz" />
                </div>
                <div className="feature-content">
                  <Typography variant="h5">Create a quiz</Typography>
                  <Typography variant="body1">
                    Play for free with 300 participants
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/create-question')}
                  >
                    Quiz editor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="feature-card ai-quiz">
              <CardContent>
                <div className="feature-icon">
                  <img src="/ai-quiz-icon.png" alt="AI Quiz" />
                </div>
                <div className="feature-content">
                  <Typography variant="h5">A.I.</Typography>
                  <Typography variant="body1">
                    Generate a quiz from any subject or pdf
                  </Typography>
                  <Button variant="contained" color="secondary">
                    Quiz generator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Recently Published */}
      <section className="quiz-section">
        <Typography variant="h6" className="section-title">
          Recently published
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={item}>
              <Card className="quiz-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={`/quiz-thumb-${item}.jpg`}
                  alt={`Quiz ${item}`}
                />
                <CardContent>
                  <Typography variant="subtitle1">Breaking Cultural Stereotypes</Typography>
                  <div className="quiz-meta">
                    <div className="rating">
                      <Star className="star-icon" />
                      <span>4.5</span>
                    </div>
                    <Typography variant="caption">By Minhdu6789</Typography>
                  </div>
                  <Button variant="contained" className="play-btn">
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Popular AI Quizzes */}
      <section className="quiz-section">
        <Typography variant="h6" className="section-title">
          Popular quizzes created by AI
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={item}>
              <Card className="quiz-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={`/ai-quiz-thumb-${item}.jpg`}
                  alt={`AI Quiz ${item}`}
                />
                <CardContent>
                  <Typography variant="subtitle1">Breaking Cultural Stereotypes</Typography>
                  <div className="quiz-meta">
                    <div className="rating">
                      <Star className="star-icon" />
                      <span>4.5</span>
                    </div>
                    <Typography variant="caption">By Minhdu6789</Typography>
                  </div>
                  <Button variant="contained" className="play-btn">
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Vote Mode Banner */}
      <div className="vote-banner">
        <Typography variant="h5">Can't decide? Let players vote</Typography>
        <Button variant="contained" color="primary">
          Start vote mode
        </Button>
      </div>

      {/* Best Rating & Popular Now */}
      {['Best rating right now', 'Popular right now'].map((title) => (
        <section key={title} className="quiz-section">
          <Typography variant="h6" className="section-title">
            {title}
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={item}>
                <Card className="quiz-card">
                  <CardMedia
                    component="img"
                    height="140"
                    image={`/quiz-thumb-${item}.jpg`}
                    alt={`Quiz ${item}`}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">Baseball Trivia</Typography>
                    <div className="quiz-meta">
                      <div className="rating">
                        <Star className="star-icon" />
                        <span>4.7</span>
                      </div>
                      <Typography variant="caption">By Minhdu6789</Typography>
                    </div>
                    <Button variant="contained" className="play-btn">
                      Play Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>
      ))}

      {/* Random Selection */}
      <section className="quiz-section">
        <Typography variant="h6" className="section-title">
          Random selection
        </Typography>
        <Grid container spacing={2}>
          {['SAIGON', 'HANOI', 'DANANG', 'HAIPHONG', 'CANTHO', 'THANHHOA'].map((city, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card className="quiz-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={`/city-${city.toLowerCase()}.jpg`}
                  alt={city}
                />
                <CardContent>
                  <Typography variant="subtitle1">{city}</Typography>
                  <div className="quiz-meta">
                    <div className="rating">
                      <Star className="star-icon" />
                      <span>4.5</span>
                    </div>
                    <Typography variant="caption">By Minhdu6789</Typography>
                  </div>
                  <Button variant="contained" className="play-btn">
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="discord-section">
          <img src="/discord-banner.png" alt="Join our Discord" />
        </div>
        <Grid container spacing={4} className="footer-links">
          <Grid item xs={12} sm={3}>
            <div className="social-links">
              <IconButton><img src="/facebook-icon.png" alt="Facebook" /></IconButton>
              <IconButton><img src="/linkedin-icon.png" alt="LinkedIn" /></IconButton>
              <IconButton><img src="/youtube-icon.png" alt="YouTube" /></IconButton>
              <IconButton><img src="/instagram-icon.png" alt="Instagram" /></IconButton>
            </div>
          </Grid>
          {[1, 2, 3].map((col) => (
            <Grid item xs={12} sm={3} key={col}>
              <Typography variant="subtitle1">Topic</Typography>
              {['Page', 'Page', 'Page'].map((item, index) => (
                <Typography key={index} variant="body2">
                  <Link to="/" className="footer-link">
                    {item}
                  </Link>
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </footer>
    </div>
  );
};

export default HomePage; 