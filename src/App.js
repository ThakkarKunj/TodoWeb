import React, { useState,useEffect,useRef } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/inputContext';
import {useSelector,useDispatch} from 'react-redux';
import { Switch,Route,Redirect } from 'react-router-dom'
import Signup from './components/SignUp/Signup';
import inputContext from './store/inputContext';
function App() {

  const dispatch=useDispatch();
  const isLoggedIn=useSelector(state=>state.isAuthenticated);
  

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(()=>{
  //   const userLoggedInInformation=localStorage.getItem('isLoggedIn');
  //   if(userLoggedInInformation==='1')
  //   {
  //     setIsLoggedIn(true);
  //   }
  // } ,[]);
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    // localStorage.setItem('isLoggedIn','1');
    const user={
      email,
      password
    }
    dispatch({type:'login',user});
    // setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    // setIsLoggedIn(false);
  };

  return (
    // <AuthContext.Provider value={{
    //   isLoggedIn:isLoggedIn,
    //   onLogOut:logoutHandler
    // }}>
    // <MainHeader/>
    //   <main>
    //     {!isLoggedIn && <Login/>}
    //     {isLoggedIn && <Home onLogout={logoutHandler} />}
    //   </main>
    <Switch>
      <Route exact path='/'>
        <Redirect to='/login'/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/signup'>
        <Signup/>
      </Route>
      <Route path='/home'>
      <inputContext.Provider value={{
        inputRef:useRef(null)
      }}><Home/></inputContext.Provider>

      </Route>
    </Switch>
    
  );
}

export default App;
// class App extends React.Component{
//   constructor(props)
//   {
//     super(props);
//     this.state={
//       isLoggedIn:false
//     }
//     this.loginHandler=this.loginHandler.bind(this);
//     this.logoutHandler=this.logoutHandler.bind(this);
//   }
//   componentDidMount()
//   {
//     const userLoggedInInformation=localStorage.getItem('isLoggedIn');
//     if(userLoggedInInformation==='1')
//     {
//       this.setState({isLoggedIn:true});
//     }
//   }
//   loginHandler(email,password)
//   {
//     localStorage.setItem('isLoggedIn','1');
//     this.setState({isLoggedIn:true});
//   }
//   logoutHandler()
//   {
//     localStorage.removeItem('isLoggedIn');
//     this.setState({isLoggedIn:false});
//   }
//   render(){
//     return (
//       <AuthContext.Provider value={{
//         isLoggedIn:this.state.isLoggedIn,
//         onLogOut:this.logoutHandler
//       }}>
//         <MainHeader/>
//         <main>
//           {!this.state.isLoggedIn && <Login onLogin={this.loginHandler} />}
//           {this.state.isLoggedIn && <Home onLogout={this.logoutHandler} />}
//         </main>
//       </AuthContext.Provider>
//     );
//   }

// }