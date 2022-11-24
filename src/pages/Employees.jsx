import styles from "../style/Example.module.css";
import { Sidebar } from "../component/Sidebar"
import { EmployeesInfo } from "../component/EmployeesInfo";

export const Employees = () =>{
    return (
        <div className={styles.mainContent}>
            <Sidebar></Sidebar>
            <div className={styles.contentMenu}>
                <EmployeesInfo></EmployeesInfo>
            </div>
        </div>
    )
}