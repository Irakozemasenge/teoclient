import React from 'react';
import { Mail, Trash2, Eye } from 'lucide-react';

const Contacts = () => {
  const messages = [
    { id: 1, nom: 'Alice M.', email: 'alice@example.com', message: 'Bonjour, je voudrais plus d\'infos sur...', date: '2026-01-28' },
    { id: 2, nom: 'Bob D.', email: 'bob@example.com', message: 'Est-ce que vous faites des sites sur mesure ?', date: '2026-01-29' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages Reçus</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {messages.map((msg) => (
            <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{msg.nom}</h4>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{msg.date}</span>
              </div>
              
              <p className="text-gray-600 mt-3 ml-13 pl-13">{msg.message}</p>
              
              <div className="flex justify-end gap-3 mt-4">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                  <Eye size={16} /> Lire
                </button>
                <button className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                  <Trash2 size={16} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
