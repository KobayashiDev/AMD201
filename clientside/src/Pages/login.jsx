import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css';
import backgroundImage from '../assets/registerr.png'; // Import hình ?nh
function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // React Router hook for navigation


    const handleLogin = (event) => {
        event.preventDefault();

        if (username === '' || password === '') {
            setError('Please enter both username and password');
        } else {
            fetch('https://localhost:8386/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Login failed, please try again');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.userID) {
                        localStorage.setItem('token', data.userID);
                        alert("Login successful! Your userID is: " + localStorage.getItem("token"));
                        navigate('/shortedPage'); // Navigate to shortedPage on success
                    } else {
                        setError('Login failed, please try again');
                    }
                })
                .catch((error) => {
                    setError(error.message || 'An error occurred, please try again');
                });
        }
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-login">
                    Login
                </button>
            </form>
            <div className="register-link">
                <p>Do not have an account?</p>
                <a href="/register">Register here</a>
            </div>
        </div>
    );
}


export default LoginPage;
