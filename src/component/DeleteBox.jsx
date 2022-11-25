import { Link } from "react-router-dom"
import styles from "../style/Employees.module.css"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DeleteBox = () =>{
    return(
        <div className={styles.deleteBox}>
            <div className={styles.dialogBox}>
                <FontAwesomeIcon icon={faTriangleExclamation} className={styles.warnIcon}/>
                <h1>Are you sure want to delete it?</h1>

                <div className={styles.answerOption}>
                    <Link className={styles.yesAnswer}>Yes</Link>
                    <Link className={styles.noAnswer}>No</Link>
                </div>
            </div>
        </div>
    )
}