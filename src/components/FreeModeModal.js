import React from 'react';
import { motion } from 'framer-motion';
import CategoryButton from './CategoryButton';

// Modal que permite seleccionar entre varias categorías en el Modo Libre
function FreeModeModal({ onClose, onSelectLaw }) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full relative"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-6">
          Seleccione una categoría 📊
        </h2>
        <div className="space-y-4">
          <CategoryButton
            title="Ley Del Ejercicio de La Ingeniería, Arquitectura y Profesiones Afines"
            icon="🏠"
            onClick={onClose} // Acción al seleccionar esta categoría
          />
          <CategoryButton
            title="La Constitución de la República Bolivariana de Venezuela"
            icon="👮"
            onClick={onClose} // Acción al seleccionar esta categoría
          />
          <CategoryButton
            title="Ley de Delitos Informáticos"
            icon="📜"
            onClick={onSelectLaw} // Muestra el modal de selección de dificultad
          />
        </div>
        <motion.button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✖
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default FreeModeModal;
