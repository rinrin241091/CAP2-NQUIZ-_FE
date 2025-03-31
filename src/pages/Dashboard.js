import React from 'react';
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
} from '@mui/material';
import {
  Assessment,
  People,
  School,
  Timeline,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Container maxWidth="lg">
        {/* Stats Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Students
                  </Typography>
                  <Typography variant="h4">2,500</Typography>
                </Box>
                <School sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <ArrowUpward sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="body2" color="success.main">
                  +15% from last month
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Quizzes
                  </Typography>
                  <Typography variant="h4">150</Typography>
                </Box>
                <Assessment sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <ArrowUpward sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="body2" color="success.main">
                  +20% from last month
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Active Users
                  </Typography>
                  <Typography variant="h4">1,200</Typography>
                </Box>
                <People sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <ArrowUpward sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="body2" color="success.main">
                  +10% from last month
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Quiz Completion Rate
                  </Typography>
                  <Typography variant="h4">85%</Typography>
                </Box>
                <Timeline sx={{ fontSize: 40, color: 'error.main' }} />
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <ArrowDownward sx={{ color: 'error.main', mr: 1 }} />
                <Typography variant="body2" color="error.main">
                  -5% from last month
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts and Lists */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader 
                title="Quiz Performance"
                subheader="Last 7 days"
                action={
                  <Box>
                    {/* Add chart controls here if needed */}
                  </Box>
                }
              />
              <CardContent>
                <Box height={300}>
                  {/* Add Chart Component here */}
                  <Typography variant="body2" color="textSecondary">
                    Chart will be implemented with recharts or chart.js
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader 
                title="Recent Activities"
                subheader="Latest updates"
              />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="New Quiz Created: Mathematics Basics"
                      secondary="2 hours ago"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Student Achievement: Perfect Score"
                      secondary="5 hours ago"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="New User Registration"
                      secondary="1 day ago"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText 
                      primary="Quiz Updated: Science Fundamentals"
                      secondary="2 days ago"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 