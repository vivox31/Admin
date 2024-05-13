import { useContext, useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { CreateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { CircularProgress } from "@material-ui/core";



export default function NewProduct() {
  const [movie, setMovie] = useState(null)
  
  const [img, setImg] = useState(null)
  const [imgTitle, setImgTitle] = useState(null)
  const [imgSm, setImgSm] = useState(null)
  const [trialer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)
  const [uploaded, setUploaded] = useState(0);

  const {dispatch} = useContext(MovieContext);
  

  const handleOnChange = (e)=>{
        const value = e.target.value;
        setMovie({...movie,[e.target.name]: value})
        
  }
  const [progress, setProgress] = useState(100)
const upload = (items)=>{

  items.forEach(item => {
    
        // code for uploading files to firebase storage refer to- documentation
        const filename = new Date().getTime() + item.label + item.file.name
      const storageRef = ref(storage,`/items/${filename}`);
    const uploadTask =  uploadBytesResumable(storageRef,item.file);
    uploadTask.on('state_changed', (snapshot)=>{
       setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log('Upload is ' + progress + '% done');
      
    },(error)=>{
        console.log(error);
    },
    ()=>{

      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setMovie(prev=>{
          return {...prev, [item.label]: downloadURL};
        })
        setUploaded(prev=>prev+1);
    }
    )

      // console.log(item)
  });

});

}
  const handleUpload = (e)=>{
    e.preventDefault();

    upload([
      {file: img , label:"img"},
      {file: imgTitle , label:"imgTitle"},
      {file: imgSm , label:"imgSm"},
      {file: trialer , label:"trailer"},
      {file: video , label:"video"},

    ])
   
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
     CreateMovie(movie,dispatch)
     alert('movie created successfully')
  }

  console.log(movie)
 

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">

        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name='img' onChange={(e)=>setImg(e.target.files[0])} />
        </div>

        <div className="addProductItem">
          <label>Title Imge</label>
          <input type="file" id="titleimg"  name='imgTitle'  onChange={(e)=>setImgTitle(e.target.files[0])}/>
        </div>

        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="file" id="imgSm" name='imgSm'  onChange={(e)=>setImgSm(e.target.files[0])} />
        </div>

        <div className="addProductItem">
          <label>Title </label>
          <input type="text" id="title"  placeholder="john wick" name='title'onChange={handleOnChange}/>
        </div>

        <div className="addProductItem">
          <label>discription</label>
          <input type="text" id="desc" placeholder="description" name='desc'onChange={handleOnChange}/>
        </div>

        <div className="addProductItem">
          <label>genre</label>
          <input type="text" id="genre" placeholder="Action" name='genre'onChange={handleOnChange}/>
        </div>

        <div className="addProductItem">
          <label>year </label>
          <input type="text" id="year"  placeholder="2002" name='year'onChange={handleOnChange}/>
        </div>

        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" id="duration" placeholder="Duration"  name="duration"onChange={handleOnChange}/>
        </div>

        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" id="limit" placeholder="Limit" name='limit' onChange={handleOnChange}/>
        </div>

        <div className="addProductItem">
          <label>Is Series</label>
         <select  id="isSeries" name="isSeries">
          <option value="false">No</option>
          <option value="true">yes</option>
         </select>
        </div>

        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" id="trailer"name='trailer'  onChange={(e)=>setTrailer(e.target.files[0])}/>
        </div>

        <div className="addProductItem">
          <label>video</label>
          <input type="file" id="video" name="video"   onChange={(e)=>setVideo(e.target.files[0])}/>
        </div>
        {(uploaded >= 5)?
        (<button className="addProductButton" onClick={handleSubmit}>Create</button>):
       (<button className="addProductButton" onClick={handleUpload}>Upload</button>)
        }
      </form>
      <CircularProgress variant="determinate" className="progressbar" value={(progress != 100) ? progress:0} />

    </div>
  );
}
