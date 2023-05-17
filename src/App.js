import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/chat' element={<Main />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
