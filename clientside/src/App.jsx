import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/homePage";
import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register";
import ShortenedLinkForm from "./Pages/shortenPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/shortedPage" element={<ShortenedLinkForm />} />
            </Routes>
        </Router>
    );
}
