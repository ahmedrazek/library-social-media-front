import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";
import Timeline from "./pages/Timeline";
function App() {
  axios.defaults.baseURL = "http://localhost:9000/";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </>
  );
}

export default App;
