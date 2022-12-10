import styles from "../style/Employees.module.css"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useUser } from "./UserContext";

export const DeleteBox = ({data, deleteForm}) =>{
    
    const currentUser = useUser();

    const handleSubmit = async e => {
        e.preventDefault();
        const serverURL = process.env.REACT_APP_SERVER_URL;
        await axios.delete(`${serverURL}/api/employees/${data.employeeId}`, {
            headers: {
                Authorization: `Bearer ${currentUser}`
            },
            validateStatus: () => true
        });
        deleteForm();
    }

    return(
        <div className={styles.deleteBox}>
            <div className={styles.dialogBox}>
                <FontAwesomeIcon icon={faTriangleExclamation} className={styles.warnIcon}/>
                <h1>Are you sure want to delete it?</h1>

                <div className={styles.answerOption}>

                    <form onSubmit={handleSubmit}>
                        <button className={styles.yesAnswer} type="submit">Yes</button>
                        <button className={styles.noAnswer} onClick={deleteForm}>No</button>
                    </form>

                </div>
            </div>
        </div>
    )
}