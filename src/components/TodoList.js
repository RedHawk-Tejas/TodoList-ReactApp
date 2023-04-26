import React, { useEffect, useState } from 'react';
import './TodoList.css'

function TodoList() {

    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        setTodos(storedTodos);
      }, []);
    
      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos])

    const handleAdd = () => {
        const updatedTodoList = {
            id: todos.length + 1,
            todos: inputValue
        };
        setTodos( (todos) =>  [...todos, updatedTodoList]);
        setInputValue('');
        
    }

    const handleDelete = (id) => {
        const updatedTodoList = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodoList)
    }

  return (
   <div className='container'>

        <h1>Todo List</h1>

        <div className="input_container">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={handleAdd}>Add</button>
        </div>

        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    {todo.todos}
                    <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>

   </div>
  )
}

export default TodoList