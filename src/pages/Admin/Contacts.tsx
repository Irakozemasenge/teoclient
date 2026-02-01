import React, { useEffect, useState } from 'react';
import { Mail, Trash2, Eye } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacts: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);

  // Fonction pour récupérer les messages
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8004/api/contacts');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des contacts', error);
      toast.error('Erreur lors de la récupération des messages');
    }
  };

  // Appeler fetchMessages lors du premier rendu
  useEffect(() => {
    fetchMessages();
  }, []);

  // Fonction pour supprimer un message
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8004/api/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        toast.success('Message supprimé avec succès !');
      } else {
        toast.error('Erreur lors de la suppression du message');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du message', error);
      toast.error('Erreur lors de la suppression du message');
    }
  };

  return (
    <div>
      <ToastContainer />
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
                <span className="text-xs text-gray-400">Le {new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
              
              <p className="text-gray-600 mt-3 ml-13 pl-13">{msg.message}</p>
              
              <div className="flex justify-end gap-3 mt-4">                
                <button
                  className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                  onClick={() => handleDelete(msg.id)} // Appel pour supprimer le message
                >
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