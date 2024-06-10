import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { MainLayout } from "./Styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Login from "./Components/Login/Login";
import { useGlobalContext } from "./Context/globalContext";

function App() {
  const [active, setActive] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const global = useGlobalContext();
  console.log(global);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa ở đây
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const displayData = () => {
    if (isLoggedIn) {
      switch (active) {
        case 1:
          return <Dashboard />;
        case 2:
          return <Dashboard />;
        case 3:
          return <Income />;
        case 4:
          return <Expenses />;
        default:
          return <Dashboard />;
      }
    } else {
      // Nếu chưa đăng nhập, hiển thị form đăng nhập
      return <Login onLogin={() => setIsLoggedIn(true)} />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled className="App">
      {orbMemo}
      <MainLayout>
        {isLoggedIn ? (
          <>
            <Navigation active={active} setActive={setActive} />
            <main>{displayData()}</main>
          </>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} onRegister={() => {}} />
        )}
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
