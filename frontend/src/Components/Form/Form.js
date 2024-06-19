import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../Context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../Utils/Icons";

function Form() {
  const { addIncome, getIncomes, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amountReceived: "",
    dateReceived: "",
    typeReceviced: "",
    reason: "",
  });

  const { title, amountReceived, dateReceived, typeReceviced, reason } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && amountReceived && dateReceived && typeReceviced) {
      addIncome(inputState);
      setInputState({
        title: "",
        amountReceived: "",
        dateReceived: "",
        typeReceviced: "",
        reason: "",
      });
    } else {
      setError("Vui lòng điền đầy đủ các trường bắt buộc.");
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Tiêu đề"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amountReceived}
          type="text"
          name={"amountReceived"}
          placeholder={"Số tiền"}
          onChange={handleInput("amountReceived")}
        />
      </div>
      <div className="input-control">
        <DatePicker
          id="dateReceived"
          placeholderText="Ngày"
          selected={dateReceived}
          dateFormat="dd/MM/yyyy"
          onChange={(dateReceived) => {
            setInputState({ ...inputState, dateReceived: dateReceived.toISOString() });
          }}
        />
      </div>
      <div className="selects input-control">
        <select
          required
          value={typeReceviced}
          name="typeReceviced"
          id="typeReceviced"
          onChange={handleInput("typeReceviced")}
        >
          <option value="" disabled>
            Chọn
          </option>
          <option value="Lương">Lương</option>
          <option value="Thu nhập ngoài">Thu nhập ngoài</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          name="reason"
          value={reason}
          placeholder="Mô tả"
          id="reason"
          cols="30"
          rows="4"
          onChange={handleInput("reason")}
        ></textarea>
      </div>
      <div className="submit-btn">
        <Button
          name={"Thêm thu nhập"}
          icon={plus}
          bPad={".8rem 1.6rem"}
          bRad={"30px"}
          bg={"var(--color-accent"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;
export default Form;
