import styles from "../style/Example.module.css";
import { Sidebar } from "../component/Sidebar"
import { AttendanceChecker } from "../component/AttendanceChecker";

export const Attendance = () =>{
    return (
        <div className={styles.mainContent}>
            <Sidebar></Sidebar>
            <div className={styles.contentMenu}>
                <AttendanceChecker></AttendanceChecker>
            </div>
        </div>
    );
};