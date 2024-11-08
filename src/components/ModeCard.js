import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Componente para cada tarjeta de modo
function ModeCard({ title, description, icon, bgImage, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer h-80"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${bgImage})` }}
        animate={{ filter: isHovered ? 'blur(3px)' : 'blur(0px)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
      <div className="relative h-full p-6 flex flex-col justify-end text-white">
        <h2 className="text-3xl font-bold mb-2">{title} {icon}</h2>
        <p className="text-base">{description}</p>
      </div>
    </motion.div>
  );
}

export default ModeCard;
