import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovies, getMovies } from "../../context/movieContext/apiCalls";
import { getStorage, ref,deleteObject } from "firebase/storage";

export default function ProductList() {

  const {movies,dispatch}  = useContext(MovieContext);
  useEffect(()=>{
    getMovies(dispatch);
    console.log(movies);
  },[dispatch])


 const deleteFromFirebase = (data)=>{
  const firebaseStorageUrl = data

// Decode the URL-encoded path
const decodedPath = decodeURIComponent(firebaseStorageUrl.split("%2F")[1]);

// Extract the file name
const fileName = decodedPath.split("?")[0];

// console.log("File Name:", fileName);
  
  const storage = getStorage();
   const filetodelete = ref(storage, `items/${fileName}`);

   deleteObject(filetodelete).then(()=>{
    console.log(fileName,"deleted successfully");
   }).catch((err)=>{
    console.log(err);
   })



  
  console.log("File Name:", fileName);
 }
  const handleDelete = (movie) => {
    

    // here i am delete all the visual files of the movie from firebase storage
    deleteFromFirebase(movie.img);
    deleteFromFirebase(movie.imgSm);
    deleteFromFirebase(movie.imgTitle);
    deleteFromFirebase(movie.trailer);
    deleteFromFirebase(movie.video);
    /////////////////////////////////////////////////////////

   deleteMovies(movie._id,dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movies",
      headerName: "Movies",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },


  
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <Link to={{pathname:"/product/" + params.row._id, state:{data:params.row}}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r=>r._id}
      />
    </div>
  );
}
