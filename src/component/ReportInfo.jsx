import styles from "../style/Report.module.css"
import icon from "../image/profile.png"
import axios from "axios"
import { useState, useEffect } from "react"
import { useUser } from "./UserContext"
import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { read, utils, writeFile } from 'xlsx';

export const ReportInfo = () =>{

    const currentUser = useUser();
    const [attendance, setAttendance] = useState([]);
    const [daily, setDaily] = useState([]);
    const [weekly, setWeekly] = useState([]);
    const [monthly, setMonthly] = useState([]);
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

    async function fetchDaily() {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/attendances/report`, {
            params: {range: 'daily'},
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        else {
            setDaily(response.data);
        }
    }

    async function fetchWeekly() {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/attendances/report`, {
            params: {range: 'weekly'},
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        else {
            setWeekly(response.data);
        }
    }

    async function fetchMonthly() {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/attendances/report`, {
            params: {range: 'monthly'},
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        else {
            setMonthly(response.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    useEffect(() => {
        fetchDaily();
    }, [currentUser]);

    useEffect(() => {
        fetchWeekly();
    }, [currentUser]);

    useEffect(() => {
        fetchMonthly();
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

    const checkEmpty = () =>{
        return arrayByStatus.length === 0 ?<div className={styles.loadingBox}><h1 className={styles.emptyData}>Empty</h1></div> : "";
    }

    const downloadDaily = () =>{
        const x = utils.book_new();
        const y = utils.json_to_sheet(daily);

        utils.book_append_sheet(x, y, "MySheet1");

        writeFile(x, "Daily Attendances.xlsx");
    }

    const downloadWeekly = () =>{
        const x = utils.book_new();
        const y = utils.json_to_sheet(weekly);

        utils.book_append_sheet(x, y, "MySheet1");

        writeFile(x, "Weekly Attendances.xlsx");
    }
    
    const downloadMonthly = () =>{
        const x = utils.book_new();
        const y = utils.json_to_sheet(monthly);

        utils.book_append_sheet(x, y, "MySheet1");

        writeFile(x, "Monthly Attendances.xlsx");
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

                            {!loadingStatus && checkEmpty()}

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
                                    <button onClick={downloadDaily}><FontAwesomeIcon icon={faCloudArrowDown} className={styles.downloadIcon}/></button>
                                </div>
                            </div>
                            <div className={styles.botBox}>
                                <h3>Weekly Report</h3>

                                <div className={styles.downloadButton}>
                                    <button onClick={downloadWeekly}><FontAwesomeIcon icon={faCloudArrowDown} className={styles.downloadIcon}/></button>
                                </div>
                            </div>
                            <div className={styles.botBox}>
                                <h3>Monthly Report</h3>

                                <div className={styles.downloadButton}>
                                    <button onClick={downloadMonthly}><FontAwesomeIcon icon={faCloudArrowDown} className={styles.downloadIcon}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}