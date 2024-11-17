// src/components/Board.js
import React, { useState, useEffect } from 'react';
import Column from './Column';
import { fetchColumns } from '../api';

const Board = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchColumns().then(data => {
      setColumns(data);  // Обновляем состояние колонок
    }).catch(error => {
      console.error('Error fetching columns:', error);
    });
  }, []);

  return (
    <div className="board">
      {columns.map(column => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Board;
