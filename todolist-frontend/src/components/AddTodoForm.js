// src/AddTodoForm.js
import React, { useState } from 'react';

function AddTodoForm({ addTodo, availableCategories }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);

    const handleCategoryChange = (category) => {
        if (categories.includes(category)) {
            setCategories(categories.filter(cat => cat !== category));
        } else {
            setCategories([...categories, category]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ title, description, categories });
        setTitle('');
        setDescription('');
        setCategories([]);
    };

    return (
        <div className="bg-white shadow-md rounded p-6 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Todo</h2>
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

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    Add Todo
                </button>
            </form>
        </div>
    );
}

export default AddTodoForm;
