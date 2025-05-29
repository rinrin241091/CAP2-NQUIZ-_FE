import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete, Close } from '@mui/icons-material';
import axiosInstance from '../../services/axiosConfig';
import '../../assets/styles/CategoryManager.css';

const CategoryManager = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/categories');
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axiosInstance.post('/categories', { category_name: newCategory });
      setNewCategory('');
      fetchCategories();
      showSnackbar('Category added successfully!', 'success');
    } catch (err) {
      console.error('Failed to add category:', err);
      showSnackbar('Failed to add category.', 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      fetchCategories();
      showSnackbar('Category deleted successfully!', 'success');
    } catch (err) {
      console.error('Failed to delete category:', err);
      showSnackbar('Failed to delete category.', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (open) fetchCategories();
  }, [open]);

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Manage Categories
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#555',
              '&:hover': {
                color: '#d32f2f'
              }
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>Existing Categories</Typography>
          <ul className="category-list">
            {categories.map((cat) => (
              <li key={cat.category_id} className="category-item">
                <span>{cat.category_name}</span>
                <IconButton className="delete-icon" onClick={() => handleDeleteCategory(cat.category_id)} title="Delete">
                  <Delete />
                </IconButton>
              </li>
            ))}
          </ul>

          <Typography variant="subtitle1" style={{ marginTop: 20 }}>Add New Category</Typography>
          <TextField
            label="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            margin="normal"
            autoFocus
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} className="btn-cancel">Close</Button>
          <Button onClick={handleAddCategory} className="btn-create" disabled={!newCategory.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CategoryManager;
