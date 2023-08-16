import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/layouts/Header/Header";
import AuthState from "./contexts/AuthContext/AuthState";
import UserProfile from "./pages/UserProfile/UserProfile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthState>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<PrivateRoute component={Home} />} />
            <Route
              path="/profile"
              element={<PrivateRoute component={UserProfile} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthState>
    </BrowserRouter>
  );
};

export default App;
