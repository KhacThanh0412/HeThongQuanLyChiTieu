import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../Context/globalContext";

function Login() {
  const { registerUser, setError } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Login ne", username);
      await registerUser({ username, email, password });
    } catch (err) {
      console.log("Error:", err); // Log the error object
      console.log("Error response:", err.response); // Log the response property of the error object
      console.log("Error response data:", err.response?.data); // Log the data property of the response property (using optional chaining)
      setError(err.response?.data?.error); // Update the error state
    }
  };

  return (
    <LoginFormStyled>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </LoginFormStyled>
  );
}

const LoginFormStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  /* Chiều cao 100% của viewport */
  width: 100vw;  /* Chiều rộng 100% của viewport */
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
`;

export default Login;
