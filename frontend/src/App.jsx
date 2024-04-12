// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import Login from './Login';
import Navbar from './Navbar';
import { Home } from './Home';

function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
