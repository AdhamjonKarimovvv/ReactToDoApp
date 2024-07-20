import { useState } from 'react';
import './App.css'; // Ensure the CSS file is correctly imported

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            const newTaskDetail = {
                text: newTask,
                completed: false
            };
            setTasks(t => [...t, newTaskDetail]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function toggleComplete(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return {...task, completed: !task.completed};
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) { 
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className='to-do-list'>
            <h1>To-Do-List</h1>
            <div>
                <input
                    type='text'
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange} />
                <button
                    className='add-button'
                    onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className={`text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
                        <button
                            className='delete-button'
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveTaskUp(index)}>
                            ⬆
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveTaskDown(index)}>
                            ⬇
                        </button>
                        <button
                            className={`complete-button ${task.completed ? 'green' : ''}`}
                            onClick={() => toggleComplete(index)}>
                            Completed
                        </button>
                    </li>
                )}
            </ol>
        </div>
    );
}

export default App;



