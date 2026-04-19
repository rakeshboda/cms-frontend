import {Route,Routes, useLocation} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"

import "./App.css"
import Criminals from "./components/Ciminals/Criminals"
import LandingPage from "./components/LandingPage/LandingPage"
import AddCriminal from "./components/AddCriminal/AddCriminal"
import CriminalDetails from "./components/CriminalDetail/CriminalDetail"
import AppContext from "./Context/AppContext"
import { useState } from "react"
import UpdateCriminal from "./components/UpdateCriminal/UpdateCriminal"


const App = () => {
  const location=useLocation();
  const [searchBy,setSearchBy]=useState("");

  return(
  <AppContext.Provider value={{searchBy,setSearchBy}}>
    {location.pathname==="/" || location.pathname.includes("/login")?"":<Navbar/>}
    <div className="content-box">
      <Routes>
        <Route exact path="/" Component={LandingPage}/>
        <Route exact path="/add-criminal" Component={AddCriminal}/>
        <Route exact path="/criminals" Component={Criminals}/>
        <Route exact path="/view/criminal/:id" Component={CriminalDetails}/>
        <Route exact path="/update/criminal/:id" Component={UpdateCriminal}/>
      </Routes>
    </div>
  </AppContext.Provider>
  )
}

export default App
