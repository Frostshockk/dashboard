import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL твоего API Django

export const fetchColumns = async () => {
  try {
    const response = await axios.get(`${API_URL}/columns/`); // Запрос к API Django
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    console.error('Error fetching columns:', error);
    throw error; // Возвращаем ошибку в случае проблем с запросом
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/`);
    return response.data;  // Возвращаем данные задач
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/`, taskData);
    return response.data;  // Возвращаем данные новой задачи
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const moveTask = async (taskId, columnId, order) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/move/`, { column: columnId, order });
    return response.data;  // Возвращаем обновленные данные задачи
  } catch (error) {
    console.error('Error moving task:', error);
    throw error;
  }
};
