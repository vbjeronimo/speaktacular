import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import styles from './css/global.css';
import { UserProvider } from './contexts/userContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false
  });

  return (
    <div className="App">
      <UserProvider>
        <Navbar user={user}/>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
