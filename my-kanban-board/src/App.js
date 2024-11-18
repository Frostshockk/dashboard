import React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './components/Board';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>TaskBoard Manager</h1>
        <p>by Kirill Gorokhov!</p>
        <Board />
      </div>
    </DndProvider>
  );
}

export default App;
