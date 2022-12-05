import styles from "../style/Employees.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';

export const List = ({ data, updateForm, deleteForm}) => {
    
    const capitalizeWord = (status) =>{
        return status[0].toUpperCase() + status.substring(1);
    }

    return (
        <div>
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
            <tbody>
                {data.map(employee => (
                    <tr key={employee.employeeId}>
                        <td>{employee.employeeId.slice(0,7)}</td>
                        <td className={employee.status === "active" ? styles.activeEmp : styles.inactiveEmp}><h5>{capitalizeWord(employee.status)}</h5></td>
                        <td>{employee.name}</td>
                        <td>{employee.departement}</td>
                        <td>{employee.phone}</td>
                        <td className={styles.buttonAction}>
                            <button className={styles.buttonEdit} onClick={() => updateForm(employee)}><FontAwesomeIcon icon={faPen}/></button>
                            <button className={styles.buttonDelete} onClick={() => deleteForm(employee)}><FontAwesomeIcon icon={faTrashCan}/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
       

        
    );
  };