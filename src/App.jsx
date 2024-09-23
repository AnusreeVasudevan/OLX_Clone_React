import React, { useEffect, useState } from 'react';
import Home from './Pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './Pages/Create';
function App() {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setIsAuthenticated(false);
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged in');
        setIsAuthenticated(true);
        navigate('/');
      } else {
        console.log('Logged out');
        setIsAuthenticated(false);
        navigate('/signup');
      }
    });
  }, []);

  return (
     
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home IsAuthenticated={IsAuthenticated} />} />
        <Route exact path='/signup' element={<Signup />} /> 
         <Route path='/create' element={<Create />} /> 
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
   
  );
}

export default App;
