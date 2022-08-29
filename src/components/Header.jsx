import React,{useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { IdContext } from "./IdContext";

function Header() {

  const [id, updateId, isLoggedIn, setIsLoggedIn] = useContext(IdContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(prev => !prev);
    updateId(null);
    console.log(id);
    navigate("/",{replace:true});
    window.location.reload();
  };

  return (
    <header>
      <div><h1>Keeper</h1></div>
      {!isLoggedIn? <div>
      <Button variant="outlined"><Link to="/login">Login</Link></Button>
      <span>or</span>
      <Button variant="outlined"><Link to="/register">Sign up</Link></Button>
      </div>:<div><Button variant="outlined" onClick={handleLogout}>logout</Button></div>}
    </header>
  );
}

export default Header;
