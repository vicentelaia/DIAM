import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
function Login() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   await axios.post('http://localhost:8000/votacao/api/login/', {username, password}, {withCredentials: true});
   alert('Login successful!');
   navigate('/');
 } catch (error) {
   alert('Login failed: ' + error.response.data.error);
 }
 };
 return (
  <div className="container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
     <label>Username: </label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
     <label>Password: </label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
     <button type="submit">Login</button>
    </form>
   <Header></Header>
 </div>
 );
}
export default Login;