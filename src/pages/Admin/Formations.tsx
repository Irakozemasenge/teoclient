import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Configuration de l'élément racine pour l'accessibilité

const Formations = () => {
  const [formations, setFormations] = useState<any[]>([]);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [debut, setDebut] = useState('');
  const [fin, setFin] = useState('');
  const [elements, setElements] = useState<string[]>(['']); // Tableau d'éléments
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Récupère les formations via API
  const fetchFormations = async () => {
    try {
      const response = await fetch('http://localhost:8004/api/formations');
      const data = await response.json();
      setFormations(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des formations', error);
      toast.error('Erreur lors de la récupération des formations');
    }
  };

  useEffect(() => {
    fetchFormations(); // Appel API au chargement du composant
  }, []);

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `http://localhost:8004/api/formations/${currentId}` : 'http://localhost:8004/api/formations';

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    if (photo) {
      formData.append('photo', photo);
    }
    formData.append('debut', debut);
    formData.append('fin', fin);
    elements.forEach((element) => formData.append('elements[]', element));

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        const newFormation = await response.json();
        setFormations(isEdit ? formations.map(f => (f.id === currentId ? newFormation : f)) : [...formations, newFormation]);
        toast.success(isEdit ? 'Formation mise à jour avec succès' : 'Formation créée avec succès');
      } else {
        toast.error('Erreur lors de la création ou mise à jour de la formation');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la mise à jour de la formation', error);
      toast.error('Erreur lors de l\'ajout ou de la mise à jour de la formation');
    }

    resetForm();
    closeModal();
  };

  // Réinitialise le formulaire
  const resetForm = () => {
    setTitre('');
    setDescription('');
    setPhoto(null);
    setDebut('');
    setFin('');
    setElements(['']);
    setIsEdit(false);
    setCurrentId(null);
  };

  // Ferme le modal
  const closeModal = () => {
    resetForm();
    setModalIsOpen(false);
  };

  // Supprime une formation
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8004/api/formations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFormations(formations.filter((formation) => formation.id !== id));
        toast.success('Formation supprimée avec succès');
      } else {
        toast.error('Erreur lors de la suppression de la formation');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation', error);
      toast.error('Erreur lors de la suppression de la formation');
    }
  };

  // Remplit le formulaire pour modification
  const handleEdit = (formation: any) => {
    setTitre(formation.titre);
    setDescription(formation.description);
    setPhoto(null); // Réinitialiser pour éviter de conserver l'ancienne image
    setDebut(formation.debut);
    setFin(formation.fin);
    setElements(formation.elements); // Assurez-vous que `elements` vient bien de votre API
    setIsEdit(true);
    setCurrentId(formation.id);
    setModalIsOpen(true);
  };

  // Ajoute un nouvel élément
  const handleAddElement = () => {
    setElements([...elements, '']);
  };

  // Gère le changement d'un élément
  const handleElementChange = (index: number, value: string) => {
    const newElements = [...elements];
    newElements[index] = value;
    setElements(newElements);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Formations</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          onClick={() => setModalIsOpen(true)}
        >
          <Plus size={20} />
          Nouvelle formation
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="Overlay"
        contentLabel="Formation Modal"
      >
        <h2 className="text-xl font-bold">{isEdit ? 'Modifier la Formation' : 'Ajouter une Formation'}</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Titre"
            className="border rounded px-3 py-2 mr-3"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border rounded px-3 py-2 mr-3 w-full"
            required
          />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setPhoto(file);
            }}
            accept="image/*" // Accepte uniquement les images
            className="border rounded px-3 py-2 mr-3"
          />
          <input
            type="date"
            value={debut}
            onChange={(e) => setDebut(e.target.value)}
            className="border rounded px-3 py-2 mr-3"
            required
          />
          <input
            type="date"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            className="border rounded px-3 py-2 mr-3"
            required
          />
          <div className="mb-4">
            <label className="block mb-1">Éléments :</label>
            {elements.map((element, index) => (
              <div className="flex" key={index}>
                <input
                  type="text"
                  value={element}
                  onChange={(e) => handleElementChange(index, e.target.value)}
                  placeholder="Élément"
                  className="border rounded px-3 py-2 mr-2 flex-grow"
                />
                <button type="button" onClick={handleAddElement} className="bg-blue-600 text-white px-2 rounded-lg">
                  +
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            {isEdit ? 'Mettre à jour' : 'Créer'}
          </button>
        </form>
        <button onClick={closeModal} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Annuler
        </button>
      </Modal>

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
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" onClick={() => handleEdit(formation)}>
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" onClick={() => handleDelete(formation.id)}>
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