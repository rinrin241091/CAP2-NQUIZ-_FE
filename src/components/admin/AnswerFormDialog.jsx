import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography
} from "@mui/material";

const AnswerFormDialog = ({ open, onClose, onSubmit, answer }) => {
  const [formData, setFormData] = useState({
    question_id: "",
    answer_text: "",
    is_correct: false,
  });

  useEffect(() => {
    if (answer) {
      setFormData({
        question_id: answer.question_id,
        answer_text: answer.answer_text,
        is_correct: !!answer.is_correct,
      });
    } else {
      setFormData({
        question_id: "",
        answer_text: "",
        is_correct: false,
      });
    }
  }, [answer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.answer_text || !formData.question_id) {
      alert("Vui lòng nhập đầy đủ Answer Text và Question ID.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{answer ? "Edit Answer" : "Add Answer"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Question ID"
          name="question_id"
          type="number"
          value={formData.question_id}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Answer Text"
          name="answer_text"
          value={formData.answer_text}
          onChange={handleChange}
          fullWidth
          multiline
        />
        <FormControlLabel
          control={
            <Checkbox
              name="is_correct"
              checked={formData.is_correct}
              onChange={handleChange}
            />
          }
          label="Is Correct?"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {answer ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnswerFormDialog;
