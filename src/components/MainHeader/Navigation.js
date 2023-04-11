import React,{useContext} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import classes from './Navigation.module.css';
import AuthContext from '../../store/inputContext';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
  // const dispatch=useDispatch();
  const isLoggedIn=useSelector(state=>state.isAuthenticated);
  const username=useSelector(state=>state.username);
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <p>{username}</p>
            <a href='/'>Logout</a>
          </li>
        )}
        {
          !isLoggedIn && (
            <li>
              <button><NavLink to='/signup'>Signup</NavLink></button>
              <button><NavLink to='/login'>LogIn</NavLink></button>
            </li>
          )
        }
      </ul>
    </nav>
  );
};

export default Navigation;
