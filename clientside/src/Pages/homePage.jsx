import { Link } from "react-router-dom";
import '../assets/home.css'; // ???ng d?n CSS (n?u có)
import backgroundImage from '../assets/frontend.png'; // Import hình ?nh

export default function HomePage() {
    return (
        <div
            className='con'
            style={{
                backgroundImage: `url(${backgroundImage})`, // S? d?ng ?nh làm background
                backgroundSize: "cover", // Cho ?nh ph? toàn màn hình
                backgroundPosition: "center", // C?n gi?a ?nh
                height: "100vh", // Chi?u cao toàn màn hình
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // C?n n?i dung gi?a chi?u d?c
                alignItems: "center", // C?n n?i dung gi?a chi?u ngang
                color: "#fff", // Màu ch? tr?ng (n?u c?n)
            }}
        >
            <h1>Welcome to Shortened Link Service</h1>
            <div style={{ margin: "20px" }}>
                <Link to="/login">
                    <button style={{ marginRight: "10px", padding: "10px 20px" }}>Login</button>
                </Link>
                <Link to="/register">
                    <button style={{ padding: "10px 20px" }}>Register</button>
                </Link>
            </div>
        </div>
    );
}
