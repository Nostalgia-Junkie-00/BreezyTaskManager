import { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css'

const TaskForm = ({ toggleModal, tasks, setTasks, createTask, setIsEditing }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !dueDate.trim()) {
            return;
        }

        const data = {
            name,
            description,
            dueDate,
            isCompleted: false
        };

        createTask(data);

        setName('');
        setDescription('');
        setDueDate('');
        setIsEditing(false);
        toggleModal();

        setTasks([...tasks, data]);
    }

    return (
        <form className="taskForm flex-container" onSubmit={handleSubmit} >
            <div className="task-add flex-container">
                <input type="text" className='task-name' placeholder='Task to complete?' value={name} onChange={(e) => setName(e.target.value)}></input>
                <button type='submit' className='task-btn'>Add Task</button>
            </div>
            <div className="task-date-time flex-container">
                <p className="task-date-label flex-container">Due Date</p>
                <input type="date" className="task-date-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div className="task-description-container flex-container">
                <p className="task-date-label">Description</p>
                <textarea className="task-description-info" placeholder="Enter a description here..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>  
        </form>
    )
}

TaskForm.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    setIsEditing: PropTypes.func.isRequired
};

export default TaskForm;