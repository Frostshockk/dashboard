import React from 'react';
import './App.css';
import Board from './components/Board'; // Импорт компонента Board

function App() {
  return (
    <div className="App">
      <h1>Task Tree Manager</h1>
      <p>by Kirill Gorokhov!</p>
      <Board />
    </div>
  );
}

export default App;
