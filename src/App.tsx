import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Admin/Login';
import Register from './pages/Admin/Register';
import DashboardLayout from './pages/Admin/Dashboard';
import DashboardHome from './pages/Admin/DashboardHome';
import Admins from './pages/Admin/Admins';
import Formations from './pages/Admin/Formations';
import Contacts from './pages/Admin/Contacts';
import Inscriptions from './pages/Admin/Inscriptions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="admins" element={<Admins />} />
          <Route path="formations" element={<Formations />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="inscriptions" element={<Inscriptions />} />
        </Route>

        {/* Route 404 redirection vers la page d'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;