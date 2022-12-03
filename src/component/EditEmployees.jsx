import styles from "../style/Employees.module.css"

export const EditEmployees = ({data, updateForm}) =>{

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
                    <form>
                        <div className={styles.formInput}>
                            <div className={styles.form}>
                                <h3>Name</h3>
                                <input type="text" name="" id="" defaultValue={data.name} placeholder={data.name} required/>
                            </div>
                            <div className={styles.form}>
                                <h3>Status</h3>
                                <select>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                    <option>Unavailable</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.formSingle}>
                                <h3>Email Address</h3>
                                <input type="email" name="" className={styles.singleInput} placeholder={data.email} defaultValue={data.email} required/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.form}>
                                <h3>Departement</h3>
                                <input type="text" name="" id="" placeholder={data.departement} defaultValue={data.departement} required/>
                            </div>
                            <div className={styles.form}>
                                <h3>Phone</h3>
                                <input type="number" name="" id="" placeholder={data.phone} defaultValue={data.phone} required/>
                            </div>
                        </div>
                        <div className={styles.formInput}>
                            <div className={styles.formSingle}>
                                <h3>Home Address</h3>
                                <input type="text" name="" className={styles.singleInput} placeholder={data.address} defaultValue={data.address} required/>
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