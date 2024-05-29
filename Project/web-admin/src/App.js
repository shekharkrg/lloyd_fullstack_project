import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
