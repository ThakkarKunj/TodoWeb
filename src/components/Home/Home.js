import React,{useState,useRef} from 'react';
import TaskInput from '../Task/TaskInput';
import MainHeader from '../MainHeader/MainHeader';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import TaskList from '../Task/TaskList';
import { nanoid } from 'nanoid';
import { useSelector,useDispatch } from 'react-redux';
import inputContext from '../../store/inputContext';
const Home = (props) => {

  const[edit,setEdit]=useState('');
  const tasks=useSelector(state=>state.todos);
  const dispatch=useDispatch();
  const addTask=(enteredTask)=>{
    console.log(enteredTask)

    // setTasks(prevTasks=>{
    //   const updatedTasks = [...prevTasks];
    //   updatedTasks.unshift({ text: enteredTask, id: nanoid()});
    //   return updatedTasks;
    // });
    // console.log(enteredTask); 
    dispatch({type:'add-todo',enteredTask})
  }
  let content = (
    <p style={{ textAlign: 'center' }}>No Tasks found. Maybe add one?</p>
  );

  if(tasks.length>0)
  {
    // console.log('Size is greater');
    content=(
      <TaskList items={tasks}/>
    );
  }

  return (
    <div>
      <MainHeader/>
        <inputContext.Provider value= {{
            inputRef:useRef(null),
            edit:edit,
            setEdit:setEdit
        }}>
          <TaskInput onAddTask={addTask}/>
          <div>
            {content}
          </div>
        </inputContext.Provider>
    </div>
  );
};

export default Home;
