import { loginFailure, loginStart, loginSuccess } from "./AuthActions"
import axios from "axios"
export const login = async(user, dispatch)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post('http://localhost:8800/api/auth/login',user);
        res.data.isAdmin &&  dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure());
    }
}