import React, { useState, useEffect } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, IconButton, Button,
  TextField, Typography, useTheme, useMediaQuery
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import { toast } from "react-toastify";

import {
  adminGetAllQuizzes,
  adminCreateQuiz,
  adminUpdateQuizById,
  adminDeleteQuizById
} from "../../services/api";

import QuizFormDialog from "../../components/admin/QuizFormDialog";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";

const AdminQuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchQuizzes();
  }, [searchQuery]);

  const fetchQuizzes = async () => {
    try {
      const res = await adminGetAllQuizzes();
      console.log("📦 Full response from adminGetAllQuizzes:", res);
      console.log("📄 res.data:", res?.data);
      const data = Array.isArray(res?.data) ? res.data : [];

      const filtered = data.filter((quiz) =>
        (quiz.title || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setQuizzes(filtered);
    } catch (err) {
      console.error("❌ Fetch quiz failed:", err?.response || err);
      toast.error("Lỗi tải danh sách quiz");
      setQuizzes([]);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleOpenForm = (quiz = null) => {
    setSelectedQuiz(quiz);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedQuiz(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedQuiz) {
        await adminUpdateQuizById(selectedQuiz.quiz_id, data);
        toast.success("Cập nhật quiz thành công");
      } else {
        await adminCreateQuiz(data);
        toast.success("Tạo quiz thành công");
      }
      handleCloseForm();
      fetchQuizzes();
    } catch (err) {
      toast.error("Lỗi xử lý quiz");
    }
  };

  const handleDelete = async () => {
    try {
      await adminDeleteQuizById(selectedQuiz.quiz_id);
      toast.success("Xóa quiz thành công");
      setIsDeleteDialogOpen(false);
      fetchQuizzes();
    } catch (err) {
      toast.error("Không thể xóa quiz");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Quiz Management</Typography>
      </Box>

      <Paper sx={{ mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "action.active", mr: 1 }} />
              )
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Public</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(quizzes || []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No quizzes found
                  </TableCell>
                </TableRow>
              ) : (
                (quizzes || [])
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((quiz) => (
                    <TableRow key={quiz.quiz_id}>
                      <TableCell>{quiz.title}</TableCell>
                      <TableCell>{quiz.description}</TableCell>
                      <TableCell>{quiz.is_public ? "Yes" : "No"}</TableCell>
                      <TableCell>{quiz.creator_username}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenForm(quiz)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSelectedQuiz(quiz);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={(quizzes || []).length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
        />
      </Paper>

      <QuizFormDialog
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        quiz={selectedQuiz}
        fullScreen={fullScreen}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Quiz"
        content="Are you sure you want to delete this quiz? This action cannot be undone."
      />
    </Box>
  );
};

export default AdminQuizManagement;
