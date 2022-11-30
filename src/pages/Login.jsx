import { useState, useRef } from 'react';
import axios from 'axios';

import styles from '../style/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUserUpdate } from '../component/UserContext';

import logo from '../image/presencelogo.png';

export const Login = () =>{
    const setCurrentUser = useUserUpdate();

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [error, setError] = useState(false);

    const [loading, setLoading] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const serverURL = process.env.REACT_APP_SERVER_URL;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        try {
            const response = await axios.post(`${serverURL}/api/admins/login`,
                {username, password},
                {validateStatus: () => true}
            );
            if(response.status < 200 || response.status >= 300){
                return setTimeout(() =>{
                    setError(response.data.message)
                    setLoading(false)
                }, 2000);
            }
            
            else {
                const {token, user} = response.data;
                setCurrentUser({token, data: user});
            }
        } catch (err) {
            console.log('catched');
            setError('Server error:', err.message);
        }

        if(!error) navigate('/dashboard');
    };

    return(
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <div className={styles.leftLogin}>
                    <div className={styles.titleLogin}>
                        <h3>PRESENCE</h3>

                        <h1>An artificial intelligence attendance system</h1>
                        <p>Brand new system to help your company perform attendance automatically using machine learning</p>
                    </div>
                    <div className={styles.informationLink}>
                        <div className={styles.emailInfo}>
                            <h3>Get in touch with us</h3>
                            <p>presence@company.com</p>
                        </div>

                        <FontAwesomeIcon icon={faArrowRight} className={styles.arrow}/>
                    </div>
                </div>
                <div className={styles.rightLogin}>
                    <div className={styles.logoText}>
                        <img src={logo} alt="" />
                        <h1>Welcome Back</h1>
                        <p>Hello there, please fill in the form with your username and password</p>
                    </div>
                    <div className={styles.formLogin}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formInput}>
                                <input type="text" required="required" ref={usernameRef}/>
                                <span className={styles.inputName}>Username</span>
                                <span className={styles.iconForm}><FontAwesomeIcon icon={faUserTie} /></span>
                            </div>
                            <div className={styles.formInput}>
                                <input type="password" required="required" ref={passwordRef}/>
                                <span className={styles.inputName}>Password</span>
                                <span className={styles.iconForm}><FontAwesomeIcon icon={faLock} /></span>
                            </div>

                            {error && <h4>{error}</h4>}

                            {!loading && <button type="submit">Login</button>}
                            {loading && <button type="submit"><div class={styles.loader}></div></button>}
                            
                        </form>
                    </div>

                    <h3>Forget your password?<span className={styles.contactUs}> Contact us</span></h3>
                </div>
            </div>
        </div>
    );
};