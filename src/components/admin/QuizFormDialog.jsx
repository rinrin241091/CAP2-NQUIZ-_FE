import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch
} from "@mui/material";

const QuizFormDialog = ({ open, onClose, onSubmit, quiz, fullScreen }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_public: true,
  });

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title || "",
        description: quiz.description || "",
        is_public: quiz.is_public || false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        is_public: true,
      });
    }
  }, [quiz]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) return;
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="sm" fullWidth>
      <DialogTitle>{quiz ? "Edit Quiz" : "Create New Quiz"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={3}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formData.is_public}
              onChange={handleChange}
              name="is_public"
              color="primary"
            />
          }
          label="Public Quiz"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {quiz ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizFormDialog;
