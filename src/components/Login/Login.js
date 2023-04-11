import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MainHeader from '../MainHeader/MainHeader';
import { Redirect } from 'react-router-dom';
// const emailReducer=(state,action)={
//   return {value:'',isValid:false};
// };
const Login = (props) => {

  const dispatch=useDispatch();

  const isAuthenticated = useSelector(state=>state.isAuthenticated);
  const error=useSelector(state=>state.errorMessage);
  console.log(isAuthenticated)
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorDisplay,setErrorDisplay] = useState(false);

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
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    setErrorDisplay(true);
    const user={
      email:enteredEmail,
      password:enteredPassword
    }
    dispatch({type:'login',user});
  };
  
  let content=<Redirect to='/home' />;
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
            {errorDisplay?error:''}
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </Card>
      </>
    }
    </>
    
  );
};

export default Login;
