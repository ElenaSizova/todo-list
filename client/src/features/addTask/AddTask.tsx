import React, {useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {Status} from './AddTaskSlice'
import { createTask, createList } from '../../effects/todoListEffect';
import {RootState} from '../../app/store'
import styles from './AddTask.module.css'

const AddTask = ({listId}: {listId: string | undefined}) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();
    const status = useAppSelector((state: RootState) => state.ui.addTask.status);

    const onSubmit = ((e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (content === '') {
            setError('desciption is required');
            return;
        }

        listId ? dispatch(createTask({listId, content})) : dispatch(createList({content}));
        setContent('');
        setError('');
    });

    return (
        <form id='addTaskForm' onSubmit={onSubmit}>
            <div className={styles.root}>
                <div className={styles.content}>
                    <input type='text'
                        className={styles.input}
                        placeholder='What needs to be done?'
                        value={content}
                        name='item'
                        onChange={e => setContent(e.target.value)}
                        data-type="search-input"
                    />
                    <div className={styles.buttonWrapper}>
                        <button type='submit'
                                className={styles.button}
                                onClick={onSubmit}
                                data-type="submit-button">
                            { status === Status.Loading && `...`}
                            { (status === Status.Idle || status === Status.Failed) && `Add todo`}
                        </button>
                    </div>
                </div>
                {error && <div>{error}</div>}
            </div>
        </form>
    )
}

export default AddTask