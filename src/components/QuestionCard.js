import React, { useState } from 'react';
import { motion } from 'framer-motion';
import correctSound from '../sounds/correct.mp3';
import incorrectSound from '../sounds/incorrect.mp3';

function QuestionCard({ question, onAnswer, timeLeft, isTransitioning }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleOptionClick = (option) => {
    if (selectedAnswer !== null) return;
    const isCorrect = option === question.correctAnswer;
    const points = isCorrect ? question.points + timeLeft : 0;
    setFeedback(isCorrect ? '¡Correcto!' : 'Incorrecto');
    playSound(isCorrect ? correctSound : incorrectSound);

    setSelectedAnswer(option);
    setTimeout(() => onAnswer(isCorrect, points), 1000);
  };

  if (!question) return <p>Cargando pregunta...</p>;

  return (
    <motion.div
      className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-2xl relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-full h-48 bg-gray-200 mb-4 rounded-md overflow-hidden">
        <img src={question.image} alt="Pregunta" className="h-full w-full object-cover" />
      </div>

      <h3 className="text-xl font-bold mb-6 text-indigo-900 text-justify">{question.text}</h3>

      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`py-3 px-4 text-lg font-semibold rounded-lg border-2 border-indigo-500 transition-colors duration-300 ${
              selectedAnswer === option
                ? option === question.correctAnswer
                  ? 'bg-green-500 text-white border-green-600'
                  : 'bg-red-500 text-white border-red-600'
                : 'bg-white text-indigo-900 hover:bg-indigo-100'
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={selectedAnswer !== null || isTransitioning}
          >
            {option}
          </button>
        ))}
      </div>

      <motion.p
        className={`mt-6 text-2xl font-extrabold text-center ${
          feedback === '¡Correcto!' ? 'text-green-600' : 'text-red-600'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 1],
        }}
        transition={{ duration: 0.5 }}
      >
        {feedback}
      </motion.p>
    </motion.div>
  );
}

export default QuestionCard;
