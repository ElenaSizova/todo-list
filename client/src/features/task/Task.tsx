
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateTask } from '../../effects/todoListEffect'
import { TaskId } from '../../entities/task/task'
import { selectTaskById } from '../../entities/task/taskSelectors'
import styles from './Task.module.css'

type Props = {
    id: TaskId
}

const Task = ({id}: Props) => {

    const dispatch = useAppDispatch();
    const task = useAppSelector(state => selectTaskById(state, id));

    if (!task) return (<div/>);

    const onCheck = () => dispatch(updateTask({taskId: task.id, isCompleted: !task.isCompleted}));

    return (
        <div className={styles.root} onClick={onCheck}>
            <div> 
                <input type="checkbox" checked={task.isCompleted} readOnly />
            </div>
            <div className={styles.content}>{task.content}</div>
        </div>
    )

}

export default Task;