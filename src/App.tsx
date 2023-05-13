import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { KatasDetailPage } from "./pages/KatasDetailPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { KatasPage } from "./pages/KatasPages";

// import LoginForm from "./components/forms/LoginForm";
// import RegisterForm from "./components/forms/RegisterForm";

function App() {
  return (
    <div className="App">
      {/* <LoginForm /> */}
      {/* <RegisterForm /> */}
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/katas">Katas</Link>
            </li>
          </ul>
        </nav>

        {/* // TODO: Export to Routes folder */}
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/katas" element={<KatasPage />}></Route>
          <Route path="/katas/:id" element={<KatasDetailPage />}></Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
