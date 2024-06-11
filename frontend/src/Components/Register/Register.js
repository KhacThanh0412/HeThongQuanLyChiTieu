import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../Context/globalContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register({ onLogin, toggleForm }) {
  const { registerUser, setError, error } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ username, email, password });
      console.log("====>" + response.error);
      if (response && response.error) {
        toast.error("Lỗi sai rồi nè");
        return;
      }
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        toggleForm();
      }, 2000);
    } catch (err) {
      console.log("Error:", err);
      console.log("Error response:", err.response);
      console.log("Error response data:", err.response?.data);
      toast.error(err.response?.data?.error || "Lỗi nè");
      setError(err.response?.data?.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RegisterFormStyled>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <a href="#" onClick={toggleForm}>
            Login here
          </a>
        </p>
      </form>
      <ToastContainer />
    </RegisterFormStyled>
  );
}

const RegisterFormStyled = styled.div`
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

  .error {
    color: red;
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

export default Register;
