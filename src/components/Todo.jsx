import React, { useState } from 'react';
import './Todo.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setNewTask(tasks[index].text);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setNewTask('');
      setIsEditing(false);
      setCurrentTaskIndex(null);
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((task, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo">
      <h1>TODO LIST</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={isEditing ? updateTask : addTask}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleCompletion(index)}>{task.text}</span>
            <button onClick={() => editTask(index)}>Update</button>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
