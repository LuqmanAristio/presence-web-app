import styles from "../style/Example.module.css";
import { Sidebar } from "../component/Sidebar"

export const Attendance = () =>{
    return (
        <div className={styles.mainContent}>
            <Sidebar></Sidebar>
            <div className={styles.contentMenu}>
                <h1>Attendance</h1>
            </div>
        </div>
    );
};