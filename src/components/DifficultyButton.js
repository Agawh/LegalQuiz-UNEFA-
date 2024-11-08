import React from 'react';
import { motion } from 'framer-motion';

// Botón de dificultad para seleccionar el nivel en el quiz
function DifficultyButton({ title, onClick }) {
  return (
    <motion.button 
      className="w-full bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-medium py-3 px-4 rounded-lg transition-colors duration-300 shadow-sm text-left"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {title}
    </motion.button>
  );
}

export default DifficultyButton;
