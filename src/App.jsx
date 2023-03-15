import "./App.css";
import { publicRoute, privateRoutes } from "./routes";
import { Routes, Route, useNavigate } from "react-router-dom";
function App() {
  return (
    <Routes>
      {publicRoute.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
