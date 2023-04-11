import {legacy_createStore} from 'redux';
import {nanoid} from 'nanoid';
const initialstate={
    todos:[],
    username:'',
    isAuthenticated:false,
    errorMessage:'',
}
const todoReducer=(state=initialstate,action)=>{
    if(action.type==='add-todo')
    {
        let updatedTodos=[...state.todos,{
            text:action.enteredTask,
            id:nanoid()
        }]
        // console.log(updatedTodos);
        let userdata=JSON.parse(localStorage.getItem(state.username));
        userdata.todos=updatedTodos;
        localStorage.setItem(state.username,JSON.stringify(userdata));
        return{
            ...state,
            todos:updatedTodos
        };
    }
    else if(action.type==='edit-todo')
    {
        let updatedTodos=state.todos.map(item=>{
            if(item.id===action.key)
            {
                item.text=action.newText;
            }
            return item;
        })
        let userdata=JSON.parse(localStorage.getItem(state.username));
        userdata.todos=updatedTodos;
        localStorage.setItem(state.username,JSON.stringify(userdata));
        return{
            ...state,
            todos:updatedTodos
        };
    }
    else if(action.type==='remove-todo')
    {
        let updatedTodos=state.todos.filter(item=>{
            return item.id!==action.key;
        })
        let userdata=JSON.parse(localStorage.getItem(state.username));
        userdata.todos=updatedTodos;
        localStorage.setItem(state.username,JSON.stringify(userdata));
        return{
            ...state,
            todos:updatedTodos
        }
    }
    else if(action.type==='logout')
    {
        return {
            isAuthenticated:false,
            todos:[],
            username:'',
            errorMessage:''
        }
    }
    else if(action.type==='login')
    {
        let user = JSON.parse(localStorage.getItem(action.user.email))
        if(user){
            if(action.user.password===user.password)
            {
                return {
                    isAuthenticated:true,
                    todos:user.todos,
                    username:user.email,
                    errorMessage:''
                }
            }
            else
            {
                return{
                    isAuthenticated:false,
                    todos:[],
                    username:'',
                    errorMessage:'User not found'
                }
            }
        }
        return{
            isAuthenticated:false,
            todos:[],
            username:'',
            errorMessage:'User not found'
        }
        
    }
    else if(action.type==='signup')
    {
        let user = JSON.parse(localStorage.getItem(action.user.email));
        action.user['todos'] = []
        if(user)
        {
            return{
                isAuthenticated:false,
                todos:[],
                username:'',
                errorMessage:'user already exist'
            }
        }
        else{
            localStorage.setItem(action.user.email,JSON.stringify(action.user))
            return {
                isAuthenticated:true,
                todos:[],
                username:action.user.email,
                errorMessage:''
            }
        }
    }
    return state;
}
const store=legacy_createStore(todoReducer);

export default store;