import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

// Функции для работы с колонками и задачами
export const fetchColumns = () => axios.get(`${API_URL}columns/`);
export const fetchTasks = () => axios.get(`${API_URL}tasks/`);
export const moveTask = (taskId, columnId, order) => axios.post(`${API_URL}tasks/${taskId}/move/`, { column: columnId, order });
export const createTask = (task) => axios.post(`${API_URL}tasks/`, task);
export const createColumn = (title) => axios.post(`${API_URL}columns/`, { title });
