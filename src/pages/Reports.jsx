import styles from "../style/Example.module.css";
import { Sidebar } from "../component/Sidebar";
import { ReportInfo } from "../component/ReportInfo";

export const Reports = () =>{
    return (
        <div className={styles.mainContent}>
            <Sidebar></Sidebar>
            <div className={styles.contentMenu}>
                <ReportInfo />
            </div>
        </div>
    )
}