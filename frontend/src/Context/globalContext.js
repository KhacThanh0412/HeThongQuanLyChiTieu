import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([])
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  // User
  const registerUser = async (user) => {
    try {
      const usersResponse = await axios.get(`${BASE_URL}auth/users`);
      const users = usersResponse.data;
      const emailExists = users.some((u) => u.email === user.email);
      if (emailExists) {
        return { error: "Email already exists" };
      }

      await axios.post(`${BASE_URL}auth/register`, user);
      getUsers();
      return {};
    } catch (err) {
      return { error: err.response?.data?.error || "Registration failed" };
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, user);
      if (response.data) {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(response.data)); // Lưu thông tin người dùng vào localStorage
        setCurrentUser(response.data); // Lưu thông tin người dùng vào state
        getUsers();
      }
      return response.data;
    } catch (err) {
      setError(err.response.data.error);
      throw err;
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}auth/users`);
      setUsers(response.data);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  //incomes
  const addIncome = async (income) => {
    try {
        const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
        const response = await axios.post(`${BASE_URL}add-income`, { ...income, userId });
        getIncomes();
    } catch (err) {
        setError(err.response ? err.response.data.error : 'An error occurred');
    }
};

  const getIncomes = async (userId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
      const response = await axios.get(`${BASE_URL}income/user/${userId}`);
      setIncomes(response.data);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}income/${id}`);
      getIncomes();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const updateIncome = async (incomeId, updatedIncomeData) => {
    try {
      await axios.put(`${BASE_URL}updateIncome/${incomeId}`, updatedIncomeData);
      getIncomes();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amountReceived;
    });

    return totalIncome;
  };

  //expenses
  const addExpenditure = async (expenditure) => {
    try {
      const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
      const response = await axios.post(`${BASE_URL}add-expenses`, { ...expenditure, userId });
      getExpenditures();
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  const getExpenditures = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("currentUser")).user._id;
      const response = await axios.get(`${BASE_URL}expenses/user/${userId}`);
      setExpenses(response.data);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const deleteExpenditure = async (id) => {
    try {
      await axios.delete(`${BASE_URL}deleteExpenses/${id}`);
      getExpenditures();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const updateExpenditure = async (expenditureId, updatedExpenditureData) => {
    try {
      await axios.put(`${BASE_URL}updateExpenses/${expenditureId}`, updatedExpenditureData);
      getExpenditures();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        //incomes
        addIncome,
        getIncomes,
        deleteIncome,
        updateIncome,
        totalIncome,
        incomes,
        //user
        registerUser,
        loginUser,
        currentUser,
        users,
        // Expenses
        addExpenditure,
        getExpenditures,
        deleteExpenditure,
        updateExpenditure,
        expenses,
        //error
        setError,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
