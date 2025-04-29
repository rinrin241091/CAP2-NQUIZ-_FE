import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosConfig';
import '../styles/CreateQuiz.css';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_public: true,
    category_id: 1
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/quizzes', formData);
      if (response.data) {
        navigate('/'); // Redirect to home page after successful creation
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-quiz-container">
      <h1>Tạo Quiz Mới</h1>
      <button
        style={{ marginBottom: '16px' }}
        onClick={() => navigate('/my-quizzes')}
        type="button"
      >
        Danh sách quiz
      </button>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Nhập tiêu đề quiz"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Nhập mô tả quiz"
          />
        </div>

        {/* <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="is_public"
              checked={formData.is_public}
              onChange={handleChange}
            />
            Công khai
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Danh mục:</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value={1}>Danh mục 1</option>
            <option value={2}>Danh mục 2</option>
            <option value={3}>Danh mục 3</option>
          </select>
        </div> */}

        <button type="submit" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Tạo Quiz'}
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;