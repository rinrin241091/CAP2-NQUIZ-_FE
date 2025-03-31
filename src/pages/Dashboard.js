import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Assessment,
  People,
  School,
  Timeline,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import api from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalQuizzes: 0,
    activeUsers: 0,
    completionRate: 0,
    studentGrowth: 0,
    quizGrowth: 0,
    userGrowth: 0,
    completionGrowth: 0
  });
  const [performanceData, setPerformanceData] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, performanceRes, activitiesRes] = await Promise.all([
          api.get('/api/dashboard/stats'),
          api.get('/api/dashboard/performance'),
          api.get('/api/dashboard/activities')
        ]);

        setStats(statsRes.data);
        setPerformanceData(performanceRes.data);
        setActivities(activitiesRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box className="loading-overlay">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="main-content">
      <Container maxWidth={false}>
        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <div className="stats-card">
              <div className="stats-icon primary">
                <School />
              </div>
              <Typography className="stats-label">Total Students</Typography>
              <Typography className="stats-value">{stats.totalStudents}</Typography>
              <div className={`stats-trend ${stats.studentGrowth >= 0 ? 'trend-up' : 'trend-down'}`}>
                {stats.studentGrowth >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                <span>{Math.abs(stats.studentGrowth)}% from last month</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="stats-card">
              <div className="stats-icon success">
                <Assessment />
              </div>
              <Typography className="stats-label">Total Quizzes</Typography>
              <Typography className="stats-value">{stats.totalQuizzes}</Typography>
              <div className={`stats-trend ${stats.quizGrowth >= 0 ? 'trend-up' : 'trend-down'}`}>
                {stats.quizGrowth >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                <span>{Math.abs(stats.quizGrowth)}% from last month</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="stats-card">
              <div className="stats-icon warning">
                <People />
              </div>
              <Typography className="stats-label">Active Users</Typography>
              <Typography className="stats-value">{stats.activeUsers}</Typography>
              <div className={`stats-trend ${stats.userGrowth >= 0 ? 'trend-up' : 'trend-down'}`}>
                {stats.userGrowth >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                <span>{Math.abs(stats.userGrowth)}% from last month</span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="stats-card">
              <div className="stats-icon danger">
                <Timeline />
              </div>
              <Typography className="stats-label">Quiz Completion Rate</Typography>
              <Typography className="stats-value">{stats.completionRate}%</Typography>
              <div className={`stats-trend ${stats.completionGrowth >= 0 ? 'trend-up' : 'trend-down'}`}>
                {stats.completionGrowth >= 0 ? <ArrowUpward /> : <ArrowDownward />}
                <span>{Math.abs(stats.completionGrowth)}% from last month</span>
              </div>
            </div>
          </Grid>
        </Grid>

        {/* Charts and Activities */}
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={8}>
            <div className="chart-container">
              <div className="chart-header">
                <Typography className="chart-title">Quiz Performance</Typography>
                <div className="chart-controls">
                  <button className="chart-control-btn active">7 Days</button>
                  <button className="chart-control-btn">30 Days</button>
                  <button className="chart-control-btn">3 Months</button>
                </div>
              </div>
              <Box height={300}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="quizzes" 
                      stroke="#1976d2" 
                      name="Total Quizzes"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completions" 
                      stroke="#2e7d32" 
                      name="Completions"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#ed6c02" 
                      name="Avg Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <div className="activities-list">
              <Typography variant="h6" className="chart-title" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {activities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <div className="activity-item">
                      <div className="activity-content">
                        <div>
                          <Typography className="activity-title">
                            {activity.description}
                          </Typography>
                          <Typography className="activity-time">
                            {activity.timeAgo}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    {index < activities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 