import "./App.css";
import { publicRoutes, privateRoutes } from "./routes";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { headers } from "./utils/headers";
import { useEffect } from "react";
import { BASE_URL_USER } from "./utils/api";

function App() {
  const token = localStorage.getItem("accessToken");
  const navigator = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    // check token expired
    const checkForErrors = async () => {
      try {
        const response = await axios.get(`${BASE_URL_USER}/user/${userId}`, {
          headers,
        });
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          navigator("/login");
        }
      } catch (e) {
        localStorage.clear();
        navigator("/login");
      }
    };
    // check not login
    if (!token) {
      navigator("/login");
    } else {
      checkForErrors();
    }
  }, [token, navigator]);

  return (
    <Routes>
      {token ? (
        <>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </>
      ) : (
        <>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </>
      )}
    </Routes>
  );
}

export default App;
