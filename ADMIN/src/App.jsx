import { Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import ListDoctor from "./Pages/ListDoctor"
import AddDoctor from "./Pages/AddDoctor"
import Login from "./Pages/Login"
import Navbar from "./Components/navbar"
import { useContext } from "react"
import { AdminContext } from "./context/AdminContextProvider"
import Slidebar from "./Components/Slidebar"

function App() {

  const {atoken}=useContext(AdminContext)

  return atoken?
        <div>
          <Navbar></Navbar>
          <div className="flex items-start">
            <Slidebar></Slidebar>
            <Routes>
              <Route path="/" element={<></>}></Route>
              <Route path="/adminDashboard" element={<Dashboard/>}></Route>
              <Route path="/allAppointments" element={<Dashboard/>}></Route>
              <Route path="/addDoctor" element={<AddDoctor/>}></Route>
              <Route path="/ListDoctor" element={<ListDoctor/>}></Route>
            </Routes>
          </div>
          
        </div>
  :
  (
    <Login></Login>
  )
}

export default App
