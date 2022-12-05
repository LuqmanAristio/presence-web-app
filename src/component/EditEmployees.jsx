import styles from "../style/Employees.module.css"
import axios from "axios";
import { useRef, useState } from "react";
import { useUser } from "./UserContext";

export const EditEmployees = ({data, updateForm}) =>{

    const currentUser = useUser();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const departementRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);

    const [statusCon, setStatus] = useState(data.status);


    const handleSubmit = async e => {
        e.preventDefault();
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const employeeData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            departement: departementRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
            status: statusCon,
        };
        const response = await axios.put(`${serverURL}/api/employees/${data.employeeId}`, employeeData, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            },
            validateStatus: () => true
        });
        console.log(response);
        updateForm();
    }

    return(
        <div className={styles.addEmployees}>
            <div className={styles.formulirAdd}>
                <div className={styles.leftEmployees}>
                    <h1>Presence</h1>
                    <h2>Detail employees information.</h2>
                    <p>You can make an update by changing the value and save it</p>
                </div>
                <div className={styles.rightEmployees}>
                    <h2>Updating</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formInput}>
                            <div className={styles.form}>
                                <h3>Name</h3>
                                <input type="text" ref={nameRef} defaultValue={data.name} placeholder={data.name} required/>
                            </div>
                            <div className={styles.form}>
                                <h3>Status</h3>
                                <select value={statusCon} onChange={e=>setStatus(e.target.value)}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.formSingle}>
                                <h3>Email Address</h3>
                                <input type="email" ref={emailRef} className={styles.singleInput} placeholder={data.email} defaultValue={data.email} required/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.form}>
                                <h3>Departement</h3>
                                <input type="text" ref={departementRef} placeholder={data.departement} defaultValue={data.departement} required/>
                            </div>
                            <div className={styles.form}>
                                <h3>Phone</h3>
                                <input type="number" ref={phoneRef} placeholder={data.phone} defaultValue={data.phone} required/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.formSingle}>
                                <h3>Home Address</h3>
                                <input type="text" ref={addressRef} className={styles.singleInput} placeholder={data.address} defaultValue={data.address} required/>
                            </div>
                        </div>

                        <button type="submit" className={styles.confirmButton}>Save</button>
                        <button className={styles.cancelButton} onClick={() => updateForm()}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}