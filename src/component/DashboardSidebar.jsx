import styles from "../style/DashboardSidebar.module.css"

export const DashboardSidebar = () => {

    let today = new Date();

    let month = today.toLocaleString('default', { month: 'long' });
    let year = today.getFullYear();

    return(
        <div className={styles.dashboardSidebar}>
            <div className={styles.calendarInfo}>
                <h1>Calendar</h1>
                <h3>{month}, {year}</h3>

                <div className={styles.dateInfo}>
                    <ul className={styles.dayName}>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                        <li>Sun</li>
                    </ul>
                    <ul className={styles.dateNum}>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>21</li>
                        <li>22</li>
                        <li>23</li>
                        <li>24</li>
                        <li>25</li>
                        <li>26</li>
                        <li>27</li>
                        <li>28</li>
                        <li>29</li>
                        <li>30</li>
                    </ul>
                </div>
            </div>
            
            <div className={styles.newPresent}>
                <h1>Recent Attendance</h1>

                <div className={styles.listAttendance}>
                    <div className={styles.timeAtt}>
                        <h3>08.00</h3>
                        <p>Mon</p>
                    </div>
                    <hr />
                    <div className={styles.nameAtt}>
                        <h3>Muhammad Luqman Aristio</h3>
                        <p>On Time</p>
                    </div>
                </div>

                <div className={styles.listAttendance}>
                    <div className={styles.timeAtt}>
                        <h3>08.00</h3>
                        <p>Mon</p>
                    </div>
                    <hr />
                    <div className={styles.nameAtt}>
                        <h3>Muhammad Luqman Aristio</h3>
                        <p>On Time</p>
                    </div>
                </div>

                <div className={styles.listAttendance}>
                    <div className={styles.timeAtt}>
                        <h3>08.00</h3>
                        <p>Mon</p>
                    </div>
                    <hr />
                    <div className={styles.nameAtt}>
                        <h3>Muhammad Luqman Aristio</h3>
                        <p>On Time</p>
                    </div>
                </div>

                <div className={styles.listAttendance}>
                    <div className={styles.timeAtt}>
                        <h3>08.00</h3>
                        <p>Mon</p>
                    </div>
                    <hr />
                    <div className={styles.nameAtt}>
                        <h3>Muhammad Luqman Aristio</h3>
                        <p>On Time</p>
                    </div>
                </div>  
            </div>

            <div className={styles.newAbsent}>

            </div>
        </div>
    )
};