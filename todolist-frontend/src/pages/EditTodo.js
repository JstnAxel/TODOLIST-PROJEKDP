// src/pages/EditTodo.js
import React from 'react';
import EditTodoForm from '../components/EditTodoForm';
import { useParams, useNavigate } from 'react-router-dom';

function EditTodo({ todos, updateTodo, availableCategories, setNotification }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const todo = todos.find(todo => todo.id === parseInt(id, 10));

    if (!todo) {
        return <p>Todo not found</p>;
    }

    const handleUpdateTodo = async (updatedTodo) => {
        await updateTodo(updatedTodo);
        setNotification('Todo successfully updated!'); // Set notifikasi
        navigate('/'); // Arahkan kembali ke halaman utama
    };

    const cancelEdit = () => {
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <EditTodoForm todo={todo} updateTodo={handleUpdateTodo} cancelEdit={cancelEdit} availableCategories={availableCategories} />
        </div>
    );
}

export default EditTodo;
