import { useState } from 'react';
import '../assets/register.css';
function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();

        if (username === '' || password === '') {
            setMessage('Please enter both username and password');
        } else {
            fetch('https://localhost:8386/register', {
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
                        throw new Error('Registration failed, please try again');
                    }
                    return response.json();
                })
                .then((data) => {
                    setMessage(
                        `Registration successful! Your userID is: ${data.userID}, Username: ${data.username}`
                    );
                })
                .catch((error) => {
                    setMessage(error.message || 'An error occurred, please try again');
                });
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleRegister}>
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
                <button type="submit" className="btn-register">
                    Register
                </button>
            </form>
            <div className="login-link">
                <p>Already have an account?</p>
                {/* Add a link to the login page */}
                <a href="/login">Login here</a>
            </div>
        </div>
    );
}

export default RegisterPage;
