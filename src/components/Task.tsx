import styles from './Task.module.css'

import { IoIosCheckmark } from "react-icons/io";
import { GoTrash } from "react-icons/go"
import { useState } from 'react';
import { ITask } from '../App';

interface TaskProps {
    data: ITask
    onDeleteTask: (id: string) => void;
    onToggleTask: ( id: string, checked: boolean ) => void;
}

export function Task({ data, onDeleteTask,  onToggleTask }: TaskProps) {
    const [isChecked, setIsChecked] = useState(Boolean)
    

    function handleDeleteTask() {
        onDeleteTask(data.id)
    }

    const toggleChecked = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onToggleTask( data.id,  newCheckedState);
    }

    const taskClassName = isChecked ?  `${styles.container} ${styles.completed}` : styles.container;
  
    
    return(
        <div className={taskClassName}>
            <div className={styles.checked}>
               <button  className={styles.circle} onClick={toggleChecked} ><IoIosCheckmark/></button>                   
            </div>
            <div className={styles.text}>
                <p>{data.content}</p>
            </div>
            <button className={styles.button} onClick={handleDeleteTask}><GoTrash/></button>
        </div>
    )
}