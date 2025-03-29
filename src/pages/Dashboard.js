import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NQuiz Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Welcome to NQuiz
              </Typography>
              <Typography variant="body1" paragraph>
                This is your dashboard where you can manage your quizzes and track your progress.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Create New Quiz
              </Typography>
              <Typography variant="body2" paragraph>
                Create a new quiz to test your knowledge or share with others.
              </Typography>
              <Button variant="contained" color="primary">
                Create Quiz
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                My Quizzes
              </Typography>
              <Typography variant="body2" paragraph>
                View and manage your existing quizzes.
              </Typography>
              <Button variant="contained" color="primary">
                View Quizzes
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Take a Quiz
              </Typography>
              <Typography variant="body2" paragraph>
                Browse and take quizzes created by other users.
              </Typography>
              <Button variant="contained" color="primary">
                Browse Quizzes
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                My Results
              </Typography>
              <Typography variant="body2" paragraph>
                View your quiz results and track your progress.
              </Typography>
              <Button variant="contained" color="primary">
                View Results
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 