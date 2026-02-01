import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Composant Modal
const Modal = ({ isOpen, onClose, onSubmit, newAdmin, setNewAdmin, setPhoto }) => {
  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h3 className="mb-4 text-lg font-semibold">Ajouter un nouvel administrateur</h3>
        <input
          type="text"
          placeholder="Prénom"
          value={newAdmin.firstname}
          onChange={(e) => setNewAdmin({ ...newAdmin, firstname: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Nom"
          value={newAdmin.lastname}
          onChange={(e) => setNewAdmin({ ...newAdmin, lastname: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
        />
        
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Annuler</button>
          <button
            onClick={() => {
              onSubmit();
              onClose();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

const Admins: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [newAdmin, setNewAdmin] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null); // État pour la photo

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:8004/api/admin/getAll');
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleAddAdmin = async () => {
    const formData = new FormData();
    Object.entries(newAdmin).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await fetch('http://localhost:8004/api/admin/createAccount', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        fetchAdmins(); // Récupérer la liste mise à jour
        setNewAdmin({ firstname: '', lastname: '', email: '', password: '' }); // Réinitialiser le formulaire
        setPhoto(null); // Réinitialiser la photo
      }
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleEditAdmin = (admin: any) => {
    setEditingId(admin.id);
    setNewAdmin({ firstname: admin.firstname, lastname: admin.lastname, email: admin.email, password: '' });
  };

  const handleUpdateAdmin = async () => {
    if (editingId) {
      try {
        const response = await fetch(`http://localhost:8004/api/admin/Updateuser/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAdmin),
        });
        if (response.ok) {
          fetchAdmins(); // Récupérer la liste mise à jour
          setEditingId(null); // Réinitialiser l'ID d'édition
          setNewAdmin({ firstname: '', lastname: '', email: '', password: '' }); // Réinitialiser le formulaire
        }
      } catch (error) {
        console.error('Error updating admin:', error);
      }
    }
  };

  const handleDeleteAdmin = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
      try {
        await fetch(`http://localhost:8004/api/admin/delete/${id}`, {
          method: 'DELETE',
        });
        fetchAdmins(); // Récupérer la liste mise à jour
      } catch (error) {
        console.error('Error deleting admin:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Administrateurs</h2>
        <button
          onClick={() => setIsModalOpen(true)} // Ouvrir le modal
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Ajouter un admin
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAdmin}
        newAdmin={newAdmin}
        setNewAdmin={setNewAdmin}
        setPhoto={setPhoto}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nom</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                      {admin.firstname[0]}{admin.lastname[0]}
                    </div>
                    <span className="font-medium text-gray-900">{admin.firstname} {admin.lastname}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{admin.email}</td>
                
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEditAdmin(admin)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDeleteAdmin(admin.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
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

export default Admins;