import styles from "./Empty.module.css"
import clipBoard from '../assets/Clipboard.svg'


export function Empty() {
    return (
        <div>
            <div className={styles.empty}>
                <img src={clipBoard} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        </div>

    )
}