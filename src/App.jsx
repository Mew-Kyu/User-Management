import "./App.css";
import { publicRoutes, privateRoutes } from "./routes";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("accessToken");
  const navigator = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     navigator("/login");
  //   }
  // }, [token, navigator]);
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
