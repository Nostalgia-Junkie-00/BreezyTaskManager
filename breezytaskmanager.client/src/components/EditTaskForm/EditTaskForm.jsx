import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './EditTaskForm.css'

const EditTaskForm = ({ toggleModal, task, updateTask }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Load task data into form fields when component mounts
    useEffect(() => {
        if (task) {
            setName(task.name);
            setDescription(task.description);
            // Extracting only the date part from the string
            const datePart = task.dueDate.split('T')[0];
            setDueDate(datePart);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !dueDate.trim()) {
            return;
        }

        const updatedTaskData = {
            name,
            description,
            dueDate,
            isCompleted: task.isCompleted 
        };

        updateTask(task.taskId, updatedTaskData);

        setName('');
        setDescription('');
        setDueDate('');
        toggleModal();
    }

    return (
        <form className="taskForm flex-container" onSubmit={handleSubmit}>
            <div className="task-add flex-container">
                <input type="text" className='task-name' placeholder='Task to complete?' value={name} onChange={(e) => setName(e.target.value)}></input>
                <button type='submit' className='task-btn'>Update</button>
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

EditTaskForm.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired,
};

export default EditTaskForm;
