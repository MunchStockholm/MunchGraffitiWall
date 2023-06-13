import { useState } from 'react';
import '../styles/Login.css';
import AdminControllBoard from './AdminControlBoard';
import ColorMode from '../styles/ColorMode';
import HomePage from '../pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrawPage from '../pages/DrawPage';
import SouvenirPage from '../pages/SouvenirPage';
import PaintingsPage from './Paintings';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
  
    const handleAdminLogin = () => {
      // Simple validation for the sake of example
      // Typically, this should be done with a backend service
      if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
        setUsername("Admin");
        setPasswordError(null);
      } else {
        setPasswordError("* Wrong password");
      }
    };
  
    const handleGuestLogin = () => {
      setUsername("guest");
    };
  
    if (username === "Admin") {
      return (
        <div className="App">
          <header className="App-header">
            <p> Welcome Admin! </p>
          </header>
          <body>
            <AdminControllBoard />
          </body>
        </div>
      );
    } else if (username === "guest") {
      return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/draw" element={<DrawPage />} />
                    <Route path="/souvenir" element={<SouvenirPage />} />
                    <Route path="/paintings" element={<PaintingsPage />}
                    />

                </Routes>
            </Router>
        </div>
      );
    } else {
      return (
        <div className='outer-container'>
        <div className='opening-container .container'>
          
          <div className='opening-inner'>
          <input
          className='input-password'
            type="password"
            placeholder="Enter admin password"
            onChange={e => setPassword(e.target.value)}
          />
          <div className='password-wrong-p'>
          {passwordError && <p>{passwordError}</p>}
          </div>
          <div className='opening-inner2'>
          <button className='button button-admin' onClick={handleAdminLogin}>Login as Admin</button>
          <button className='button button-guest' onClick={handleGuestLogin}>Login as Guest</button>

          </div>
          <ColorMode />

          </div>
        </div>
        </div>
      );
    }
  };
  export default Login;