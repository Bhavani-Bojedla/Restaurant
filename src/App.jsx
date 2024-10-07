import "./App.css";
import Signup from "./Components/Signup/Signup";
import Signin from "./Components/SignIn/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./Components/Orders/Orders";
import Navbar from "./Components/Orders/Navbar"
function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Signin />} />  
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
              </Routes>
    </BrowserRouter>
  );
}

export default App;
