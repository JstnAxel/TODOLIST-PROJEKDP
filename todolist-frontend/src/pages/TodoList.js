// src/pages/TodoList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TodoList({ todos, fetchTodos, deleteTodo, availableCategories }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleFilterCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Mengurutkan todos berdasarkan ID terbaru di atas
    const sortedTodos = [...todos].sort((a, b) => b.id - a.id);

    const filteredTodos = sortedTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.some(cat => todo.category.split(',').includes(cat)))
    );

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4">
                <Link to="/add" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    Add New Todo
                </Link>
            </div>

            {/* Filter Section */}
            <div className="bg-white shadow-md rounded p-6 mb-4">
                <input
                    type="text"
                    placeholder="Search Todo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="flex flex-wrap gap-2 mt-4">
                    {availableCategories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleFilterCategoryChange(category)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Todo List Section */}
            <div className="bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Todo List</h2>
                <div className="flex flex-wrap gap-4">
                    {filteredTodos.map((todo) => (
                        <div key={todo.id} className="bg-gray-100 p-4 rounded shadow hover:bg-gray-200 transition w-60">
                            <h3 className="text-xl font-semibold mb-2">{todo.title}</h3>
                            <p className="text-gray-700 mb-2">{todo.description}</p>
                            <div className="mb-2">
                                {todo.category.split(',').map((cat) => (
                                    <span key={cat} className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2">
                                <Link to={`/edit/${todo.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">
                                    Edit
                                </Link>
                                <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TodoList;
