import styles from "../style/Employees.module.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

export const AddEmployees = () =>{
    return(
        <div className={styles.addEmployees}>
            <div className={styles.formulirAdd}>
                <div className={styles.leftEmployees}>
                    <h1>Presence</h1>

                    <h2>Add your new employee here.</h2>
                    <p>Start their career here by filling in their personal data first</p>

                </div>
                <div className={styles.rightEmployees}>
                    <h2>Registration</h2>
                    <form>
                        <div className={styles.formInput}>
                            <div className={styles.form}>
                                <h3>First Name</h3>
                                <input type="text" name="" id="" placeholder="Type here..."/>
                            </div>
                            <div className={styles.form}>
                                <h3>Last Name</h3>
                                <input type="text" name="" id="" placeholder="Type here..."/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.formSingle}>
                                <h3>Email Address</h3>
                                <input type="email" name="" className={styles.singleInput} placeholder="Type here..."/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.form}>
                                <h3>Departement</h3>
                                <input type="text" name="" id="" placeholder="Type here..."/>
                            </div>
                            <div className={styles.form}>
                                <h3>Phone</h3>
                                <input type="number" name="" id="" placeholder="Type here..."/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.formSingle}>
                                <h3>Home Address</h3>
                                <input type="text" name="" className={styles.singleInput} placeholder="Type here..."/>
                            </div>
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>

                <Link to="/employees"><FontAwesomeIcon icon={faXmark} className={styles.exitButton}/></Link>
            </div>
        </div>
    )
}