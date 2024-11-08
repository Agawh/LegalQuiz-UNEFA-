import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import FinalScore from './FinalScore';
import questionsData from '../data/questionsData';
import { FaArrowLeft } from 'react-icons/fa';

function Quiz({ difficulty, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  // Cargar preguntas en base a la dificultad
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const filteredQuestions = questionsData[difficulty];
      if (filteredQuestions && filteredQuestions.length > 0) {
        const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, 12);
        setQuestions(shuffledQuestions);
      }
      setIsLoading(false);
    }, 2000);
  }, [difficulty]);

  // Manejo del temporizador de cada pregunta
  useEffect(() => {
    if (timerActive && !showFinalScore && !isLoading && !isTransitioning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleAnswer(false, 0); // Marca como incorrecta si el tiempo se acaba
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showFinalScore, isLoading, currentQuestionIndex, isTransitioning, timerActive]);

  // Manejo de la respuesta seleccionada
  const handleAnswer = (isCorrect, points) => {
    setTimerActive(false); // Detiene el temporizador
    clearInterval(); // Asegura que el temporizador esté detenido

    if (isCorrect) {
      setScore(score + points);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    setIsTransitioning(true);

    // Transición con retraso de 1 segundo
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(30);
        setTimerActive(true); // Reactiva el temporizador para la próxima pregunta
      } else {
        setShowFinalScore(true);
      }
      setIsTransitioning(false);
    }, 1000);
  };

  // Reiniciar el cuestionario
  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowFinalScore(false);
    setTimeLeft(30);
    setTimerActive(true);
    const shuffledQuestions = questionsData[difficulty]
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);
    setQuestions(shuffledQuestions);
  };

  // Regresar al menú principal con pantalla de carga
  const handleReturnToMenu = () => {
    setShowLoadingScreen(true); // Muestra pantalla de carga
    setTimeout(() => {
      setShowLoadingScreen(false);
      onClose(); // Cierra el componente y vuelve al menú principal
    }, 2500); // Duración de pantalla de carga de 1.5 segundos
  };

  if (showLoadingScreen || questions.length === 0 || isLoading) {
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('fondocargando.jpg')" }}
      >
        <div className="loader rounded-full border-t-4 border-indigo-600 h-20 w-20 animate-spin"></div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: "url('fondoquiz.jpg')" }}
    >
      {/* Botón de regreso sin texto */}
      <button
        className="absolute top-6 left-6 bg-indigo-600 text-white p-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 flex items-center justify-center"
        onClick={handleReturnToMenu}
      >
        <FaArrowLeft size={24} />
      </button>

      {/* Contador de tiempo */}
      <div className="absolute top-6 right-6 text-3xl font-bold text-red-500">
        {timeLeft}s
      </div>

      {/* Contador de preguntas */}
      <div className="absolute top-16 right-6 text-lg font-semibold text-indigo-600 bg-white px-3 py-1 rounded-lg shadow-md">
        {currentQuestionIndex + 1} / {questions.length}
      </div>

      <AnimatePresence mode="wait">
        {!showFinalScore ? (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1, ease: "easeInOut" }} // Aceleración de animación
          >
            <QuestionCard
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              timeLeft={timeLeft}
              isTransitioning={isTransitioning}
            />
          </motion.div>
        ) : (
          <FinalScore
            score={score}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            onRestart={handleRestart}
            onClose={onClose}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Quiz;
