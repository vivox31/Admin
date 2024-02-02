import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMovieFailure, getMovieStart, getMovieSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieAction"
import axios from "axios";
export const getMovies = async(dispatch)=>{
    dispatch(getMovieStart);

    try{
        const res = await axios.get("http://localhost:8800/api/movie/", {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        //    console.log("res"+res.data);
          dispatch(getMovieSuccess(res.data));              
    }catch(err){
        dispatch(getMovieFailure());
    }
}

export const deleteMovies = async(id,dispatch)=>{
    dispatch(deleteMovieStart());

    try{
         await axios.delete("http://localhost:8800/api/movie/"+id, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(deleteMovieSuccess(id));              
    }catch(err){
        dispatch(deleteMovieFailure());
    }
}

export const CreateMovie = async(movie,dispatch)=>{
    dispatch(createMovieStart());

    try{
        const res = await axios.post("http://localhost:8800/api/movie",movie, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(createMovieSuccess(res.data));              
    }catch(err){
        dispatch(createMovieFailure());
        console.log(err);
    }
}

export const updateMovie= async(movie,dispatch)=>{
    dispatch(updateMovieStart());

    try{
         const res = await axios.put("http://localhost:8800/api/movie/"+movie._id, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(updateMovieSuccess(res.data));              
    }catch(err){
        dispatch(updateMovieFailure());
    }
}