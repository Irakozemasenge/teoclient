import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, TrendingUp, GraduationCap, Camera, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Développement Web',
    description: 'Création de sites vitrines et e-commerce pour améliorer votre visibilité et augmenter vos ventes.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Smartphone,
    title: 'Applications Mobiles',
    description: 'Conception d’applications adaptées : livraison, réservations, éducation, et plus encore.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: TrendingUp,
    title: 'Marketing Numérique',
    description: 'Gestion des réseaux sociaux, SEO et création de contenus pour atteindre un public plus large.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: GraduationCap,
    title: 'Formations Numériques',
    description: 'Ateliers pour jeunes et entrepreneurs : informatique, développement web et compétences digitales.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: Camera,
    title: 'Contenus Multimédias',
    description: 'Photos, vidéos et contenus visuels professionnels pour promouvoir votre impact.',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: Lightbulb,
    title: 'Consultation Tech',
    description: 'Conseil et implémentation de solutions technologiques : systèmes de gestion, comptabilité, etc.',
    color: 'bg-yellow-100 text-yellow-600',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            Nos Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Des solutions complètes pour accompagner votre transformation numérique à Bubanza et au-delà.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
