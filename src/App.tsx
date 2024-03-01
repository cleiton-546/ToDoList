import styles from "./App.module.css"
import { Header } from "./components/Header"
import { Empty } from "./components/Empty"
import { Task } from "./components/Task";
import { FiPlusCircle } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid'
import './global.css';
import { useState } from "react";

export interface ITask {
  id: string
  content: string
  isCompleted: boolean
}

function App({}) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskContent, setNewTaskContent] = useState('')

  

  const checkedTaskCounter = tasks.reduce((prevValue, currentTask) => { 
    if(currentTask.isCompleted) {
      return prevValue + 1
    }

    return prevValue
 }, 0)


  function handleCreateNewTask() {
    if(!newTaskContent) {
      return
    }

    const newTask: ITask = {
      id: uuidv4(),
      content: newTaskContent,
      isCompleted: false
    }
   

    setTasks ((state) => [...state, newTask])
    setNewTaskContent('')
  }

  
  function deleteTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    
    if(!confirm("Quer mesmo apagar a tarefa?")) {  
      return
    }
    setTasks(filteredTasks)
  }


  function handleToggleTask( id: string, checked: boolean) {
    const updateTasks = tasks.map((task) => {
      if(task.id === id) {
        return  {...task, isCompleted: checked}
      }
      return {...task}
    })
    setTasks(updateTasks)
  }
  
   const isNewTaskEmpty = newTaskContent.length === 0;
  

  return (

     <div className={styles.container} >
       <Header/>

       <div className={styles.main}>

         <form  className={styles.form}>

          <input
           onChange={(e) => setNewTaskContent(e.target.value)}
           value={newTaskContent}
           />

          <button 
          disabled={isNewTaskEmpty} 
          onClick={handleCreateNewTask}
          type="submit">Criar <FiPlusCircle /></button>
      
         </form>

          <div className={styles.info}>   
           <div className={styles.contentInfo}>     
              <p>Tarefas criadas</p>      
              <span>{tasks.length}</span>      
            </div>    
             <div className={styles.contentInfo}>   
              <p className={styles.completed}>Concluídas</p>
              {tasks.some(task => task.isCompleted === true) ? (
                
              <div className={styles.checked}>
                <span>{checkedTaskCounter}</span>
                   <div>de</div>
                <span>{tasks.length}</span> 
              </div>                 
              ) : ( 
                <span>0</span> 
              )}   
            </div>                    
          </div>             

         
         {tasks.length === 0 && <Empty/>}

           
         {tasks.map(task => {
           return(<Task 
            key={task.id}
            onDeleteTask={deleteTask}
            onToggleTask={handleToggleTask}
            data={task} 
           />
           )
         })
         }
       </div> 
     </div>

  )
}

export default App
