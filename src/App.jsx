import "./App.css";
import { publicRoutes, adminRoutes, userRoutes } from "./routes";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
