import styles from "../style/DashboardSidebar.module.css"

export const DashboardSidebar = () => {

    let today = new Date();
    let month = today.toLocaleString('default', { month: 'long' });
    let year = today.getFullYear();
    let monthNum = today.getMonth();
    let dateNow = today.getDate();

    let dateMonth = [];
    let dateLast = [];
    let dateNext = [];
    let lastDate = new Date(year, monthNum + 1, 0).getDate();
    let firstDay = new Date(year, monthNum, 1).getDay();
    let datePrevMonth = new Date(year, monthNum, 0).getDate();
    let lastDayMonth = new Date(year, monthNum, lastDate).getDay();

    for(let i=firstDay; i>0; i--){
        let realDate = datePrevMonth - i + 1;
        dateLast.push(realDate); 
    }
        
    for(let i=1; i<=lastDate; i++){
        dateMonth.push(i); 
    }

    for(let i=lastDayMonth; i<6; i++){
        let realDate = i - lastDayMonth + 1;
        dateNext.push(realDate);
    }

    return(
        <div className={styles.dashboardSidebar}>
            <div className={styles.calendarInfo}>
                <h1>Calendar</h1>
                <h3>{month}, {year}</h3>

                <div className={styles.dateInfo}>
                    <ul className={styles.dayName}>
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul className={styles.dateNum}>
                        { dateLast.map((dateLast) => <li className={styles.inactiveDate}>{dateLast}</li>) }
                        {
                            dateMonth.map((dateMonth) => {
                                if(dateNow === dateMonth){
                                    return <li className={styles.activeDateToday}>{dateMonth}</li>
                                }
                                else{
                                    return <li className={styles.activeDate}>{dateMonth}</li>
                                }
                            })
                        }
                        { dateNext.map((dateNext) => <li className={styles.inactiveDate}>{dateNext}</li>) }
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