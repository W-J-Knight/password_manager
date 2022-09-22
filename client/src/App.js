import './App.css';
// import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom"
// promise base api
// import Axios from 'axios';
// import Modal from './Compponents/Modal';
import Navbar from './Compponents/Navbar';
import Home from './Pages/Home';
import AddPassword from './Pages/AddPassword';
import GetPasswords from './Pages/GetPasswords';
import SitePassword from './Compponents/SitePassword';
import DeletePasswords from './Pages/DeletePasswords';
import UpdatePasswords from './Pages/UpdatePasswords';


function App() {


  return (
    <div className="App">
      <Navbar />
      <div className='pages'>

        <Routes>
          <Route path="/" element={<Home />} />
          {/* form an input a password and one  the website then a submit button to add password */}
          <Route path="/keep" element={<AddPassword />} />
          {/* buttons with the site name when clicked and popup with site and password */}
          <Route path="/retrieve" element={<GetPasswords />} />
          <Route path="/retrieve/:title" element={<SitePassword />} />
          {/* delete a password  input a password and one  the website then a submit button*/}
          <Route path="/delete" element={<DeletePasswords />} />
          <Route path="/update" element={<UpdatePasswords />} />
        </Routes>
      </div>
    </div>



  );
}

//   
export default App;
