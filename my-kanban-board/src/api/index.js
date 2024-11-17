import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// Функции для работы с колонками и задачами
export const fetchColumns = () => axios.get(`${API_URL}columns/`);
export const fetchTasks = () => axios.get(`${API_URL}tasks/`);
export const createTask = (task) => axios.post(`${API_URL}tasks/`, task);
export const createColumn = (title) => axios.post(`${API_URL}columns/`, { title });

export const moveTask = async (taskId, order, columnId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tasks/${taskId}/move/`,
        {
          column_id: columnId,  // Новая колонка
          order: order          // Новый порядок
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to move task', error);
      throw new Error('Failed to move task');
    }
  };