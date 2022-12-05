import styles from "../style/Report.module.css"

export const ReportInfo = () =>{
    
    let today = new Date();
    let month = today.toLocaleString('default', { month: 'long' });
    let year = today.getFullYear();
    let dateNow = today.getDate();

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    return(
        <div className={styles.mainReport}>
            <div className={styles.reportContent}>
                <h1>Reports</h1>
                <h2>{formatAMPM(new Date())}, {dateNow} {month} {year}</h2>

                <div className={styles.containerReport}>
                    <div className={styles.leftReport}>
                        <h3>Today Absent Employees</h3>
                    </div>
                    <div className={styles.rightReport}>
                        <div className={styles.topReport}>
                            <div className={styles.topBox}>
                                <h3>Chart 1</h3>
                            </div>
                            <div className={styles.topBox}>
                                <h3>Chart 2</h3>
                            </div>
                        </div>
                        <div className={styles.botReport}>
                            <div className={styles.botBox}>
                                <h3>Download Today Report</h3>
                            </div>
                            <div className={styles.botBox}>
                                <h3>Download Weekly Report</h3>
                            </div>
                            <div className={styles.botBox}>
                                <h3>Download Monthly Report</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}