import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Megaphone, Monitor, CheckCircle, Send } from 'lucide-react';

const trainings = [
  {
    id: 'web',
    title: 'Développement Web',
    description: 'Maîtrisez HTML, CSS, JavaScript et React pour créer des sites web modernes et interactifs.',
    duration: '3 mois',
    icon: Code,
    color: 'bg-blue-100 text-blue-600',
    features: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Projets pratiques']
  },
  {
    id: 'mobile',
    title: 'Développement Mobile',
    description: 'Apprenez à créer des applications mobiles performantes pour Android et iOS.',
    duration: '4 mois',
    icon: Smartphone,
    color: 'bg-green-100 text-green-600',
    features: ['React Native / Flutter', 'Design UI/UX Mobile', 'Publication sur les stores', 'API Integration']
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    description: 'Devenez un expert en gestion de réseaux sociaux, SEO et publicité en ligne.',
    duration: '2 mois',
    icon: Megaphone,
    color: 'bg-purple-100 text-purple-600',
    features: ['Stratégie Social Media', 'SEO & SEM', 'Content Marketing', 'Analytics']
  },
  {
    id: 'basic',
    title: 'Initiation Informatique',
    description: 'Les bases essentielles pour utiliser un ordinateur et naviguer sur internet en toute sécurité.',
    duration: '1 mois',
    icon: Monitor,
    color: 'bg-orange-100 text-orange-600',
    features: ['Windows / Office', 'Navigation Internet', 'Sécurité de base', 'Email pro']
  }
];

const Training = () => {
  return (
    <section id="training" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Nos Formations
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Investissez dans votre avenir avec nos programmes de formation pratique et certifiante.
          </p>
        </div>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {trainings.map((training, index) => (
            <motion.div
              key={training.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 ${training.color} rounded-xl flex items-center justify-center`}>
                    <training.icon size={24} />
                  </div>
                  <span className="bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {training.duration}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{training.title}</h3>
                <p className="text-gray-600 mb-6">{training.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {training.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href="#apply-form" 
                  className="block w-full text-center bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Postuler maintenant
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Application Form Section */}
        <div id="apply-form" className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
          >
            <div className="bg-blue-600 p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Formulaire d'Inscription</h3>
              <p className="text-blue-100">Remplissez ce formulaire pour réserver votre place.</p>
            </div>
            
            <div className="p-8 md:p-10">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="+257 ..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="emailApply" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="emailApply"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Formation souhaitée</label>
                  <select
                    id="course"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Sélectionnez une formation</option>
                    {trainings.map(t => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">Motivation (Optionnel)</label>
                  <textarea
                    id="motivation"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Pourquoi voulez-vous suivre cette formation ?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Send size={20} />
                  Envoyer ma candidature
                </button>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Training;
