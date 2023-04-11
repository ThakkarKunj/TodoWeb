import React, { useState } from "react";
import "./TaskInput.css";
import inputContext from "../../store/inputContext";
import { useContext } from "react";
import {useDispatch} from 'react-redux';
const TaskInput = (props) => {
  const [enteredTask, setTask] = useState();

  const dispatch=useDispatch();
  const { inputRef,edit,setEdit } = useContext(inputContext)
  const taskChangeHandler = (event) => {
    setTask(event.target.value);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if(edit.length!==0){
      dispatch({type:'edit-todo',key:edit,newText:enteredTask})
      console.log(edit)
      setEdit('')
    }
    else{
      props.onAddTask(enteredTask);
    }
    setTask("");
  };
  return (
    <>
      <div className="input-container">
        <input type="text" ref={inputRef} value={enteredTask} onChange={taskChangeHandler} />
        <i class="fa-solid fa-plus" id="icon" onClick={formSubmitHandler}></i>
      </div>
    </>
  );
};
export default TaskInput;
