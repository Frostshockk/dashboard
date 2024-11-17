import React, { useState, useEffect } from 'react';
import Task from './Task';
import { fetchTasks } from '../api';

const Column = ({ column }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks().then(data => {
      const tasksInColumn = data.filter(task => task.column === column.id);
      setTasks(tasksInColumn);
      setLoading(false); // Завершаем загрузку
    }).catch(error => {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    });
  }, [column.id]);

  if (loading) {
    return <div>Loading tasks...</div>; // Индикатор загрузки
  }

  return (
    <div className="column">
      <h3>{column.title}</h3>
      <div className="tasks">
        {tasks.length > 0 ? (
          tasks.map(task => <Task key={task.id} task={task} />)
        ) : (
          <p>No tasks in this column.</p>
        )}
      </div>
    </div>
  );
};

export default Column;
