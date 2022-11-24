import { Link } from "react-router-dom"
import styles from "../style/DashboardInfo.module.css"

export const DashboardInfo = () => {
    return (
        <div className={styles.mainDashboard}>
            <div className={styles.dashboardContent}>
                <h2>Employees Attendance</h2>
                <h1>Dashboard</h1>

                <div className={styles.presentDay}>
                    <h3 className={styles.todayPre}><Link>Today Presence</Link></h3>
                    <h3 className={styles.yesPre}><Link>Yesterday Presence</Link></h3>
                </div>

                <div className={styles.infoBox}>
                    <div className={styles.infoValue}>
                        <h1>1300</h1>
                        <h3>Attendance</h3>
                    </div>
                    <div className={styles.infoValue}>
                        <h1>900</h1>
                        <h3>On Time</h3>
                    </div>
                    <div className={styles.infoValue}>
                        <h1>400</h1>
                        <h3>Late</h3>
                    </div>
                    <div className={styles.infoValue}>
                        <h1>200</h1>
                        <h3>Absent</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}