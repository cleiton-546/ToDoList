import styles from "./App.module.css"
import { Header } from "./components/Header"
import { Empty } from "./components/Empty"
import { Task } from "./components/Task";
import { FiPlusCircle } from "react-icons/fi";

import './global.css';
import { ChangeEvent, FormEvent, useState } from "react";




function App({}) {



  const [task, setTask] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("")
  const [completedTask, setCompletedTask] = useState<number>(0)


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTask ([...task, newTask])
    setNewTask('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
     setNewTask(event.target.value)
     
  }

  function deleteTask(taskToDelete: string){
    const taskWithoutDeleteOne = task.filter(task => {
        return task !== taskToDelete
    })
     setTask(taskWithoutDeleteOne)
  }


  function handleToggleTask( checked: boolean) {
    if(checked){
      setCompletedTask(prevCount => prevCount + 1)
    } else {
      setCompletedTask(prevCount => prevCount -1)
    }
  }

 
 

  const isNewTaskEmpty = newTask.length === 0;

  

  return (

     <div className={styles.container} >
       <Header/>

       <div className={styles.main}>

         <form onSubmit={handleCreateNewTask} className={styles.form}>

          <textarea
          value={newTask}
          onChange={handleNewTaskChange}
          name="Adicione uma tarefa"></textarea>

          <button 

          disabled={isNewTaskEmpty} 
          type="submit">Criar <FiPlusCircle /></button>
      
         </form>

          <div className={styles.info}>   
           <div className={styles.contentInfo}>     
              <p>Tarefas criadas</p>      
              <span>{task.length}</span>      
            </div>    
             <div className={styles.contentInfo}>   
              <p className={styles.completed}>Concluídas</p>     
              <span>{completedTask}</span>      
            </div>                    
          </div>             

         
         {task.length === 0 && <Empty/>}

           
         {task.map(task => {
           return(<Task 
            content={task}
            onDeleteTask={deleteTask}
            checked={false}
            onToggleTask={handleToggleTask}
          
           />
           )
         })
         }
        
       </div>
 
     </div>
    

  )
}

export default App
