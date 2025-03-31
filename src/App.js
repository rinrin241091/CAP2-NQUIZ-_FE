import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RequireAuth, RequireAdmin, RequireUser } from './middleware/authMiddleware';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <RequireAdmin>
                <Dashboard />
              </RequireAdmin>
            } 
          />
          
          <Route 
            path="/home" 
            element={
              <RequireUser>
                <Home />
              </RequireUser>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } 
          />

          {/* Redirect root to appropriate page based on role */}
          <Route 
            path="/" 
            element={
              <RequireAuth>
                {localStorage.getItem('userRole') === 'admin' ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/home" />
                )}
              </RequireAuth>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 