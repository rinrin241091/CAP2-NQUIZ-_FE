import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';
import '../styles/MyQuizzes.css';

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axiosInstance.get('/quizzes/my-quizzes');
        console.log('API trả về:', res.data);
        setQuizzes(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        setError('Không thể tải danh sách quiz.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="my-quizzes-container">
      <h2 className="my-quizzes-title">Danh sách Quiz của bạn</h2>
      {quizzes.length === 0 ? (
        <div className="my-quizzes-empty">Bạn chưa có quiz nào.</div>
      ) : (
        <ul className="my-quizzes-list">
           {quizzes.map((quiz, idx) => (
              <li key={quiz.id} className="my-quizzes-item">
                <span className="my-quizzes-item-index">Quiz {idx + 1}:</span> <span className="my-quizzes-item-title">{quiz.title}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MyQuizzes; 