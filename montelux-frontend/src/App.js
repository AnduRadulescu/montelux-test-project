import "./style.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { GlobalServiceProvider } from "./services/GlobalServiceContext";
import EventManagement from "./components/event-components/EventManagement";

axios.defaults.withCredentials = true;

function App() {
  
  return (
    <GlobalServiceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<EventManagement />} />
        </Routes>
      </BrowserRouter>
    </GlobalServiceProvider>
  );
}

export default App;
