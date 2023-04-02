import "./App.css";
import { publicRoutes, privateRoutes } from "./routes";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL_AUTH } from "./utils/api";

function App() {
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigator = useNavigate();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const { data: res } = await axios.post(`${BASE_URL_AUTH}/refresh`, {
          refreshToken,
        });
        localStorage.setItem("accessToken", res.accessToken);
      } catch (error) {
        navigator("/login");
      }
    };

    if (token) {
      // Do nothing
    } else if (refreshToken) {
      refreshAccessToken();
    } else {
      navigator("/login");
    }
  }, [token, refreshToken, navigator]);

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
          (
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          )
        </>
      )}
    </Routes>
  );
}

export default App;
