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
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté
    const adminId = localStorage.getItem('adminId');
    const adminName = localStorage.getItem('adminName'); // Ajoutez ceci si vous stockez le nom d'utilisateur
    if (!adminId) {
      navigate('/admin/login');
    } else {
      setCurrentUser(adminName || 'Admin User'); // Affichez un nom par défaut si non trouvé.
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
    localStorage.removeItem('adminId'); // Supprimez l'ID de l'utilisateur
    localStorage.removeItem('adminName'); // Supprimez le nom de l'utilisateur
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {currentUser?.charAt(0)} {/* Affiche la première lettre du nom */}
              </div>
              <span className="text-gray-700 font-medium hidden sm:block">{currentUser}</span>
            </div>
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