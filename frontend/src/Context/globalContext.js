import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const registerUser = async (user) => {
    try {
      await axios.post(`${BASE_URL}auth/register`, user);
      getUsers();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const loginUser = async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, user);
      getUsers();
      return response.data;
    } catch (err) {
      setError(err.response.data.error);
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

  //calculate incomes
  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const getIncomes = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}incomes/user/${userId}`);
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
      getIncomes(); // Sau khi cập nhật thành công, cần gọi hàm để lấy lại danh sách thu nhập mới
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        registerUser,
        loginUser,
        deleteIncome,
        updateIncome,
        totalIncome,
        setError,
        incomes,
        users,
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
