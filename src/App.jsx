import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import Opening from './pages/Opening/Opening';

function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/opening" element={<Opening />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;