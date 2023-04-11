import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Signup.module.css';
import Button from '../UI/Button/Button';
import { useSelector,useDispatch } from 'react-redux';
import MainHeader from '../MainHeader/MainHeader';
import { Redirect } from 'react-router-dom';
const Signup = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorDisplay,setErrorDisplay] = useState(false);
  const dispatch=useDispatch();
  const isAuthenticated = useSelector(state=>state.isAuthenticated)
  const errorMessage = useSelector(state=>state.errorMessage);
  useEffect(()=>{ 
    const identifier=setTimeout(()=>{
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    },500);
    //cleanup function
    return ()=>{
      clearTimeout(identifier);
    }
  },[enteredEmail,enteredPassword]);

  const emailChangeHandler = (event) => {
    setErrorDisplay(false);
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setErrorDisplay(false);
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    setErrorDisplay(true)
    event.preventDefault();
    console.log(enteredEmail)
    const user={
      email:enteredEmail,
      password:enteredPassword
    }
    dispatch({type:'signup',user});
    // props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <>
    { isAuthenticated && <Redirect to='/home' />} 
    { !isAuthenticated &&
      <>
    <MainHeader/>
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          
          />
        </div>
        <div className={classes.error}>
          {errorDisplay?errorMessage:''}
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Signup
          </Button>
        </div>
      </form>
    </Card>
    </>
    }
    </> 
  );
};

export default Signup;
