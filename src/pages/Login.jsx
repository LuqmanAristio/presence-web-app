import { useState, useRef } from 'react';
import axios from 'axios';

import styles from '../style/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const Login = ({setCurrentUser}) =>{
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        const serverURL = process.env.REACT_APP_SERVER_URL;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        try {
            const response = await axios.post(`${serverURL}/api/admins/login`,
                {username, password},
                {validateStatus: () => true}
            );
            if(response.status < 200 || response.status >= 300) return setError(response.data.message);
            else setCurrentUser(response.data.token);
        } catch (err) {
            console.log('catched');
            setError('Server error:', err.message);
        }

        if(!error) navigate('/dashboard');
    };

    return(
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h1>Welcome Back</h1>
                <p>Enter your username and password</p>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
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