/* eslint-disable react/prop-types */
import Task from '../Task/Task';
import TaskForm from '../TaskForm/TaskForm';
import EditTaskForm from '../EditTaskForm/EditTaskForm';
import './TaskContainer.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
function TaskContainer() {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    const openCreateTask = () => {
        setIsEditing(false);
        setModal(!modal)

    }

    useEffect(() => {
        getTasks();
    }, []);

    //CREATE
    const createTask = async (data) => {
        try {
            const response = await fetch('http://localhost:5112/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            const createdTask = await response.json();
            console.log('New task created:', createdTask);

            setTasks([...tasks, createdTask]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    }
    //READ
    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:5112/api/task');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasksData = await response.json();
            console.log(tasksData);
            setTasks(tasksData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        } finally {
            setLoading(false);
        }
    }
    // UPDATE
    const updateTask = async (taskId, updatedTaskData) => {
        try {
            const response = await fetch(`http://localhost:5112/api/task/${taskId}`, {
                method: 'PUT', // or 'PATCH' depending on your API
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTaskData)
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            // Update the task in the tasks state
            setTasks(tasks.map(task => task.taskId === taskId ? { ...task, ...updatedTaskData } : task));

            console.log('Task updated successfully');

        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    }
    const updateCompletion = async (taskId, isCompleted) => {
        try {
            const response = await fetch(`http://localhost:5112/api/task/${taskId}/completion`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(isCompleted)
            });

            if (!response.ok) {
                throw new Error('Failed to update completion status');
            }
            const updatedTasks = tasks.map(task => {
                if (task.taskId === taskId) {
                    return { ...task, isCompleted: isCompleted };
                }
                return task;
            });
            setTasks(updatedTasks);
            console.log('Completion status updated successfully');
        } catch (error) {
            console.error('Error updating completion status:', error.message);
        }
    };
    //DELETE
    const deleteTask = async (taskId) => {
        try {
            console.log(taskId);
            const response = await fetch(`http://localhost:5112/api/task/${taskId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setTasks(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
                console.log('Task deleted successfully');
            } else if (response.status === 404) {
                console.error('Task not found');
            } else {
                console.error('Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    }
    
    const editTask = id => {
        setTasks(tasks.map(task => task.Id === id ? { ...task, isEditing: !task.isEditing } : task))
    }

    const openEditTaskForm = (taskId) => {
        const foundTask = tasks.find(task => task.taskId === taskId);
        setTaskToEdit(foundTask)
        setIsEditing(true);
        toggleModal();
        console.log(foundTask);
    }

    return (
        <>
            <div className='taskContainer'>
                {loading ?
                    (<div className="loading flex-container">
                        <h1>Loading...</h1>
                    </div>)
                    :
                    (<div>
                        {tasks.map((task, index) => <Task key={index} task={task} deleteTask={deleteTask} editTask={editTask} openEditTaskForm={openEditTaskForm} isEditing={isEditing} setIsEditing={setIsEditing} updateCompletion={updateCompletion} />)}
                    </div>)
                }
            </div>
            <div onClick={toggleModal} className='add-task flex-container'><FontAwesomeIcon icon={faPlus} size="lg" /></div>
            {modal && (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="modal-content flex-container">
                        {!isEditing ?
                            <>
                                <h2>New Task</h2>
                                <TaskForm toggleModal={toggleModal} tasks={tasks} setTasks={setTasks} createTask={createTask} isEditing={isEditing} setIsEditing={setIsEditing} />
                             </>
                            :
                            <>
                                <h2>Update Task</h2>
                                <EditTaskForm toggleModal={toggleModal} task={taskToEdit} tasks={tasks} setTasks={setTasks} updateTask={updateTask} isEditing={isEditing} setIsEditing={setIsEditing} />
                            </>
                        }
                        <button className="modal-close" onClick={openCreateTask}>Close</button>
                    </div>
                </div>)
            }
        </>
    )
}

export default TaskContainer;