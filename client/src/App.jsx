import { BrowserRouter, Routes, Route } from 'react-router-dom';
import API from './util/API';
import Home from './pages/Home';
import SingleItem from './pages/protected/SingleItem';
import Items from './pages/protected/Items';
import './App.css'
import { useCallback, useEffect, useState } from 'react';
import useAuthContext from './context/useAuthContext';
import jwtDecode from 'jwt-decode';

function App() {
  const { setUser, token, setToken } = useAuthContext();

  useEffect(() => {
    if (document.cookie) {
      console.log(document.cookie);
      
      setToken(document.cookie.split("=")[1]);
      setUser(jwtDecode(document.cookie.split("=")[1]).user);
      
      console.log(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<Items />} />
          <Route path="/item/:id" element={<SingleItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
