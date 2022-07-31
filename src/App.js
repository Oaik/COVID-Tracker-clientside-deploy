import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// components
import Navbar from "./components/navbar/navbar";
import Logout from "./components/logout/Logout";
import Footer from "./components/footer/footer";

// pages
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Log from "./pages/log/Log";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// contexts
import { AuthProvider } from "./contexts/authContext";

// style
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"

import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

            <Routes>
              <Route path="/" exact element={<Home/>}/>
              <Route path="/dashboard" exact element={<Dashboard/>}/>
              <Route path="/log" exact element={<Log/>}/>
              <Route path="/profile" exact element={<Profile/>}/>
              <Route path="/login" exact element={<Login/>}/>
              <Route path="/register" exact element={<Register/>}/>
              <Route path="/logout" exact element={<Logout/>}/>
            </Routes>

        </BrowserRouter>
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;
