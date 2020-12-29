import firebase from '../firebase';
import { useHistory } from 'react-router-dom'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
export const LoginId="Login";
export const LogoutId="Logout";
export const saveUserLogin=(id)=>({type:LoginId,id:id})
export const UserLogout=()=>({type:LogoutId});

export const Login=(email,password)=>{
    
    return (dispatch)=>{
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
           
         dispatch(saveUserLogin(user.uid));
         })
        .catch((error) => {
         
          console.log(error)
        });
    }
}

export const Logout=()=>{
    return (dispatch)=>{
                firebase.auth().signOut().then(()=>{
                    dispatch(UserLogout());
                });
    }
}

const initialState={
    id:""
}
const reducer =(state=initialState,action)=>{
        switch(action.type){
            case LoginId:
                return {
                   id: action.id
                };
            case LogoutId :
                return {};
            
            default:
                    return state;
        }
}
const store=createStore(reducer,applyMiddleware(thunk));
export default store;