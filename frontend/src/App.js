import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { MainLayout } from "./Styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login"; // Import Login Component
import { useGlobalContext } from "./Context/globalContext";

function App() {
  const [active, setActive] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true); // State to toggle between login and register form
  const { currentUser } = useGlobalContext();

  useEffect(() => {
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
      if (showLoginForm) {
        return (
          <Login
            onLogin={() => setIsLoggedIn(true)}
            toggleForm={() => setShowLoginForm(false)}
          />
        );
      } else {
        return (
          <Register
            onLogin={() => setShowLoginForm(true)}
            toggleForm={() => setShowLoginForm(true)}
          />
        );
      }
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
            <Navigation active={active} setActive={setActive} currentUser={currentUser}/>
            <main>{displayData()}</main>
          </>
        ) : (
          <div>{displayData()}</div>
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
