import React from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

const Formations = () => {
  const formations = [
    { id: 1, titre: 'Développement Web', debut: '2026-03-01', fin: '2026-06-01', inscriptions: 15 },
    { id: 2, titre: 'Marketing Digital', debut: '2026-04-01', fin: '2026-06-01', inscriptions: 8 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Formations</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Nouvelle formation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formations.map((formation) => (
          <div key={formation.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{formation.titre}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Calendar size={18} />
                <span className="text-sm">
                  {formation.debut} - {formation.fin}
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-600">
                  {formation.inscriptions} Inscrits
                </span>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Formations;
