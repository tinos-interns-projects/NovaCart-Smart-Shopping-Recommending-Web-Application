import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function StaffLogin({ setStaffUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/staff-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStaffUser(data.username);
        localStorage.setItem("staffUser", data.username);
        localStorage.setItem("staffEmail", data.email || "");
        navigate("/staff-dashboard");
      } else {
        setError(data.message || "Invalid staff credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <div className="login-left-content">
            <h1>Staff Login</h1>
            <p>Access the staff dashboard to manage products</p>
          </div>
        </div>
        <div className="login-right">
          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Staff Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className="terms">
              Staff access only. Unauthorized access is prohibited.
            </p>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Staff Login"}
            </button>
          </form>

          <div className="register-link">
            <Link to="/login">Back to Customer Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffLogin;
