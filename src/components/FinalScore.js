import React from 'react';

function FinalScore({ score, correctAnswers, incorrectAnswers, onRestart, onClose }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Puntaje Final</h2>
      <p className="text-lg text-indigo-700">Puntaje: {score} puntos</p>
      <p className="text-lg text-green-600">Correctas: {correctAnswers}</p>
      <p className="text-lg text-red-600">Incorrectas: {incorrectAnswers}</p>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          onClick={onRestart}
        >
          Jugar de nuevo
        </button>
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
          onClick={onClose}
        >
          Menú principal
        </button>
      </div>
    </div>
  );
}

export default FinalScore;
