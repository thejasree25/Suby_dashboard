import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const Login = ({ showWelcomeHandler }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Fix: Added loading state

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (response.ok) {
                alert('Login Success');
                setEmail("");    
                setPassword(""); 
                localStorage.setItem('loginToken', data.token);
                showWelcomeHandler();  // ✅ Show the Welcome component after login
            }
            const vendorId = data.vendorId;
            console.log("checking for VendorID",vendorId)
            const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
            const vendorData=await vendorResponse.json();
           console.log(vendorData);
            if(vendorResponse.ok ){
                const vendorFirmId=vendorData.vendorFirmId;
                const vendorFirmName=vendorData.vendor.firm[0].firmName;
                console.log("my firmName is",vendorFirmName)
                console.log("checking for FirmId",vendorFirmId);
                localStorage.setItem('firmId',vendorFirmId)
                localStorage.setItem('firmName',vendorFirmName)
                window.location.reload();
            }
            else {
                console.error("Firm ID is missing in vendor response.");
            }
        } catch (error) {
          alert("login fail")
        } 
    };

    return (
        <div className="loginSection">
            <form className="authForm" onSubmit={loginHandler}>
                <h3>Vendor Login</h3>

                <label>Email</label>
                <input 
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                /><br/>

                <label>Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="off"
                /><br/>

                <div className="btnSubmit">
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
