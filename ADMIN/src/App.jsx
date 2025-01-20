import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import ListDoctor from "./Pages/ListDoctor"
import AddDoctor from "./Pages/AddDoctor"
import Login from "./Pages/Login"
import Navbar from "./Components/navbar"

function App() {

  return (
        <div>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/addDoctor" element={<AddDoctor/>}></Route>
            <Route path="/ListDoctor" element={<ListDoctor/>}></Route>

          </Routes>
        </div>
  )
}

export default App
