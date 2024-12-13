import { useState, useEffect } from 'react';
import '../assets/shortedPage.css';
import { Link } from "react-router-dom";

function ShortenedLinkForm() {
    const [originalLink, setOriginalLink] = useState('');
    const [shortenedLink, setShortenedLink] = useState('');
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 4; 

    const userID = localStorage.getItem('token') || 1;

    useEffect(() => {
        // Fetch the history of shortened links for the logged-in user
        fetch(`https://localhost:8386/shortedMapLinks/${userID}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch history');
                }
                return response.json();
            })
            .then((data) => {
                const sortedHistory = data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
                setHistory(sortedHistory);
            })
            .catch((error) => {
                setError(error.message || 'An error occurred while fetching history');
            });
    }, [shortenedLink, userID]);

    const handleShortenLink = (event) => {
        event.preventDefault();

        if (!originalLink) {
            setMessage('Please enter an original link');
            return;
        }

        fetch('https://localhost:8386/createShortedLink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                originalLink: originalLink,
                userID: userID,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create shortened link');
                }
                return response.text(); // Assuming the response is plain text
            })
            .then((data) => {
                setShortenedLink(data);
                setMessage('Shortened link generated successfully!');
                setOriginalLink(''); // Clear the input field

                // Add the new link to the top of the history
                const newHistoryItem = {
                    id: Date.now(), // Generate a temporary ID
                    originalLink: originalLink,
                    shortedLink: data,
                    createAt: new Date().toISOString(), // Current timestamp
                };
                setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
            })
            .catch((error) => {
                setMessage(error.message || 'An error occurred, please try again');
            });
    };

    const handleRedirect = (shortedLink) => {
        fetch(`https://localhost:8386/redirectLink/${shortedLink}?userID=${userID}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch original link');
                }
                return response.text(); // Assuming the response is plain text
            })
            .then((originalLink) => {
                // Redirect the browser to the original link
                window.location.href = originalLink;
            })
            .catch((error) => {
                setError(error.message || 'An error occurred while redirecting');
            });
    };

    const deleteLink = (id) => {
        fetch(`https://localhost:8386/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete link');
                }
                //update after delete succeed
                setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
            })
            .catch((error) => {
                setError(error.message || 'An error occurred while deleting the link');
            });
    };



    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHistory = history.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="shortened-link-main-container">
            <div className="shortened-link-container">
                <h2>Shortened Link Generator</h2>
                <Link to="/login">
                    <button className="logout-button">Logout</button>
                </Link>

                {message && <p className="message">{message}</p>}
                <form onSubmit={handleShortenLink}>
                    <div className="form-group">
                        <label htmlFor="originalLink">Original Link</label>
                        <input
                            type="url"
                            id="originalLink"
                            value={originalLink}
                            onChange={(e) => setOriginalLink(e.target.value)}
                            placeholder="Enter the original link"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-generate">
                        Generate Shortened Link
                    </button>
                </form>
                {shortenedLink && (
                    <div className="shortened-link-result">
                        <p>Shortened Link:</p>
                        <a
                            href={`#`}
                            onClick={() => handleRedirect(shortenedLink)}
                        >
                            {`https://localhost:8386/${shortenedLink}`}
                        </a>
                    </div>
                )}
            </div>
            <div className="shortened-link-history">
                <h2>Your Shortened Links History</h2>
                {error && <p className="error">{error}</p>}
                {history.length > 0 ? (
                    <>
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Original Link</th>
                                    <th>Shortened Link</th>
                                    <th>Created At</th>
                                    <th> Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentHistory.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>
                                            <a href={item.originalLink} target="_blank" rel="noopener noreferrer">
                                                {item.originalLink}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href={`#`}
                                                onClick={() => handleRedirect(item.shortedLink)}
                                            >
                                                {`https://localhost:8386/${item.shortedLink}`}
                                            </a>
                                        </td>
                                        <td>{new Date(item.createAt).toLocaleString()}</td>
                                        <td><button onClick={() => deleteLink(item.id)}> {"Delete"} </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(history.length / itemsPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No history found.</p>
                )}
            </div>
        </div>
    );
}

export default ShortenedLinkForm;
