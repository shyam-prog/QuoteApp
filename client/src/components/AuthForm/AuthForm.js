import { Fragment, useRef, useState } from "react";
// import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForm.module.css";
import { authActions } from "../../reduxStore/indexRedux";
import { useDispatch } from "react-redux";
import { useLocation, Redirect, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../lib/auth-api";

const AuthForm = (props) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const history = useHistory();

    async function submitFormHandler(event) {
        event.preventDefault();

        dispatch(authActions.login("Shyam"));

        const enteredEmail = emailInputRef.current.value;
        const enteredPwd = passwordInputRef.current.value;
        console.log("Working Perfect!");

        
        // optional: Could validate here

        if(isSignUp){
            const enteredName = nameInputRef.current.value;
            const isAuth = registerUser({email: enteredEmail,pwd: enteredPwd, name:enteredName});
            if(isAuth){
                navigate('/quotes');
            }
        }else{
            const isAuth = loginUser({email: enteredEmail, pwd: "12345"});
            // console.log(isAuth);
            // if(isAuth){
            //     navigate('/quotes');
            // }
        }
    }

    const signUpStateHandler = () => {
        setIsSignUp(!isSignUp);
    }


    return (
        <Fragment>
            {/* <Prompt when={isEntering} message={(location) => 'Are you want to exit? then Entered data will be lost!'} /> */}
            <Card>
                <form className={classes.form} onSubmit={submitFormHandler}>
                    {props.isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner />
                        </div>
                    )}
                    {
                        isSignUp && (
                            <div className={classes.control}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" ref={nameInputRef} required/>
                            </div>
                        )
                    }
                    <div className={classes.control}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" ref={emailInputRef} required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" ref={passwordInputRef} required/>
                    </div>
                    <div className={classes.actions}>
                        <button className="btn">{isSignUp ? "Sign Up" : "Login"}</button>
                    </div>
                </form>
                <br />
                <div className={classes.actions}>
                    <span onClick={signUpStateHandler} className={classes.span}>{isSignUp ? `Already have account?..Click here to Login` : `Don't have Account? Click here to Create One..`}</span>
                </div>
            </Card>
        </Fragment>
    );
};

export default AuthForm;
