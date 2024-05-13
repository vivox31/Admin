import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess, updateListFailure, updateListStart, updateListSuccess } from "./ListAction";

import axios from "axios";

export const getLists = async(dispatch)=>{
    dispatch(getListsStart());

    try{
        const res = await axios.get("https://netflix-1ibe.onrender.com/api/list/", {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        //    console.log("res"+res.data);
          dispatch(getListsSuccess(res.data));              
    }catch(err){
        dispatch(getListsFailure());
    }
}

export const deleteList = async(id,dispatch)=>{
    dispatch(deleteListStart());

    try{
         await axios.delete("https://netflix-1ibe.onrender.com/api/list/"+id, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(deleteListSuccess(id));              
    }catch(err){
        dispatch(deleteListFailure());
    }
}

export const CreateList = async(list,dispatch)=>{
    dispatch(createListStart());

    try{
        const res = await axios.post("https://netflix-1ibe.onrender.com/api/list",list, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(createListSuccess(res.data));              
    }catch(err){
        dispatch(createListFailure());
        console.log(err);
    }
}


export const updateList = async(id, body, dispatch)=>{
    dispatch(updateListStart());

    try{
        const res =  await axios.put("https://netflix-1ibe.onrender.com/api/list/"+id,body, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(updateListSuccess(res.data));              
    }catch(err){
        dispatch(updateListFailure());
    }
}