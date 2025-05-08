import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "./Header";
function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/votacao/api/signup/', { username, password });
            alert('Signup successful!');
            navigate('/');
        } catch (error) {
            alert('Signup failed');
        }
    };
    return (
        <div className="container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>Username: </label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password: </label> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
            <Header></Header>
        </div>
 );
}
export default Signup;