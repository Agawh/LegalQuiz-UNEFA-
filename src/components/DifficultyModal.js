import React from 'react';
import { motion } from 'framer-motion';
import DifficultyButton from './DifficultyButton';

// Modal para seleccionar la dificultad del quiz
function DifficultyModal({ onClose, onSelectDifficulty }) {
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
          Selecciona Dificultad
        </h2>
        <div className="space-y-4">
          <DifficultyButton title="Fácil" onClick={() => onSelectDifficulty('easy')} />
          <DifficultyButton title="Medio" onClick={() => onSelectDifficulty('medium')} />
          <DifficultyButton title="Difícil" onClick={() => onSelectDifficulty('hard')} />
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

export default DifficultyModal;
