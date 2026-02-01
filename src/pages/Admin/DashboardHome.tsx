import React from 'react';
import { Users, GraduationCap, FileText, MessageSquare } from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    { title: 'Total Admins', value: '3', icon: Users, color: 'bg-blue-500' },
    { title: 'Formations Actives', value: '4', icon: GraduationCap, color: 'bg-green-500' },
    { title: 'Inscriptions', value: '12', icon: FileText, color: 'bg-purple-500' },
    { title: 'Messages', value: '8', icon: MessageSquare, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Activité Récente</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                U
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nouvelle inscription reçue</p>
                <p className="text-xs text-gray-500">Il y a {i} heures</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
