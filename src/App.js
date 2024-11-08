
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ModeCard from './components/ModeCard';
import SettingsModal from './components/SettingsModal';
import FreeModeModal from './components/FreeModeModal';
import DifficultyModal from './components/DifficultyModal';
import Quiz from './components/Quiz';

export default function QuizGame() {
  const [showFreeMode, setShowFreeMode] = useState(false); // Controla si mostrar el modal de Modo Libre
  const [showSettings, setShowSettings] = useState(false); // Controla si mostrar el modal de Configuración
  const [showDifficultyModal, setShowDifficultyModal] = useState(false); // Modal para seleccionar dificultad
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Guarda la dificultad seleccionada
  const [volume, setVolume] = useState(50); // Estado del volumen
  const [brightness, setBrightness] = useState(100); // Estado del brillo
  const audioRef = useRef(null); // Referencia para el audio de fondo

  // Ajusta el volumen del audio de fondo cuando cambia el estado 'volume'
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Función para comenzar el quiz con una dificultad específica
  function startQuiz(difficulty) {
    setSelectedDifficulty(difficulty);
    setShowFreeMode(false);       // Cierra el modal de Modo Libre
    setShowDifficultyModal(false); // Cierra el modal de selección de dificultad
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-50 p-6 sm:p-8 font-sans"
      style={{ filter: `brightness(${brightness}%)` }}
    >
      <audio ref={audioRef} src="/assets/musicafondo.mp3" autoPlay loop />

      <header className="text-center mb-8">
        <motion.h1 
          className="text-4xl sm:text-6xl font-bold text-indigo-900 mb-4 font-serif drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LegalQuiz ⚖️
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl text-indigo-700 font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ¡Desafía tu conocimiento! 🧠💡
        </motion.p>
      </header>

      {/* Tarjetas de Modo */}
      <main className="max-w-4x1 mx-auto space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <ModeCard
            title="Modo Historia"
            description="Sumergete en una increible historia"
            icon="📚"
            bgImage="fondo.jpg"
            onClick={() => setShowFreeMode(false)}
          />
          <ModeCard
            title="Modo Libre"
            description="Practica con preguntas de las diferentes leyes"
            icon="🎯"
            bgImage="fondo.jpg"
            onClick={() => setShowFreeMode(true)}
          />
        </div>

        <motion.button 
          className="w-full bg-indigo-900 text-white text-lg font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-indigo-800"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Ver Ranking 🏆
        </motion.button>
      </main>

      {/* Botón de Configuración */}
      <motion.button 
        className="fixed top-4 right-4 bg-white hover:bg-gray-100 text-indigo-700 p-3 rounded-full shadow-lg transition-colors duration-300 text-xl"
        onClick={() => setShowSettings(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ⚙️
      </motion.button>

      {/* Modales condicionales */}
      {showSettings && (
        <SettingsModal
          volume={volume}
          setVolume={setVolume}
          brightness={brightness}
          setBrightness={setBrightness}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showFreeMode && (
        <FreeModeModal 
          onClose={() => setShowFreeMode(false)} 
          onSelectLaw={() => setShowDifficultyModal(true)} // Muestra modal de dificultad al seleccionar Ley de Delitos Informáticos
        />
      )}

      {showDifficultyModal && (
        <DifficultyModal
          onClose={() => setShowDifficultyModal(false)}
          onSelectDifficulty={startQuiz} // Maneja la selección de dificultad
        />
      )}

      {selectedDifficulty && (
        <Quiz
          difficulty={selectedDifficulty}
          onClose={() => setSelectedDifficulty(null)} // Cerrar quiz
        />
      )}
    </div>
  );
}
