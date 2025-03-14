import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch(`${API_URL}/vendor/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log("API Response:", data);
    
            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }
    
            alert("Login Success");
            localStorage.setItem("loginToken", data.token);
            setEmail("");
            setPassword("");
            showWelcomeHandler();
    
            if (!data.vendorId) {
                console.error("Vendor ID is missing in login response");
                alert("Vendor ID is missing. Please try again.");
                return;
            }
    
            console.log("Checking for VendorID:", data.vendorId);
            const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${data.vendorId}`);
    
            if (!vendorResponse.ok) {
                throw new Error("Failed to fetch vendor details");
            }
    
            const vendorData = await vendorResponse.json();
            console.log("Vendor Data:", vendorData);
    
            // ✅ If no firm exists, redirect the vendor to Add Firm page
            if (!vendorData?.vendor?.firm || vendorData.vendor.firm.length === 0) {
                console.warn("Vendor firm data is missing");
                alert("You haven't added a firm yet. Redirecting to Add Firm page...");
                localStorage.setItem("firmId", ""); // Clear previous firm data
                localStorage.setItem("firmName", "");
                window.location.href = "/add-firm"; // Redirect to Add Firm page
                return;
            }
    
            const vendorFirmId = vendorData.vendor.firm[0]._id;
            const vendorFirmName = vendorData.vendor.firm[0].firmName;
            console.log("My firmName is", vendorFirmName);
            console.log("Checking for FirmId", vendorFirmId);
    
            localStorage.setItem("firmId", vendorFirmId);
            localStorage.setItem("firmName", vendorFirmName);
            window.location.reload();
    
        } catch (error) {
            console.error("Login Error:", error.message);
            alert(error.message);
        } finally {
            setLoading(false);
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
                /><br />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="off"
                /><br />

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
