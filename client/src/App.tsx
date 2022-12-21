import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import TodoList from './features/todoList/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TodoList/>} />
          <Route path="list/:listId" element={<TodoList/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
