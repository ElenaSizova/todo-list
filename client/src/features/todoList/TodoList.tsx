
import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getTasksByListId } from '../../effects/todoListEffect'
import { TaskId } from '../../entities/task/task'
import { selectTaskIds, getCountTasksLeft } from '../../entities/task/taskSelectors'
import { completeAllTasksListId } from '../../effects/todoListEffect'
import Task from '../task/Task'
import AddTask from '../addTask/AddTask'
import styles from './TodoList.module.css'
import { setListId } from './TodoListSlice'

// 63a1b9c3488e45f1843a75b0
const TodoList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const id = useAppSelector(state => state.ui.todoList.listId)
    const { listId } = useParams()

    useEffect(() => {
        if (listId) {
            dispatch(setListId(listId));
        }
    }, [dispatch, listId])

    useEffect(() => {
        if (id) {
            navigate(`/list/${id}`)
            dispatch(getTasksByListId({listId: id}));
        }
    }, [dispatch, navigate,  id])

    const onMarkAllCompleted = () => id ? dispatch(completeAllTasksListId({listId: id})) : () => {};

    const tasks = useAppSelector(selectTaskIds) as TaskId[];
    const taskLeft = useAppSelector(getCountTasksLeft);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                Todos
            </div>
            <div className={styles.add}>
                <AddTask listId={id} />
            </div>
            <div className={styles.tasks}>
                {tasks.map(taskId => (
                    <Task id = {taskId} key={taskId} />
                ))}
            </div>
            <div className={styles.footer}>
                <div>
                    {taskLeft > 1 && `${taskLeft} items left` }
                    {taskLeft === 1 && `1 item left` }
                </div>
                <div className={styles.complete} onClick={onMarkAllCompleted}>
                    {taskLeft > 0 && `Mark all as complete`}
                </div>
            </div>
        </div>
    )
}

export default TodoList;