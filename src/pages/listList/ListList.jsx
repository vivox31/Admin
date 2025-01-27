import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";


export default function ProductList() {

  const {lists,dispatch}  = useContext(ListContext);
  useEffect(()=>{
     getLists(dispatch);
    console.log(lists);
  },[dispatch])



  const handleDelete = (id) => {
   deleteList(id,dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "Title",
      headerName: "Title",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },

    { field: "type", headerName: "isSeries", width: 120 },


  
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <Link to={{pathname:"/list/" + params.row._id, state:{data:params.row}}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={r=>r._id}
      />
    </div>
  );
}
