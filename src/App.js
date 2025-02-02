import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/Css/todolist.css'
import './assets/Css/nucles.css'
import ProtectedRoute from "./ProtectedRoute";
import Login from './Component/LoginPages/Login/Login';
import NotFound from "./Component/NotFound";
import Home from "./Component/Home/Home";
import Register from "./Component/LoginPages/Register/Register";
import { Userprofile } from "./Component/UserProfile/Userprofile";
import { Upcomeingtask } from './Component/Upcomeingtask/Upcomeingtask'
import { Todaystask } from './Component/TodaysTask/Todaystask'
import { Personalreport } from './Component/PersonalReport/Personalreport'
import { StudyReport } from './Component/Studyreport/StudyReport'
import { Workreport } from './Component/WorkReport/Workreport'
import { Createtask } from "./Component/CreateTAsk/Createtask";
import { Tasklist } from "./Component/TaskList/Tasklist";
import { Forgotpassword } from "./Component/LoginPages/ForgotPassword/Forgotpassword";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token] = useState(sessionStorage.getItem('Token'))

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem("IsUserLogedIn"))
  }, [token]);

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={!isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to="/landing" />
            )
            }
            />
            <Route path="/landing" element={<ProtectedRoute isAuthenticated={isAuthenticated}>  <Home /> </ProtectedRoute>} />
            <Route path="/register" element={!isAuthenticated ? (<Register />) : (<Navigate to="/landing" />)} />
            <Route path="/forgotpassword" element={!isAuthenticated ? (<Forgotpassword />) : (<Navigate to="/login" />)} />
            <Route path="/userprofile" element={<Userprofile />} />
            <Route path="/upcomingtask" element={<Upcomeingtask />} />
            <Route path="/todaystask" element={<Todaystask />} />
            <Route path="/personalreporttask" element={<Personalreport />} />
            <Route path="/studyreporttask" element={<StudyReport />} />
            <Route path="/workreporttask" element={<Workreport />} />
            <Route path="/createtask" element={<Createtask />} />
            <Route path="/tasklist" element={<Tasklist />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
