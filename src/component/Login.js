import { useRef } from 'react';

import styles from '../style/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

export const Login = () =>{
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const onSubmit = e => {
        e.preventDefault();
        const formInfo = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        console.log(formInfo);
    };

    return(
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h1>Welcome Back</h1>
                <p>Enter your username and password</p>

                <form onSubmit={onSubmit}>
                    <div className={styles.inputField}>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.ikonForm}/>
                        <input type="text" placeholder="Enter your username" ref={usernameRef} className={styles.usernameField}/>
                    </div>
                    <div className={styles.inputField}>
                        <FontAwesomeIcon icon={faLock} className={styles.ikonForm}/>
                        <input type="password" placeholder="Enter your password" ref={passwordRef} className={styles.passwordField}/>
                    </div>
                    <button type="submit" className={styles.loginButton}>Sign In</button>
                </form>
            </div>

            <p className={styles.forgotText}>Forgot your password?<span><a href="/"> Contact Us</a></span></p>
        </div>
    );
};