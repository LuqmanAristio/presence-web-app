import { Link } from "react-router-dom"
import styles from "../style/Employees.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react'
import { AddEmployees } from "./AddEmployeesForm"
import { EditEmployees } from "./EditEmployees";
import { DeleteBox } from "./DeleteBox";
import { useUser } from "./UserContext";
import axios from "axios";

export const EmployeesInfo = () => {
    const currentUser = useUser();

    const [isShown, setIsShown] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const serverURL = process.env.REACT_APP_SERVER_URL;
            const response = await axios.get(`${serverURL}/api/employees`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                },
                validateStatus: () => true
            });
            if(response.status < 200 || response.status >= 300) return console.log(response.data.message);
            else setEmployees(response.data);
        }
        fetchData();
    }, [currentUser, isShown, isUpdate, isDelete]);

    const handleClick = () => {
        setIsShown(current => !current);
    };

    const updateForm = () => {
        setIsUpdate(current => !current);
    };

    const deleteForm = () => {
        setIsDelete(current => !current);
    };

    return(
        <div className={styles.mainEmployees}>
            <div className={styles.employeesContent}>
                <div className={styles.topEmployees}>
                    <h1>Employees</h1>
                    <Link onClick={handleClick}>Add New +</Link>
                </div>
                <div className={styles.boxEmployees}>
                    <div className={styles.searchEmployees}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.ikonSearch}/>
                        <input type="text" placeholder="Search employees name..." />
                        <button type="submit">Search</button>
                    </div>
                    <div className={styles.listEmployees}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Departement</th>
                                    <th>Phone</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(employee => (
                                    <tr key={employee.employeeId}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.departement}</td>
                                        <td>{employee.phone}</td>
                                        <td className={styles.actionButton}>
                                            <button className={styles.update} onClick={updateForm}><FontAwesomeIcon icon={faPen}/></button>
                                            <button className={styles.delete} onClick={deleteForm}><FontAwesomeIcon icon={faTrashCan}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isShown && (
                <div>
                    <AddEmployees handleSave={handleClick} />
                    <FontAwesomeIcon icon={faXmark} className={styles.exitButton} onClick={handleClick}/>
                </div>
            )}

            {isUpdate && (
                <div>
                    <EditEmployees />
                    <FontAwesomeIcon icon={faXmark} className={styles.exitButton} onClick={updateForm}/>
                </div>
            )}

            {isDelete && (
                <div>
                    <DeleteBox />
                    <FontAwesomeIcon icon={faXmark} className={styles.exitButton} onClick={deleteForm}/>
                </div>
            )}
        </div>
    )
}