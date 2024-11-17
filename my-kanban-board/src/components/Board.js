import React, { useEffect, useState } from 'react';
import Column from './Column';
import { fetchColumns } from '../api';

const Board = () => {
  const [columns, setColumns] = useState([]); // Состояние для колонок
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    // Загружаем колонки с сервера
    const loadColumns = async () => {
      try {
        const columnsData = await fetchColumns();
        setColumns(columnsData); // Сохраняем данные о колонках в состоянии
        setLoading(false); // Останавливаем индикатор загрузки
      } catch (error) {
        console.error('Error fetching columns:', error);
        setLoading(false);
      }
    };

    loadColumns();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Показываем индикатор загрузки
  }

  return (
    <div className="board">
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Board;
