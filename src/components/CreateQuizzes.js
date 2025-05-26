import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  CircularProgress,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../services/axiosConfig';
import '../styles/CreateQuiz.css';

const CreateQuiz = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_public: 1,
    category_id: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('is_public', formData.is_public);
    data.append('category_id', formData.category_id);

    if (imageFile) {
      data.append('image', imageFile);
    } else {
      // 👇 Fetch ảnh mặc định từ URL bên ngoài
      const defaultImageUrl = 'https://media.istockphoto.com/id/464516754/vi/vec-to/qu%E1%BB%91c-k%E1%BB%B3-vi%E1%BB%87t-nam.jpg?s=612x612&w=0&k=20&c=20_fpqn2SzR-BYCcTgc77EuiudsNnh1c0mVXVJzSNbk=';
      const response = await fetch(defaultImageUrl);
      const blob = await response.blob();
      const defaultFile = new File([blob], 'default.jpg', { type: blob.type });
      data.append('image', defaultFile);
    }

    const response = await axiosInstance.post('/api/quizzes', data);
    const quizId = response.data?.data?.id;

    if (quizId) {
      onClose(quizId);
    } else {
      setError('Tạo quiz thành công nhưng không nhận được ID');
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo quiz');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        const user_id = user ? user.id : null;
        if (!user_id) return;
        const res = await axiosInstance.get('/categories', {
          params: { user_id }
        });
        setCategories((res.data?.data && Array.isArray(res.data.data)) ? res.data.data : []);
      } catch (err) {
        console.error('Lỗi khi lấy danh mục:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !formData.category_id) {
      setFormData(prev => ({
        ...prev,
        category_id: categories[0].category_id
      }));
    }
  }, [categories]);

  return (
    <Dialog open={open} onClose={() => onClose(null)} maxWidth="sm" fullWidth>
      <DialogTitle>
        <span>Tạo Quiz Mới</span>
        <IconButton
          aria-label="close"
          onClick={() => onClose(null)}
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
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogContent dividers>
          {error && <Typography color="error">{error}</Typography>}

          <TextField
            label="Tiêu đề"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            label="Mô tả"
            name="description"
            fullWidth
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            required
            multiline
            rows={3}
          />

          <TextField
            select
            label="Danh mục"
            name="category_id"
            fullWidth
            value={formData.category_id}
            onChange={handleChange}
            margin="normal"
            required
          >
            {categories.map(cat => (
              <MenuItem key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </MenuItem>
            ))}
          </TextField>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onClose(null)} disabled={loading}>
            Hủy
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : 'Tạo Quiz'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateQuiz;
