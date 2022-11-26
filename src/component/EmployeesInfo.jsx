import { Link } from "react-router-dom"
import styles from "../style/Employees.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react'
import { AddEmployees } from "./AddEmployeesForm"
import { EditEmployees } from "./EditEmployees";
import { DeleteBox } from "./DeleteBox";

export const EmployeesInfo = (props) => {

    const [isShown, setIsShown] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleClick = event => {
        setIsShown(current => !current);
    };

    const updateForm = event => {
        setIsUpdate(current => !current);
    };

    const deleteQues = event => {
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

                                <tr>
                                    <td>KU-123</td>
                                    <td>Muhammad Luqman Aristio</td>
                                    <td>Technology</td>
                                    <td>08123456789</td>
                                    <td className={styles.actionButton}>
                                        <Link className={styles.update} onClick={updateForm}><FontAwesomeIcon icon={faPen}/></Link>
                                        <Link className={styles.delete} onClick={deleteQues}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>KU-123</td>
                                    <td>Muhammad Luqman Aristio</td>
                                    <td>Technology</td>
                                    <td>08123456789</td>
                                    <td>
                                        <Link className={styles.update} onClick={updateForm}><FontAwesomeIcon icon={faPen}/></Link>
                                        <Link className={styles.delete} onClick={deleteQues}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>KU-123</td>
                                    <td>Muhammad Luqman Aristio</td>
                                    <td>Technology</td>
                                    <td>08123456789</td>
                                    <td>
                                        <Link className={styles.update} onClick={updateForm}><FontAwesomeIcon icon={faPen} /></Link>
                                        <Link className={styles.delete} onClick={deleteQues}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>KU-123</td>
                                    <td>Muhammad Luqman Aristio</td>
                                    <td>Technology</td>
                                    <td>08123456789</td>
                                    <td>
                                        <Link className={styles.update} onClick={updateForm}><FontAwesomeIcon icon={faPen}/></Link>
                                        <Link className={styles.delete} onClick={deleteQues}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>KU-123</td>
                                    <td>Muhammad Luqman Aristio</td>
                                    <td>Technology</td>
                                    <td>08123456789</td>
                                    <td>
                                        <Link className={styles.update} onClick={updateForm}><FontAwesomeIcon icon={faPen}/></Link>
                                        <Link className={styles.delete} onClick={deleteQues}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>KU-123</td>
                                    <td>Muhammad Luqman Aristio</td>
                                    <td>Technology</td>
                                    <td>08123456789</td>
                                    <td>
                                        <Link className={styles.update} onClick={updateForm}><FontAwesomeIcon icon={faPen}/></Link>
                                        <Link className={styles.delete} onClick={deleteQues}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isShown && (
                <div>
                    <AddEmployees />
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
                    <FontAwesomeIcon icon={faXmark} className={styles.exitButton} onClick={deleteQues}/>
                </div>
            )}
        </div>
    )
}