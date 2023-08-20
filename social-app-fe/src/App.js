import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Home from "./pages/Home/Home";
import "./App.css";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AuthState from "./contexts/AuthContext/AuthState";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Header from "./layouts/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <AuthState>
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute component={Home} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthState>
    </BrowserRouter>
  );
}

export default App;
