import logo from './logo.svg';
import {Routes, Route, useNavigte} from 'react-router-dom';
import './App.css';
import Home from './container/Home';
import Login from './components/Login';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    document.title = "ShareMe"; 
  }, []);
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />}/>
    </Routes>
  );
}

export default App;
