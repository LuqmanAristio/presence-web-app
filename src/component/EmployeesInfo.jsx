import { Link } from "react-router-dom"
import styles from "../style/Employees.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const EmployeesInfo = () => {
    return(
        <div className={styles.mainEmployees}>
            <div className={styles.employeesContent}>
                <div className={styles.topEmployees}>
                    <h1>Employees</h1>
                    <Link>Add New +</Link>
                </div>
                <div className={styles.boxEmployees}>
                    <div className={styles.searchEmployees}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.ikonSearch}/>
                        <input type="text" placeholder="Search employees name..." />
                        <button type="submit">Search</button>
                    </div>
                    <div className={styles.listEmployees}>
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Departement</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>KU-123</td>
                                <td>Muhammad Luqman Aristio</td>
                                <td>Technology</td>
                                <td>08123456789</td>
                                <td className={styles.actionButton}>
                                    <Link className={styles.update}><FontAwesomeIcon icon={faPen}/></Link>
                                    <Link className={styles.delete}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                </td>
                            </tr>
                            <tr>
                                <td>KU-123</td>
                                <td>Muhammad Luqman Aristio</td>
                                <td>Technology</td>
                                <td>08123456789</td>
                                <td>
                                    <Link className={styles.update}><FontAwesomeIcon icon={faPen}/></Link>
                                    <Link className={styles.delete}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                </td>
                            </tr>
                            <tr>
                                <td>KU-123</td>
                                <td>Muhammad Luqman Aristio</td>
                                <td>Technology</td>
                                <td>08123456789</td>
                                <td>
                                    <Link className={styles.update}><FontAwesomeIcon icon={faPen}/></Link>
                                    <Link className={styles.delete}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                </td>
                            </tr>
                            <tr>
                                <td>KU-123</td>
                                <td>Muhammad Luqman Aristio</td>
                                <td>Technology</td>
                                <td>08123456789</td>
                                <td>
                                    <Link className={styles.update}><FontAwesomeIcon icon={faPen}/></Link>
                                    <Link className={styles.delete}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                </td>
                            </tr>
                            <tr>
                                <td>KU-123</td>
                                <td>Muhammad Luqman Aristio</td>
                                <td>Technology</td>
                                <td>08123456789</td>
                                <td>
                                    <Link className={styles.update}><FontAwesomeIcon icon={faPen}/></Link>
                                    <Link className={styles.delete}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                </td>
                            </tr>
                            <tr>
                                <td>KU-123</td>
                                <td>Muhammad Luqman Aristio</td>
                                <td>Technology</td>
                                <td>08123456789</td>
                                <td>
                                    <Link className={styles.update}><FontAwesomeIcon icon={faPen}/></Link>
                                    <Link className={styles.delete}><FontAwesomeIcon icon={faTrashCan}/></Link>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}