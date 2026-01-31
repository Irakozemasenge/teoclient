import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 lg:mb-0"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              À propos de y-Tech Hub
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Youth Technology Hub (y-Tech Hub) est une société à but lucratif basée à Bubanza, dédiée à l'autonomisation technologique. 
              Nous croyons que la technologie est un levier puissant pour le développement économique et social.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Notre mission est de fournir des services numériques de haute qualité tout en formant la prochaine génération 
              de leaders technologiques au Burundi.
            </p>
            
            <div className="space-y-4">
              {[
                'Expertise locale et standards internationaux',
                'Solutions sur mesure pour chaque client',
                'Engagement envers la formation des jeunes',
                'Support technique réactif'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl bg-blue-600">
               {/* Placeholder for an office image or team image if available, using a gradient for now */}
               <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white p-8 text-center">
                  <span className="text-2xl font-bold opacity-20">y-Tech Hub Innovation Center</span>
               </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full z-[-1]"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-200 rounded-full z-[-1] opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
