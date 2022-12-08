import styles from "../style/Report.module.css"
import icon from "../image/profile.png"
import axios from "axios"
import { useState, useEffect } from "react"
import { useUser } from "./UserContext"
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ReportInfo = () =>{

    const currentUser = useUser();
    const [attendance, setAttendance] = useState([]);
    const [loadingStatus, setLoading] = useState(true);
    const [loadingPercent, setPercent] = useState(true);
    const [widthValueOntime, setWidthValueOntime] = useState(0);
    const [widthValueLate, setWidthValueLate] = useState(0);
    
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

    async function fetchData() {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/attendances`, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        else {
            setAttendance(response.data);
            setLoading(false);
        }
    }

    async function fetchInfo() {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/attendances/info`, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        else {
            setWidthValueOntime(response.data.ontimePercentage.toPrecision(2));
            setWidthValueLate(response.data.latePercentage.toPrecision(2));
            setPercent(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    useEffect(() => {
        fetchInfo();
    }, [currentUser]);

    function filterByStatus(obj) {
        if (obj.status === 'late') 
        {
          return true
        } 
        return false;
      }
        
    let arrayByStatus = attendance.filter(filterByStatus);

    const timeFormat = (timeReal) =>{
        const time = new Date(timeReal)
        const hour = time.getHours();
        const minutes = time.getMinutes();

        const waktu = hour.toString() + ":" + minutes.toString();
        
        return waktu;
    }

    return(
        <div className={styles.mainReport}>
            <div className={styles.reportContent}>
                <h1>Reports</h1>
                <h2>{formatAMPM(new Date())}, {dateNow} {month} {year}</h2>

                <div className={styles.containerReport}>
                    <div className={styles.leftReport}>
                        <h3>Today Late Employees</h3>

                            {loadingStatus && 
                                <div className={styles.loadingBox}>
                                    <div className={styles.spinner}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            }

                            {!loadingStatus &&
                                <div className={styles.lateList}>
                                    {arrayByStatus.slice(0,5).map(employee => (
                                        <div key={employee.employeeId} className={styles.lateEmployee}>
                                            <div className={styles.imageIcon}>
                                                <img src={icon} alt="" />
                                            </div>
                                            <div className={styles.infoData}>
                                                <h4>{employee.employeeName}</h4>
                                                <h5>ID : {employee.employeeId} | {timeFormat(employee.time)}</h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                    </div>
                    <div className={styles.rightReport}>
                        <div className={styles.topReport}>
                            <div className={styles.topBox}>
                                <h3>On Time Percentage</h3>

                                <div className={styles.boxPercent}>
                                    <div className={styles.numberPercent}>
                                        <h4>{loadingPercent ? <div className={styles.loader}></div> : widthValueOntime + "%"}</h4>
                                    </div>
                                    <div className={styles.barPercent}>
                                        <div className={styles.insideBar} style={{width: widthValueOntime+"%"}}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.topBox}>
                                <h3>Late Percentage</h3>

                                <div className={styles.boxPercent}>
                                    <div className={styles.numberPercent}>
                                        <h4>{loadingPercent ? <div className={styles.loader}></div> : widthValueLate + "%"}</h4>
                                    </div>
                                    <div className={styles.barPercent}>
                                        <div className={styles.insideBar} style={{width: widthValueLate + "%"}}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.botReport}>
                            <div className={styles.botBox}>
                                <h3>Today Report</h3>

                                <div className={styles.downloadButton}>
                                    <button><FontAwesomeIcon icon={faCloudArrowDown} className={styles.downloadIcon}/></button>
                                </div>
                            </div>
                            <div className={styles.botBox}>
                                <h3>Weekly Report</h3>

                                <div className={styles.downloadButton}>
                                    <button><FontAwesomeIcon icon={faCloudArrowDown} className={styles.downloadIcon}/></button>
                                </div>
                            </div>
                            <div className={styles.botBox}>
                                <h3>Monthly Report</h3>

                                <div className={styles.downloadButton}>
                                    <button><FontAwesomeIcon icon={faCloudArrowDown} className={styles.downloadIcon}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}