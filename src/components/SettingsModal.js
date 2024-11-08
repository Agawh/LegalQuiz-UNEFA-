import React from 'react';
import { motion } from 'framer-motion';

// Modal de configuración para ajustar el volumen y el brillo
function SettingsModal({ volume, setVolume, brightness, setBrightness, onClose }) {
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
          Configuración ⚙️
        </h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="volume" className="block text-sm font-medium text-gray-700 mb-2">
              Volumen 🔊
            </label>
            <input
              type="range"
              id="volume"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full h-2 bg-indigo-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="brightness" className="block text-sm font-medium text-gray-700 mb-2">
              Brillo ☀️
            </label>
            <input
              type="range"
              id="brightness"
              min="30"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(parseInt(e.target.value))}
              className="w-full h-2 bg-indigo-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <motion.button 
            className="w-full bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:bg-indigo-800"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cerrar
          </motion.button>
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

export default SettingsModal;
