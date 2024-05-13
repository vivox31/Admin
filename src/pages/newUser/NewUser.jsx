import { useContext, useState } from "react";
import "./newUser.css";
import { UserContext } from "../../context/userContext/UserContext";
import { CreateUser } from "../../context/userContext/apiCalls";

export default function NewUser() {
  const [data, setData] = useState({});
  const {dispatch} = useContext(UserContext);
  const handleOnchange = (e)=>{
    const value = e.target.value
    setData({...data , [e.target.name]: value});
  }

  const handleSubmit = (e)=>{
     e.preventDefault();
    CreateUser(data,dispatch);
    
  }
  console.log(data);

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" name="username" onChange={handleOnchange} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" value={'vishal'} placeholder="John Smith"  />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name="email" onChange={handleOnchange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password"  name="password" onChange={handleOnchange}/>
        </div>
        
        {/* <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div> */}
        <div className="newUserItem">
          <label>isAdmin</label>
          <select className="newUserSelect" name="isAdmin" id="active" onChange={handleOnchange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
