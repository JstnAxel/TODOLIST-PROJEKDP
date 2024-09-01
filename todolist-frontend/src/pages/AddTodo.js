// src/pages/AddTodo.js
import React, { useState } from 'react';
import AddTodoForm from '../components/AddTodoForm';
import { useNavigate } from 'react-router-dom';

function AddTodo({ addTodo, availableCategories, setNotification }) {
    const navigate = useNavigate();

    const handleAddTodo = async (newTodo) => {
        await addTodo(newTodo);
        setNotification('Todo successfully added!'); // Set notifikasi
        navigate('/'); // Arahkan kembali ke halaman utama
    };

    return (
        <div>
            <AddTodoForm addTodo={handleAddTodo} availableCategories={availableCategories} />
        </div>
    );
}

export default AddTodo;
