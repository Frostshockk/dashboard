import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // URL твоего API Django

export const fetchColumns = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/columns/');
  if (!response.ok) throw new Error('Failed to fetch columns');
  return response.json();
};

export const fetchTasks = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/tasks/');
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const moveTask = async (taskId, order, columnId) => {
  const response = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/move/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      column_id: columnId,
      order: order,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to move task: ${response.statusText}`);
  }
  return response.json();
};

