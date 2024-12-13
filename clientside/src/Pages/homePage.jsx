import { Link } from "react-router-dom";
import '../assets/home.css'; // ???ng d?n CSS (n?u c�)
import backgroundImage from '../assets/frontend.png'; // Import h�nh ?nh

export default function HomePage() {
    return (
        <div
            className='con'
            style={{
                backgroundImage: `url(${backgroundImage})`, // S? d?ng ?nh l�m background
                backgroundSize: "cover", // Cho ?nh ph? to�n m�n h�nh
                backgroundPosition: "center", // C?n gi?a ?nh
                height: "100vh", // Chi?u cao to�n m�n h�nh
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // C?n n?i dung gi?a chi?u d?c
                alignItems: "center", // C?n n?i dung gi?a chi?u ngang
                color: "#fff", // M�u ch? tr?ng (n?u c?n)
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
