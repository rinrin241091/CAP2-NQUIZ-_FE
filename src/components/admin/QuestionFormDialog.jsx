import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material";

const QuestionFormDialog = ({ open, onClose, onSubmit, question, fullScreen }) => {
  const [formData, setFormData] = useState({
    question_text: "",
    time_limit: 30,
    points: 1,
    question_type_id: 1,
    quiz_id: ""
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (question) {
      setFormData({
        question_text: question.question_text || "",
        time_limit: question.time_limit || 30,
        points: question.points || 1,
        question_type_id: question.question_type_id || 1,
        quiz_id: question.quiz_id || ""
      });
    } else {
      setFormData({
        question_text: "",
        time_limit: 30,
        points: 1,
        question_type_id: 1,
        quiz_id: ""
      });
    }
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.question_text || !formData.quiz_id) return;
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen || isMobile} maxWidth="sm" fullWidth>
      <DialogTitle>{question ? "Edit Question" : "Create Question"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Question Text"
          name="question_text"
          value={formData.question_text}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Time Limit (seconds)"
          name="time_limit"
          type="number"
          value={formData.time_limit}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Points"
          name="points"
          type="number"
          value={formData.points}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Question Type"
          name="question_type_id"
          select
          value={formData.question_type_id}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={1}>Single Choice</MenuItem>
          <MenuItem value={2}>Multiple Choice</MenuItem>
          <MenuItem value={3}>Short Answer</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {question ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionFormDialog;
