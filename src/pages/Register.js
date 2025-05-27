import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import {sendOtpRegister, register} from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Please enter your email before requesting OTP.");
      return;
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(formData.email)) {
      setError("Email must be a valid Gmail address");
      return;
    }

    try {
      setError("");
      setSendingOtp(true);
      await sendOtpRegister(formData.email);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    try {
      const registerData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        otp,
      };
      await register(registerData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
            <Typography variant="h4" gutterBottom>
              Welcome to NQuiz
            </Typography>
            <Typography variant="body1" paragraph>
              Join NQuiz today and start creating engaging quizzes for your
              students.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Benefits of using NQuiz:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1">
                Easy quiz creation and management
              </Typography>
              <Typography component="li" variant="body1">
                Real-time student progress tracking
              </Typography>
              <Typography component="li" variant="body1">
                Detailed analytics and reporting
              </Typography>
              <Typography component="li" variant="body1">
                Secure and reliable platform
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Button
                  variant="outlined"
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  sx={{ mt: 1.5, height: "56px" }}
                >
                  {sendingOtp ? "Sending..." : "Send OTP"}
                </Button>
              </Box>

              {otpSent && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                Register
              </Button>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?
                </Typography>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  Sign in
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Copyright NQuiz © 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
