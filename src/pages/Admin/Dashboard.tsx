import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [admin, setAdmin] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem('adminId');
    if (!adminId) {
      navigate('/admin/login');
    } else {
      // Fetch admin details
      fetch(`http://localhost:8004/api/admin/getOne/${adminId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setAdmin(data); // Stocker les informations de l'administrateur
        })
        .catch(error => {
          console.error('Fetch error:', error);
          navigate('/admin/login'); // Rediriger en cas d'erreur
        });
    }
  }, [navigate]);

  const menuItems = [
    { name: 'Tableau de bord', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Admins', icon: Users, path: '/admin/admins' },
    { name: 'Formations', icon: GraduationCap, path: '/admin/formations' },
    { name: 'Inscriptions', icon: FileText, path: '/admin/inscriptions' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/contacts' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside 
        className={`bg-blue-900 text-white fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        <div className="h-20 flex items-center justify-center border-b border-blue-800">
          <h1 className="text-2xl font-bold">y-Tech Admin</h1>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-blue-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-blue-200 hover:bg-blue-800 hover:text-white rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-6 lg:px-8">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className="flex items-center gap-4">
            {admin && (
              <div className="flex items-center gap-2">
                <img
                  src={`http://localhost:8004/uploads/Admin/${admin.photo}`} // Chemin de l'image
                  alt={`${admin.firstname} ${admin.lastname}`}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-700 font-medium hidden sm:block">
                  {`${admin.firstname} ${admin.lastname}`}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;