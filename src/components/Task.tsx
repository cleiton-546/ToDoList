import styles from './Task.module.css'

import { IoIosCheckmark } from "react-icons/io";
import { GoTrash } from "react-icons/go"
import { useState } from 'react';

interface TaskProps {
    content: string;
    onDeleteTask: (task: string) => void;
    checked: boolean;
}


export function Task({ content, onDeleteTask,  checked, }: TaskProps) {
    const [isChecked, setIsChecked] = useState(checked)

    function handleDeleteTask() {
        onDeleteTask(content)
    }

    const toggleChecked = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
    }

    const taskClassName = isChecked ?  `${styles.container} ${styles.completed}` : styles.container;
  
    
    return(
        <div className={taskClassName}>
            <div className={styles.checked}>
               <button  className={styles.circle} onClick={toggleChecked}><IoIosCheckmark/></button>                   
            </div>
            <div className={styles.text}>
                <p>{content}</p>
            </div>
            <button className={styles.button} onClick={handleDeleteTask}><GoTrash/></button>
        </div>
    )
}