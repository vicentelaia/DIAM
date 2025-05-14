import {useState, useEffect} from "react";
import axios from 'axios';
//import './simple_style.css';
import {useNavigate} from "react-router-dom"
import Header from "./Header";

const SimpleLoginManager = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  useEffect(() => {
   axios.get('http://localhost:8000/api/auth/user/',{withCredentials: true})
   .then( response => setUsername(response.data.username))
   .catch( error => console.log("User not logged in"));
 }, []);

  const handleLogout = async () => {
 try {
  await axios.post('http://localhost:8000/api/auth/logout/', {}, {withCredentials: true});
    setUsername(null);
 } catch (error) {
    alert('Logout failed');
 }
 };

 return (

 <div className="container">

    {username ?
    <><p>Olá {username}!</p>
        <button onClick={handleLogout}>Logout</button></>:
    <><p>Olá, não estás logado(a)!</p>
        <button onClick={()=>navigate("/login")}>Login</button>
        <button onClick={()=>navigate("/register")}>SignUp</button></>
    }
    <Header></Header>

 </div>
 );
}
export default SimpleLoginManager;