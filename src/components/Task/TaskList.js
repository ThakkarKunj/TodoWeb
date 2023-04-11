import React,{useState,useEffect,useContext} from 'react';
import './TaskList.css';
import { useDispatch,useSelector } from 'react-redux';
import inputContext from '../../store/inputContext';
const TaskList=(props)=>{
    // console.log(props.items);
    // const [tasks,handleTasks]=useState(props.items);
    const tasks=useSelector(state=>state.todos);
    const { inputRef,edit,setEdit } = useContext(inputContext)
    const dispatch=useDispatch();
    const deleteHandler=(key)=>{
        const newTasks=tasks.filter(task=>{return task.id!==key});
        dispatch({type:'remove-todo',key:key});
        // console.log(tasks)
    }
    const editHandler=(key,text)=>{
        inputRef.current.value = text;
        setEdit(key)

    }
    // useEffect(() => {
        
    //     handleTasks(props.items)
    // }, [props.items])
    let content=<p style={{ textAlign: 'center' }}>No Tasks found. Maybe add one?</p>;
    if(tasks.length>0)
    {
        content=tasks.map(task=>{   
            // let ref = {}
            return <li className='task'>{task.text}<span><i class="fa-regular fa-pen-to-square" id='edit' onClick={()=>{editHandler(task.id,task.text)}}></i><i class="fa-sharp fa-solid fa-trash" id='delete' onClick={()=>{deleteHandler(task.id)}}></i></span></li>
        });
    }
    return(
        
        <ul className='task-list'>
            {content}
        </ul>
       
        
    );
}
export default TaskList;