import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
    const todos = useSelector((state) => state.todos.todos || []); // ✅ Ensure todos is an array

    const completedTodos = todos.filter((todo) => todo.completed === true).length; // ✅ Correct filtering

    return <h4 className='mt-3'>Total complete items: {completedTodos}</h4>;
};

export default TotalCompleteItems;
