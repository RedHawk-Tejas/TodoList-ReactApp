import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    if(!newTodo.trim()){
        return;
    }
    const newTodoItem = {
      id: todos.length + 1,
      text: newTodo,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    localStorage.setItem('todos', JSON.stringify([...todos, newTodoItem]));
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className='container'>
      <h1>Todo List</h1>

      <div className="input_container">

        <input
          type="text"
          placeholder="Enter new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <button onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <ul className="list-group">

        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.text}
            <button
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}

      </ul>

    </div>
  );
};

export default TodoList;
