import { Link, useLocation } from "react-router-dom";
import "./List.css";
import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";


export default function Product() {
    //here i am fetching movie sent by productList page through Link
    const location = useLocation();
    const list = location.state.data;
    // console.log(list);
    const [updatedList, setUpdatedList] = useState()
    const {movies,dispatch:dispatchMovies} = useContext(MovieContext);
    const {Lists, dispatch} = useContext(ListContext);
    useEffect(()=>{
        getMovies(dispatchMovies);
    },[dispatchMovies])

    const handleOnChange = (e) => {
        let value = e.target.value
        setUpdatedList({ ...updatedList, [e.target.name]: value })
        console.log(updatedList)
    }
    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setUpdatedList({ ...updatedList, [e.target.name]: value })
        console.log(updatedList);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        updateList(list._id,updatedList, dispatch);
    
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to="/newList">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">

                <div className="productTopRight">
                    <div className="productInfoTop">
                        {/* <img src={movie.img} alt="" className="productInfoImg" /> */}
                        <span className="productName">{list.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">&nbsp;{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre</span>
                            <span className="productInfoValue"> {list.genre}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input type="text" placeholder={list.title} name="title" onChange={handleOnChange} />
                        <label>Genre</label>
                        <input type="text" placeholder={list.genre} name="genre" onChange={handleOnChange} />

                        <label>Content</label>
                        <select multiple id="content" name="content" onChange={handleSelect} style={{ height: "280px" }}>
                            {movies.map((movie) => (
                                <option key={movie._id} value={movie._id}>{movie.title}</option>
                            ))}
                        </select>


                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton" onClick={handleSubmit}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
