// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './pages/TodoList';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';

function App() {
    const [todos, setTodos] = useState([]);
    const [notification, setNotification] = useState('');
    const availableCategories = ['Shopping', 'Work', 'Health', 'Leisure', 'Personal', 'Fitness', 'Important'];

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/todos');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (newTodo) => {
        try {
            const response = await fetch('http://localhost:8000/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newTodo.title,
                    description: newTodo.description,
                    category: newTodo.categories.join(',')
                }),
            });
            const addedTodo = await response.json();
            setTodos([...todos, addedTodo]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const updateTodo = async (updatedTodo) => {
        try {
            const response = await fetch(`http://localhost:8000/api/todos/${updatedTodo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updatedTodo.title,
                    description: updatedTodo.description,
                    category: updatedTodo.categories.join(',')
                }),
            });
            const updatedTodoData = await response.json();
            setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodoData : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/todos/${id}`, {
                method: 'DELETE',
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Menghapus notifikasi setelah beberapa detik
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 3000); // 3 detik
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <Router>
            <div className="App">
                {notification && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-md">
                        {notification}
                    </div>
                )}
                <Routes>
                    <Route path="/" element={<TodoList todos={todos} fetchTodos={fetchTodos} deleteTodo={deleteTodo} availableCategories={availableCategories} />} />
                    <Route path="/add" element={<AddTodo addTodo={addTodo} availableCategories={availableCategories} setNotification={setNotification} />} />
                    <Route path="/edit/:id" element={<EditTodo todos={todos} updateTodo={updateTodo} availableCategories={availableCategories} setNotification={setNotification} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
