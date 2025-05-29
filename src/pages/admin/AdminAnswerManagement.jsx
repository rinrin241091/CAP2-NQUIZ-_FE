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
  adminGetAllAnswers,
  adminCreateAnswer,
  adminUpdateAnswerById,
  adminDeleteAnswerById
} from "../../services/api";

import AnswerFormDialog from "../../components/admin/AnswerFormDialog";
import DeleteConfirmDialog from "../../components/common/DeleteConfirmDialog";

const AdminAnswerManagement = () => {
  const [answers, setAnswers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchAnswers();
  }, [searchQuery]);

  const fetchAnswers = async () => {
    try {
      const res = await adminGetAllAnswers();
      const data = Array.isArray(res?.data) ? res.data : [];
      const filtered = data.filter((a) =>
        (a.answer_text || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setAnswers(filtered);
    } catch (err) {
      toast.error("Lỗi tải danh sách đáp án");
    }
  };

  const handleOpenForm = (answer = null) => {
    setSelectedAnswer(answer);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedAnswer(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedAnswer) {
        await adminUpdateAnswerById(selectedAnswer.answer_id, data);
        toast.success("Cập nhật đáp án thành công");
      } else {
        await adminCreateAnswer(data);
        toast.success("Tạo đáp án thành công");
      }
      handleCloseForm();
      fetchAnswers();
    } catch (err) {
      toast.error("Lỗi xử lý đáp án");
    }
  };

  const handleDelete = async () => {
    try {
      await adminDeleteAnswerById(selectedAnswer.answer_id);
      toast.success("Xóa đáp án thành công");
      setIsDeleteDialogOpen(false);
      fetchAnswers();
    } catch (err) {
      toast.error("Không thể xóa đáp án");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Answer Management</Typography>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search answers..."
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
              <TableCell>Answer Text</TableCell>
              <TableCell>Correct?</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(answers || [])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((a) => (
                <TableRow key={a.answer_id}>
                  <TableCell>{a.answer_text || <i>(Empty)</i>}</TableCell>
                  <TableCell>{a.is_correct ? "Yes" : "No"}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenForm(a)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedAnswer(a);
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
          count={answers.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
        />
      </TableContainer>

      <AnswerFormDialog
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        answer={selectedAnswer}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Answer"
        content="Are you sure you want to delete this answer? This action cannot be undone."
      />
    </Box>
  );
};

export default AdminAnswerManagement;
