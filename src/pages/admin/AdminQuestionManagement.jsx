import React, { useState, useEffect } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, IconButton, Button,
  TextField, Typography
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { toast } from "react-toastify";

import {
  adminGetAllQuestions,
  adminCreateQuestion,
  adminUpdateQuestionById,
  adminDeleteQuestionById
} from "../../services/api";

import QuestionFormDialog from "../../components/admin/QuestionFormDialog";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";

const AdminQuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [searchQuery]);

  const fetchQuestions = async () => {
    try {
      const res = await adminGetAllQuestions();
      const data = Array.isArray(res?.data) ? res.data : [];
      const filtered = data.filter((q) =>
        (q.question_text || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setQuestions(filtered);
    } catch (err) {
      toast.error("Lỗi tải danh sách câu hỏi");
    }
  };

  const handleOpenForm = (question = null) => {
    setSelectedQuestion(question);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedQuestion(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedQuestion) {
        await adminUpdateQuestionById(selectedQuestion.question_id, data);
        toast.success("Cập nhật câu hỏi thành công");
      } else {
        await adminCreateQuestion(data);
        toast.success("Tạo câu hỏi thành công");
      }
      handleCloseForm();
      fetchQuestions();
    } catch (err) {
      toast.error("Lỗi xử lý câu hỏi");
    }
  };

  const handleDelete = async () => {
    try {
      await adminDeleteQuestionById(selectedQuestion.question_id);
      toast.success("Xóa câu hỏi thành công");
      setIsDeleteDialogOpen(false);
      fetchQuestions();
    } catch (err) {
      toast.error("Không thể xóa câu hỏi");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Question Management</Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1 }} />
        }}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question Text</TableCell>
            <TableCell>Time Limit</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(questions || [])
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((q) => (
              <TableRow key={q.question_id}>
                <TableCell>{q.question_text}</TableCell>
                <TableCell>{q.time_limit}s</TableCell>
                <TableCell>{q.points}</TableCell>
                <TableCell>
                  {q.question_type_id === 1
                    ? "Single"
                    : q.question_type_id === 2
                    ? "Multiple"
                    : "Short"}
                </TableCell>
                <TableCell>{new Date(q.created_at).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenForm(q)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedQuestion(q);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>

        </Table>
        <TablePagination
          component="div"
          count={questions.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
        />
      </TableContainer>

      <QuestionFormDialog
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        question={selectedQuestion}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Question"
        content="Are you sure you want to delete this question?"
      />
    </Box>
  );
};

export default AdminQuestionManagement;
