import "./App.scss";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";

import { links } from "./routes";
import { useState } from "react";
import { fabClasses } from "@mui/material";
import Login from "./pages/Login";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <div className="App">
          <Header />
          <div className="main">
            <SideBar />
            <Routes>
              {links.map((item, index) => (
                <Route key={index} path={item.path} element={item.element} />
              ))}
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
