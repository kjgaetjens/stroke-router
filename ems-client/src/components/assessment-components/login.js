import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actionCreators from '../../store/actions/actionCreators'
import '../../css/login.css'
import axios from 'axios'
import * as env from '../../env'
import { setAuthenticationHeader } from '../../utils/authenticate';

const Login = (props) => {

    const [user, setUser] = useState({
        username: null,
        password: "",
        password2: null
    })

    const [mode, setmode] = useState('login')
    const toggleState = () => {
        mode === 'login' ? setmode('register') : setmode('login')
    }

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (mode === 'register' && user.username.length < 5) {
            setError('Username must be at least 5 characters')
        } else {
            axios.post(`${env.serverUrl}/u/${mode}`, user)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('jsonwebtoken', res.data.token)
                    setAuthenticationHeader(res.data.token)
                    props.setAuthState(res.data)
                } else if (res.data.error) {
                    setError(res.data.error)
                } else {
                    setError("Error: Could not complete request")
                }
            })
        }
    }

    const renderLogin = () => {
        return (
            <div className="loginContainer">
                <h1 className="login">Welcome Back!</h1>
                <div className="inputDiv login">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={handleChange} />
                </div>
                <div className="inputDiv login">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange} />
                </div>
                <div className="buttonsDiv login">
                    <button className="submitButton login" onClick={handleSubmit}>Log In</button>
                    <button className="toggleButton login" onClick={toggleState}>Register new account</button>
                </div>
                <span className="errorSpan login">{error}</span>
            </div>
        )
    }

    const passwordFlag = () => {
        if (user.password.length < 7 || user.password === null) {return <span className="errorSpan login">Password must be at least 7 characters</span>}
        else if (user.password !== user.password2) {return <span className="errorSpan login">Passwords don't match</span>}
        else if (user.password === user.password2) {return <span className="errorSpan success login">Passwords match!</span>}
    }

    const renderRegister = () => {
        return (
            <div className="loginContainer">
                <div className="innerContainer login">
                    <h1 className="login">Let's get you set up.</h1>
                    <div className="login inputDiv">
                        <label htmlFor="username">Make a username:</label>
                        <input type="text" name="username" onChange={handleChange} />
                    </div>
                    <div className="login inputDiv">
                        <label htmlFor="password">Create a password:</label>
                        <input type="password" name="password" onChange={handleChange} />
                    </div>
                    <div className="login inputDiv">
                        <label htmlFor="password2">Re-enter your password:</label>
                        <input type="password" name="password2" onChange={handleChange} />
                        {passwordFlag()}
                    </div>
                    <span className="errorSpan login">{error}</span>
                    <div className="login buttonsDiv">
                        <button className="submitButton login" onClick={handleSubmit}>Register</button>
                        <button className="toggleButton login" onClick={toggleState}>Log in existing account</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {/* this line might never fire, since manually navigating to login will reset redux state to false */}
            {props.isAuth ? <Redirect to="/assessment" /> : null}
            {mode === 'login' ? renderLogin() : renderRegister()}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthState: auth => dispatch(actionCreators.setAuthState(auth))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)