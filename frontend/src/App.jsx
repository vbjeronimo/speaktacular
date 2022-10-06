import { Routes, Route } from 'react-router-dom';

import { UserProvider } from './contexts/userContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
