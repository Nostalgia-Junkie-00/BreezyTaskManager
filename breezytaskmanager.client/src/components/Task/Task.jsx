/* eslint-disable react/prop-types */
import './Task.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faSquareCheck } from '@fortawesome/free-solid-svg-icons'

function Task({ task, deleteTask, openEditTaskForm, updateCompletion }) {
    const { taskId, name, dueDate, isCompleted } = task;

    const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return (
        <div className={`${task.isCompleted ? 'taskCompleted-container flex-container' : 'task-container flex-container'}`} key={taskId}>
            <div onClick={() => updateCompletion(taskId, !isCompleted) } className="task-checkbox flex-container">
                {isCompleted ? (<FontAwesomeIcon icon={faSquareCheck} size="xl" />) : (<div className="notComplete"></div>)}
            </div>
            <div className="task-texts flex-container">
                <h2>{name}</h2>
                <div className="task-subText flex-container">
                    <p>{formattedDate}</p>
                </div>
            </div>
            <div className="task-icons flex-container">
                <FontAwesomeIcon icon={faPenToSquare} size="xl" onClick={() => openEditTaskForm(taskId)} />
                <FontAwesomeIcon icon={faTrash} size="xl" onClick={() => deleteTask(taskId)} />
            </div>
        </div>
    )
}

export default Task;