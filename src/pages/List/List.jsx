import { Link, useLocation } from "react-router-dom";
import "./List.css";
import { Publish } from "@material-ui/icons";


export default function Product() {
    //here i am fetching movie sent by productList page through Link
    const location = useLocation();
    const list = location.state.data;
    console.log(list);

    
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
                  <input type="text" placeholder={list.title} />
                  <label>Type</label>
                      <input type="text" placeholder={list.type} />
                   <label>Genre</label>
                      <input type="text" placeholder={list.genre} /> 
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
