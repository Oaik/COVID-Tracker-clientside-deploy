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
              <Route path="/COVID-Tracker-clientside-deploy/" exact element={<Home/>}/>
              <Route path="/COVID-Tracker-clientside-deploy/dashboard" exact element={<Dashboard/>}/>
              <Route path="/COVID-Tracker-clientside-deploy/log" exact element={<Log/>}/>
              <Route path="/COVID-Tracker-clientside-deploy/profile" exact element={<Profile/>}/>
              <Route path="/COVID-Tracker-clientside-deploy/login" exact element={<Login/>}/>
              <Route path="/COVID-Tracker-clientside-deploy/register" exact element={<Register/>}/>
              <Route path="/COVID-Tracker-clientside-deploy/logout" exact element={<Logout/>}/>
            </Routes>

        </BrowserRouter>
      </AuthProvider>

      <Footer />
    </div>
  );
}

export default App;
