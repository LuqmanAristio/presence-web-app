/* eslint-disable react-hooks/exhaustive-deps */

import { Link } from "react-router-dom"
import styles from "../style/Employees.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faUsersGear, faBuilding, faUserCheck, faUserXmark, faUserClock } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useRef, useState} from 'react'
import { AddEmployees } from "./AddEmployeesForm"
import { EditEmployees } from "./EditEmployees";
import { DeleteBox } from "./DeleteBox";
import { useUser } from "./UserContext";
import axios from "axios";

import { Pagination } from "./Pagination";
import { List } from "./ListEmployees";

export const EmployeesInfo = () => {
    const currentUser = useUser();

    const idRef = useRef('');
    const nameRef = useRef('');
    const phoneRef = useRef('');
    const departementRef = useRef('');

    const [loadingStatus, setLoading] = useState(true);
    const [infoStatus, setInfo] = useState(false);

    const [isShown, setIsShown] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [employees, setEmployees] = useState([]);
    const [employeesSummary, setEmployeesSummary] = useState(null);
    const [employeesInfo, setData] = useState(null);

    const [status, setStatus] = useState('active');

    async function fetchData(params = {status}) {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/employees`, {
            params,
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        else {
            setEmployees(response.data);
            setLoading(false);
        }
    }

    async function fetchEmployeesSummary() {
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const response = await axios.get(`${serverURL}/api/employees/info`, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
        setEmployeesSummary(response.data);
        setInfo(true);
    }

    useEffect(() => {
        fetchData();
        fetchEmployeesSummary();
    }, [currentUser, isShown, isUpdate, isDelete]);


    const handleStatusSearchChange = e => {
        setStatus(e.target.value);
    }

    const handleSearchSubmit = e => {
        e.preventDefault();
        const searchParams = {
            employeeId: idRef.current.value,
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            departement: departementRef.current.value,
            status
        }
        setCurrentPage(1);
        fetchData(searchParams);
    }

    const handleClick = () => {
        setIsShown(current => !current);
    };

    const updateForm = (idEmp) => {
        setIsUpdate(current => !current);
        setData(idEmp);
    };

    const deleteForm = (idEmp) => {
        setData(idEmp);
        setIsDelete(current => !current);
    };

    const resetSearch = () => {
        setStatus('active');
    };

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

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(5);

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = employees.slice(indexOfFirstData, indexOfLastData);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return(
        <div className={styles.mainEmployees}>
            <div className={styles.employeesContent}>

                <div className={styles.titleAdd}>
                    <div className={styles.titleMenu}>
                        <h1>Employees</h1>
                        <h2>{formatAMPM(new Date())}, {dateNow} {month} {year}</h2>
                    </div>
                    <div className={styles.addButton}>
                        <Link onClick={handleClick}>Add New Employee +</Link>
                    </div>
                </div>

                <div className={styles.employeesDetail}>
                    <div className={styles.leftDetail}>
                        <div className={styles.searchEmployees}>
                            <div className={styles.searchTitle}>
                                <h1>Filter</h1>
                            </div>
                            <div className={styles.searchForm}>
                                <form action="" onSubmit={handleSearchSubmit}>
                                    <table className={styles.searchTable}>
                                        <tr className={styles.titleTable}>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Phone</td>
                                        </tr>
                                        <tr>
                                            <td><input ref={idRef} type="text" name="" placeholder="Ex : 1122334" /></td>
                                            <td><input ref={nameRef} type="text" name="" placeholder="Ex : Aris Ganteng" /></td>
                                            <td><input ref={phoneRef} type="number" name="" placeholder="Ex : 0812345678" /></td>
                                        </tr>
                                        <tr className={styles.titleTableSecond}>
                                            <td>Departement</td>
                                            <td>Status</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><input ref={departementRef} type="text" name="" placeholder="Ex : Informatics" /></td>
                                            <td>
                                                <select defaultValue={'active'} onChange={handleStatusSearchChange}>
                                                    <option value='active'>Active</option>
                                                    <option value='inactive'>Inactive</option>
                                                    <option value='unavailable'>Unavailable</option>
                                                </select>
                                            </td>
                                            <td className={styles.buttonForm}>
                                                <button className={styles.clearButton} type="reset" onClick={resetSearch}>Clear</button>
                                                <button className={styles.submitButton} type="submit">Search</button>
                                            </td>
                                        </tr>
                                    </table>
                                </form>
                            </div>
                        </div>
                        <div className={styles.listEmployees}>
                        <table className={styles.tableList}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Status</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Phone</th>
                                    <th></th>
                                </tr>
                            </thead>
                            {!loadingStatus &&
                                <List 
                                    data={currentData}
                                    updateForm={updateForm}
                                    deleteForm={deleteForm}
                                />
                            }
                        </table>
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

                            <Pagination
                                dataPerPage={dataPerPage}
                                totalData={employees.length}
                                paginate={paginate}
                                pageNow={currentPage}
                            />
                        </div>
                    </div>
                    <div className={styles.rightDetail}>
                        <h1>Employees Information</h1>

                        <div className={styles.infoEmployees}>
                            <div className={styles.infoBox}>
                                <div className={styles.infoImage}>
                                    <FontAwesomeIcon icon={faUsersGear} className={styles.iconInfo}/>
                                </div>
                                <div className={styles.infoText}>
                                    <h3>Employees</h3>
                                    <h5>{infoStatus===true? employeesSummary.total : "00"} Persons</h5>
                                </div>
                            </div>
                            <div className={styles.infoBox}>
                                <div className={styles.infoImage}>
                                    <FontAwesomeIcon icon={faBuilding} className={styles.iconInfo}/>
                                </div>
                                <div className={styles.infoText}>
                                    <h3>Department</h3>
                                    <h5>{infoStatus===true? employeesSummary.departementCount : "0"} Departmens</h5>
                                </div>
                            </div>
                            <div className={styles.infoBox}>
                                <div className={styles.infoImage}>
                                    <FontAwesomeIcon icon={faUserCheck} className={styles.iconInfo}/>
                                </div>
                                <div className={styles.infoText}>
                                    <h3>Active Employees</h3>
                                    <h5>{infoStatus===true? employeesSummary.statusCount.active : "0"} Persons</h5>
                                </div>
                            </div>
                            <div className={styles.infoBox}>
                                <div className={styles.infoImage}>
                                    <FontAwesomeIcon icon={faUserXmark} className={styles.iconInfo}/>
                                </div>
                                <div className={styles.infoText}>
                                    <h3>Inactive Employees</h3>
                                    <h5>{infoStatus===true? employeesSummary.statusCount.inactive : "0"} Persons</h5>
                                </div>
                            </div>
                            <div className={styles.infoBox}>
                                <div className={styles.infoImage}>
                                    <FontAwesomeIcon icon={faUserClock} className={styles.iconInfo}/>
                                </div>
                                <div className={styles.infoText}>
                                    <h3>Unavailable Employees</h3>
                                    <h5>{infoStatus===true? employeesSummary.statusCount.unavailable : "0"} Persons</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isShown && (
                <div>
                    <AddEmployees handleSave={handleClick}/>
                    <FontAwesomeIcon icon={faXmark} className={styles.exitButton} onClick={handleClick}/>
                </div>
            )}

            {isUpdate && (
                <div>
                    <EditEmployees data={employeesInfo} updateForm={updateForm}/>
                    <FontAwesomeIcon icon={faXmark} className={styles.exitButton} onClick={updateForm}/>
                </div>
            )}

            {isDelete && (
                <div>
                    <DeleteBox data={employeesInfo} deleteForm={deleteForm}/>
                    <FontAwesomeIcon icon={faXmark} className={styles.exitButton} onClick={deleteForm}/>
                </div>
            )}

        </div>
    )
}