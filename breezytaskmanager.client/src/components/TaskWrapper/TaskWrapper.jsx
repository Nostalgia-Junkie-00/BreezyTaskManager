import './TaskWrapper.css';
import TaskContainer from '../TaskContainer/TaskContainer'

const TaskWrapper = () => {
    
    return (
        <div className="taskWrapper flex-container">    
            <div className="dotted-outline flex-container">
                <h1>Task For The Day</h1>
                <TaskContainer />
            </div>
        </div>
    )
}

export default TaskWrapper;
