// src/components/Column.js
import React, { useState, useEffect } from 'react';
import Task from './Task';
import { fetchTasks, moveTask } from '../api';

const Column = ({ column }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(data => {
      const tasksInColumn = data.filter(task => task.column === column.id);
      setTasks(tasksInColumn);  // Устанавливаем задачи для этой колонки
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    });
  }, [column.id]);

  const handleTaskMove = async (taskId, order, columnId) => {
    try {
      // Перемещаем задачу
      await moveTask(taskId, order, columnId);

      // Обновляем задачи после перемещения
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          task.column = columnId;  // Перемещаем задачу в новую колонку
          task.order = order;      // Обновляем порядок задачи
        }
        return task;
      });

      // Обновляем состояние задач
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };

  return (
    <div className="column">
      <h3>{column.title}</h3>
      <div className="tasks">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <Task key={task.id} task={task} onMoveTask={handleTaskMove} />
          ))
        ) : (
          <p>No tasks in this column.</p>
        )}
      </div>
    </div>
  );
};

export default Column;
