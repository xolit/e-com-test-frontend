import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import AddProduct from "./components/Product/AddProduct";
import AllProduct from "./components/AllProduct/AllProduct";
import UpdateProduct from './components/updateProduct/UpdateProduct';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<AllProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout page</h1>} />
            <Route path="/profile" element={<h1>Profile page</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
