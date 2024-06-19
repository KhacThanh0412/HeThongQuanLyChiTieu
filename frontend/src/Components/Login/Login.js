import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../Context/globalContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onLogin, toggleForm }) {
  const { loginUser, setError } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const isLoggedIn = localStorage.getItem("userLoggedIn");
      if (isLoggedIn) {
        toast.success("Login successful! Redirecting to dashboard...");
        setTimeout(() => {
          onLogin();
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
      setError(err.response?.data?.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginFormStyled>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={toggleForm}>
            Register here
          </a>
        </p>
      </form>
      <ToastContainer />
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  padding: 20px;

  form {
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .success {
    color: green;
    margin-bottom: 20px;
  }

  .form-group {
    width: 100%;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
  }

  .password-input {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .password-input button {
    margin-left: 10px;
    padding: 12px;
    border: none;
    background: none;
    cursor: pointer;
    color: #007bff;
  }

  button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }

  p {
    margin-top: 20px;
    color: #333;
  }

  a {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
  }

  a:hover {
    color: #0056b3;
  }
`;

export default Login;
