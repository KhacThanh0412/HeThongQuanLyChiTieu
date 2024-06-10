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
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    font-weight: bold;
  }

  input {
    padding: 8px;
    margin-top: 5px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export default Login;
