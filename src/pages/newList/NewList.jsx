import { useContext, useEffect, useState } from "react";
import "./newList.css";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { CreateMovie, getMovies } from "../../context/movieContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { CreateList } from "../../context/listContext/apiCalls";

export default function NewProduct() {
  const [list, setList] = useState(null);
  const {dispatch} = useContext(ListContext);
  const {movies,dispatch:dispatchMovies} = useContext(MovieContext);
  

  useEffect(()=>{
  getMovies(dispatchMovies);

  },[dispatchMovies]);


  

  const handleOnChange = (e)=>{
        const value = e.target.value;
        setList({...list,[e.target.name]: value})

        
  }

  const handleSelect = (e)=>{
   let value = Array.from(e.target.selectedOptions, (option)=>option.value);
   setList({...list,[e.target.name]: value})
   console.log(list);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    CreateList(list,dispatch)
  }

  // console.log(list)
 

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
      <div className="fromLeft">
        <div className="addProductItem">
          <label>Title </label>
          <input type="text" id="title"  placeholder="john wick" name='title'onChange={handleOnChange}/>
        </div>

        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" id="genre" placeholder="Action" name='genre'onChange={handleOnChange}/>
        </div>

        <div className="addProductItem">
          <label>type</label>
         <select  id="type" name="type">
          <option value="movie">Movie</option>
          <option value="series">Series</option>
         </select>
        </div>
        </div>
        <div className="fromRight">
        <div className="addProductItem">
          <label>Content</label>
         <select multiple id="content" name="content" onChange={handleSelect} style={{height:"280px"}}>
          {movies.map((movie) => (
            <option key ={movie._id} value={movie._id}>{movie.title}</option>
          ))}
          
          
         </select>
        </div>
        </div>

        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
        
      </form>
    </div>
  );
}
