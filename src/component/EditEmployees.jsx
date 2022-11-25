import styles from "../style/Employees.module.css"

export const EditEmployees = () =>{
    return(
        <div className={styles.addEmployees}>
            <div className={styles.formulirAdd}>
                <div className={styles.leftEmployees}>
                    <h1>Presence</h1>

                    <h2>Edit employee personal data.</h2>
                    <p>Start their career here by filling in their personal data first</p>

                </div>
                <div className={styles.rightEmployees}>
                    <h2>Updating</h2>
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
            </div>
        </div>
    )
}