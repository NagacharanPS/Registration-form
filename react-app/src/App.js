import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './login-form';
import Signup from './signup-form';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
       <BrowserRouter> 
          <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/signup' element={<Signup />}/>
              
          </Routes>
          <ToastContainer/>
       </BrowserRouter>
       
  );
}

export default App;