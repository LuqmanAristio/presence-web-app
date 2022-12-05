import { Link } from "react-router-dom"
import styles from '../style/Navigation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";

import profilImg from "../image/profile.png"
import logo from "../image/presencelogo.png"
import dashboard from "../image/dashboard.png"
import dashboardActive from "../image/dashboard-active.png"
import employees from "../image/employee.png"
import employeesActive from "../image/employee-active.png"
import attendanceActive from "../image/attendance-active.png"
import attendance from "../image/attendance.png"
import report from "../image/report.png"
import reportActive from "../image/report-active.png"
import logout from "../image/logout.png"
import logoutActive from "../image/logout-active.png"
import { useUser } from "./UserContext"

export const Sidebar = () => {
    const currentUser = useUser();

    const { pathname } = useLocation();
    const currentLocation = pathname.slice(1);
    
    return(
        <div className={styles.sideBar}>
            <div className={styles.iconSidebar}>
                <img src={logo} alt="" />
                <h1>Presence</h1>
            </div>

            <div className={styles.navMenu}>
                <div className={currentLocation === "dashboard" ? styles.active : styles.inactiveMenu}>
                    <img src={currentLocation === "dashboard" ? dashboardActive : dashboard} alt="" />
                    <h3><Link to="/dashboard">Dashboard</Link></h3>
                </div>
                <div className={currentLocation === "employees" ? styles.active : styles.inactiveMenu}>
                    <img src={currentLocation === "employees" ? employeesActive : employees} alt="" />
                    <h3><Link to="/employees">Employees</Link></h3>
                </div>
                <div className={currentLocation === "attendance" ? styles.active : styles.inactiveMenu}>
                    <img src={currentLocation === "attendance" ? attendanceActive : attendance} alt="" />
                    <h3><Link to="/attendance">Attendance</Link></h3>
                </div>
                <div className={currentLocation === "reports" ? styles.active : styles.inactiveMenu}>
                    <img src={currentLocation === "reports" ? reportActive : report} alt="" />
                    <h3><Link to="/reports">Report</Link></h3>
                </div>
                <div className={currentLocation === "logout" ? styles.active : styles.inactiveMenu}>
                    <img src={currentLocation === "logout" ? logoutActive : logout} alt="" />
                    <h3><Link to="">Logout</Link></h3>
                </div>
                
            </div>
                        
            <div className={styles.profilePart}>
                <img src={profilImg} alt="adminImg"/>

                <div className={styles.profilAdmin}>
                    <h3>{currentUser.data.name}</h3>
                    <p>Admin</p>
                </div>

                <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon}/>
            </div>
    
        </div>
    )
}