import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styling/Home.css';
import logo from '../images/kdlogo.jpg'

const Home = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (
            (username === 'KDCHATS' || username === 'kdchats' || username === 'Kdchats') &&
            (password === 'Dhanush@1438' || password === '1234567899')
        ) {
            navigate('/BusinessPartnerPage');
        } else {
            setError('Invalid login details');
        }
    };
    

    return (
        <div className="home-container">
            <div className="overlay"></div>
            <div className="content">
                <div className="logo">
                    <img src={logo} alt="" style={{borderRadius:'50%'}}/>
                </div>
                <h2 className="subtitle">Where Local Cravings Meet Master Cooks</h2>
                <div className="buttons">
                    <button className="btn customer-btn" onClick={() => navigate("/CostomerPage")}>I'm a Customer</button>
                    <button className="btn business-btn" onClick={() => setShowModal(true)}>I'm a Business Partner</button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay active" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-header">Business Partner Login</h3>
                        <input
                            className="modal-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="modal-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="error-message">{error}</p>}
                        <div className="modal-buttons">
                            <button className="modal-btn login-btn" onClick={handleLogin}>Login</button>
                            <button className="modal-btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
