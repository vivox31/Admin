import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from "./ListAction";

import axios from "axios";

export const getLists = async(dispatch)=>{
    dispatch(getListsStart());

    try{
        const res = await axios.get("http://localhost:8800/api/list/", {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
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
         await axios.delete("http://localhost:8800/api/list/"+id, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(deleteListSuccess(id));              
    }catch(err){
        dispatch(deleteListFailure());
    }
}

export const CreateList = async(list,dispatch)=>{
    dispatch(createListStart());

    try{
        const res = await axios.post("http://localhost:8800/api/list",list, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(createListSuccess(res.data));              
    }catch(err){
        dispatch(createListFailure());
        console.log(err);
    }
}