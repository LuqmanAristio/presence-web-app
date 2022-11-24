import styles from "../style/Example.module.css";
import { Sidebar } from "../component/Sidebar";
import { DashboardInfo } from "../component/DashboardInfo";
import { DashboardSidebar } from "../component/DashboardSidebar";

export const Dashboard = () =>{
    return (
        <div className={styles.mainContent}>
            <Sidebar></Sidebar>
            <div className={styles.contentMenu}>
                <DashboardInfo></DashboardInfo>
                <DashboardSidebar></DashboardSidebar>
            </div>
        </div>
    );
};