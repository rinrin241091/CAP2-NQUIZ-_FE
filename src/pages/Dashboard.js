import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Assessment, People, Timeline } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import HeaderDashboard from "./admin/HeaderDashboard";
import UserManagement from "../pages/admin/UserManagement";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

// Import API
import {
  getTotalUsers,
  getTotalQuizzes,
  getTotalPlays,
  getChartData,
} from "../services/api"; // Đảm bảo file này export đủ

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    totalPlays: 0,
  });
  const [performanceData, setPerformanceData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("7days");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/Home");
      return;
    }

    const fetchStatsAndChart = async () => {
      try {
        setLoading(true);
        const [usersRes, quizzesRes, playsRes] = await Promise.all([
          getTotalUsers(),
          getTotalQuizzes(),
          getTotalPlays(),
        ]);

        setStats({
          totalUsers: usersRes.data.totalUsers,
          totalQuizzes: quizzesRes.data.totalQuizzes,
          totalPlays: playsRes.data.totalPlays,
        });

        const chartRes = await getChartData(selectedRange);
        setPerformanceData(chartRes.data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatsAndChart();
  }, [navigate]);

  const handleRangeChange = async (range) => {
    setSelectedRange(range);
    try {
      const res = await getChartData(range);
      setPerformanceData(res.data);
    } catch (err) {
      console.error("Error loading chart data:", err);
    }
  };

  if (loading) {
    return (
      <Box className="loading-overlay">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="main-content-dashboard">
      <HeaderDashboard />
      <Container maxWidth={false}>
        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <div className="stats-card">
              <div className="stats-icon primary">
                <People />
              </div>
              <Typography className="stats-label">Total Users</Typography>
              <Typography className="stats-value">
                {stats.totalUsers}
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className="stats-card">
              <div className="stats-icon success">
                <Assessment />
              </div>
              <Typography className="stats-label">Total Quizzes</Typography>
              <Typography className="stats-value">
                {stats.totalQuizzes}
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className="stats-card">
              <div className="stats-icon warning">
                <Timeline />
              </div>
              <Typography className="stats-label">Total Plays</Typography>
              <Typography className="stats-value">
                {stats.totalPlays}
              </Typography>
            </div>
          </Grid>
        </Grid>

        {/* Chart Section */}
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <div className="chart-container">
              <div className="chart-header">
                <Typography className="chart-title">
                  Performance Overview
                </Typography>
                <div className="chart-controls">
                  <button
                    className={`chart-control-btn ${
                      selectedRange === "7days" ? "active" : ""
                    }`}
                    onClick={() => handleRangeChange("7days")}
                  >
                    7 Days
                  </button>
                  <button
                    className={`chart-control-btn ${
                      selectedRange === "30days" ? "active" : ""
                    }`}
                    onClick={() => handleRangeChange("30days")}
                  >
                    30 Days
                  </button>
                  <button
                    className={`chart-control-btn ${
                      selectedRange === "3months" ? "active" : ""
                    }`}
                    onClick={() => handleRangeChange("3months")}
                  >
                    3 Months
                  </button>
                </div>
              </div>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="totalUsers"
                      stroke="#8884d8"
                      name="Users"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalQuizzes"
                      stroke="#82ca9d"
                      name="Quizzes"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalPlays"
                      stroke="#ffc658"
                      name="Plays"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </div>
          </Grid>
        </Grid>

        {/* User Management */}
        <UserManagement />
      </Container>
    </Box>
  );
};

export default Dashboard;
