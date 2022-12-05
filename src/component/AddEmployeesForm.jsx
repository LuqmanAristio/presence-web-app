import axios from "axios";
import { useRef } from "react";
import styles from "../style/Employees.module.css"
import { useUser } from "./UserContext";

export const AddEmployees = ({handleSave}) =>{
    const currentUser = useUser();

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const departementRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const employeeData = {
            name: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
            email: emailRef.current.value,
            departement: departementRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
        };
        const response = await axios.post(`${serverURL}/api/employees`, employeeData, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        console.log(response);
        handleSave();
    }

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
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formInput}>
                            <div className={styles.form}>
                                <h3>First Name</h3>
                                <input ref={firstNameRef} type="text" name="" id="" placeholder="Type here..." required/>
                            </div>
                            <div className={styles.form}>
                                <h3>Last Name</h3>
                                <input ref={lastNameRef} type="text" name="" id="" placeholder="Type here..." required/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.formSingle}>
                                <h3>Email Address</h3>
                                <input ref={emailRef} type="email" name="" className={styles.singleInput} placeholder="Type here..." required/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.form}>
                                <h3>Departement</h3>
                                <input ref={departementRef} type="text" name="" id="" placeholder="Type here..." required/>
                            </div>
                            <div className={styles.form}>
                                <h3>Phone</h3>
                                <input ref={phoneRef} type="number" name="" id="" placeholder="Type here..." required/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.formSingle}>
                                <h3>Home Address</h3>
                                <input ref={addressRef} type="text" name="" className={styles.singleInput} placeholder="Type here..." required/>
                            </div>
                        </div>

                        <button type="submit" className={styles.confirmButton}>Add</button>
                        <button className={styles.cancelButton} onClick={() => handleSave()}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}