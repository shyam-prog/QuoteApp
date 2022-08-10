import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from "../components/AuthForm/AuthForm";
import { authActions } from '../reduxStore/indexRedux';

const Auth = () => {
    localStorage.removeItem('token');
    const token = useSelector((state) => state.authSlice.token);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(authActions.logout());
    }, [])
    return <React.Fragment>
        <AuthForm />
    </React.Fragment>
}

export default Auth;