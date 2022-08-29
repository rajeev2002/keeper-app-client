import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import {IdContext} from "./IdContext";
import { useEffect } from "react";
import Spinner from "./Spinner";


const Login = props => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const [type,setType]=useState("password");
    const [errMessage,setErrMessage]=useState("");
    const navigate = useNavigate();
    const [id,updateId,isLoggedIn,setIsLoggedIn,isLoading,setIsLoading] = useContext(IdContext);

    useEffect(() => {
        if(!id)
      updateId(localStorage.getItem("KeeperAppId"));
    },[])

    
    const handleSubmit = async event => {

        setIsLoading(true);

        event.preventDefault();

        const url = "https://evening-sea-82640.herokuapp.com/api/users/" + props.type;

        var data = {
            id,
            username: username,
            email: email,
            password: password
        };

        if(props.type==="login")
        {
            data = {
                id,
                email: email,
                password: password
            };
        }

        try{
            const response = await axios.post(url, data);
            if(response)
              setIsLoading(false);
            updateId(response.data);
            setIsLoggedIn(prev => !prev);
            setEmail("");
            setPassword("");
            setUsername("");
            navigate("/");
        }
        catch(err){
            if(err.response)
               setErrMessage(err.response.data);
            else
              console.log(err);
        }
    }

    return ( <div>
        {isLoading?
        <Spinner />:
        <form onSubmit={handleSubmit}>
        {errMessage!==""&&<p>{errMessage}</p>}
            {props.type==="register"&&
               <div>
               <label>Username</label>
               <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
               </div>
            }
            <label>Email</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type={type} value={password} onChange={e => setPassword(e.target.value)}/>
            <p onClick={() => setType(type==="password"?"text":"password")}><VisibilityIcon /></p>
            <button type="submit">{props.type==="login"?"Login":"Register"}</button>
        </form>}
    </div> );
}
 
export default Login;