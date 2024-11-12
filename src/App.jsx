import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import NavbarTailwind from "./components/navbar/NavbarTailwind";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/404";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  // check user true/false
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
    console.log("Token:", token); // Check if token is retrieved

  }, [localStorage.getItem("token")]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated && <NavbarTailwind onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}
        ></Route>

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
