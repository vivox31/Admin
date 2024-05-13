import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMovieFailure, getMovieStart, getMovieSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieAction"
import axios from "axios";
export const getMovies = async(dispatch)=>{
    dispatch(getMovieStart);

    try{
        const res = await axios.get("https://netflix-1ibe.onrender.com/api/movie/", {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
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
         await axios.delete("https://netflix-1ibe.onrender.com/api/movie/"+id, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(deleteMovieSuccess(id));              
    }catch(err){
        dispatch(deleteMovieFailure());
    }
}

export const CreateMovie = async(movie,dispatch)=>{
    dispatch(createMovieStart());

    try{
        const res = await axios.post("https://netflix-1ibe.onrender.com/api/movie",movie, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
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
         const res = await axios.put("https://netflix-1ibe.onrender.com/api/movie/"+movie._id, {headers : {token : "bearer " + JSON.parse(localStorage.getItem('user')).accesstoken},
                            
          });
        
          dispatch(updateMovieSuccess(res.data));              
    }catch(err){
        dispatch(updateMovieFailure());
    }
}