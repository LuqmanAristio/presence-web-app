import '../style/App.css'

const Login = () =>{
    return(
        <div className="loginContainer">
            <div className="loginBox">
                <h1>Welcome Back</h1>
                <p>Enter your credential username and password</p>

                <div className="inputField">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="text" placeholder="Enter your ID" className="usernameField"/>
                </div>
                <div className="inputField">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder="Enter your password" className="passwordField"/>
                </div>

                <button className="loginButton">Sign In</button>
            </div> 

            <p className="forgotText">Forgot your password?<span><a href="#"> Contact Us</a></span></p>
        </div>
    )
}

export default Login;