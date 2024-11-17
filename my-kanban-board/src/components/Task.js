// src/components/Task.js
import React from 'react';

const Task = ({ task, onMoveTask }) => {
  const handleMoveLeft = () => {
    // Перемещаем задачу в колонку слева
    if (task.column > 1) {
      onMoveTask(task.id, task.order, task.column - 1);
    }
  };

  const handleMoveRight = () => {
    // Перемещаем задачу в колонку справа
    onMoveTask(task.id, task.order, task.column + 1);
  };

  return (
    <div className="task">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={handleMoveLeft} disabled={task.column <= 1}>Move Left</button>
      <button onClick={handleMoveRight}>Move Right</button>
    </div>
  );
};

export default Task;
