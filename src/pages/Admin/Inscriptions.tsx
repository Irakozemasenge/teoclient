import React from 'react';
import { Check, X, MoreHorizontal } from 'lucide-react';

const Inscriptions = () => {
  const inscriptions = [
    { id: 1, nom: 'Paul K.', formation: 'Développement Web', email: 'paul@test.com', status: 'En attente', date: '2026-01-30' },
    { id: 2, nom: 'Sarah L.', formation: 'Marketing Digital', email: 'sarah@test.com', status: 'Confirmé', date: '2026-01-31' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inscriptions aux Formations</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Candidat</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Formation</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Statut</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inscriptions.map((ins) => (
              <tr key={ins.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{ins.nom}</p>
                    <p className="text-xs text-gray-500">{ins.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{ins.formation}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{ins.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ins.status === 'Confirmé' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {ins.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Check size={18} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <X size={18} />
                    </button>
                    <button className="p-1 text-gray-400 hover:bg-gray-100 rounded">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inscriptions;
