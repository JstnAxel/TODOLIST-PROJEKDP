// src/EditTodoForm.js
import React, { useState, useEffect } from 'react';

function EditTodoForm({ todo, updateTodo, cancelEdit, availableCategories }) {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [categories, setCategories] = useState(todo.category ? todo.category.split(',') : []);

    useEffect(() => {
        setTitle(todo.title);
        setDescription(todo.description);
        setCategories(todo.category ? todo.category.split(',') : []);
    }, [todo]);

    const handleCategoryChange = (category) => {
        if (categories.includes(category)) {
            setCategories(categories.filter(cat => cat !== category));
        } else {
            setCategories([...categories, category]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo({ ...todo, title, description, categories });
    };

    return (
        <div className="bg-white shadow-md rounded p-6 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Todo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
                
                {/* Tag List for Categories */}
                <div className="flex flex-wrap gap-2">
                    {availableCategories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={category}
                                checked={categories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>

                <div className="flex space-x-2">
                    <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
                        Update Todo
                    </button>
                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" onClick={cancelEdit}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTodoForm;
