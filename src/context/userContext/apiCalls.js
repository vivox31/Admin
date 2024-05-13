
import axios from "axios";
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess } from "./UserActions";


export const getUsers = async(dispatch)=>{
    console.log('gornedban')
    dispatch(getUsersStart());

    try{
        const res = await axios.get("https://netflix-1ibe.onrender.com/api/user/", 
        {headers : 
            {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},                            
          });
           console.log(res.data);
           dispatch(getUsersSuccess(res.data));              
    }catch(err){
        dispatch(getUsersFailure());
    }
}

export const deleteUsers = async(id,dispatch)=>{
    dispatch(deleteUserStart());

    try{
         await axios.delete("https://netflix-1ibe.onrender.com/api/user/"+id, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
          dispatch(deleteUserSuccess(id));              
    }catch(err){
        dispatch(deleteUserFailure());
    }
}

export const CreateUser = async(user,dispatch)=>{
    dispatch(createUserStart());

    try{
        const res = await axios.post("https://netflix-1ibe.onrender.com/api/auth/register",user, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(createUserSuccess(res.data));              
    }catch(err){
        dispatch(createUserFailure());
        console.log(err);
    }
}

// export const updateUser= async(movie,dispatch)=>{
//     dispatch(updateUserStart());

//     try{
//          const res = await axios.put("https://netflix-1ibe.onrender.com/api/movie/"+movie._id, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('User')).accesstoken},
                            
//           });
        
//           dispatch(updateUserSuccess(res.data));              
//     }catch(err){
//         dispatch(updateUserFailure());
//     }
// }