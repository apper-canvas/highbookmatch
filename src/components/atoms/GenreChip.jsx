import { motion } from 'framer-motion';

const GenreChip = ({ 
  genre, 
  isSelected = false, 
  onClick, 
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(genre)}
      className={`
        ${sizes[size]}
        rounded-full font-medium transition-all duration-200
        ${isSelected 
          ? 'bg-secondary text-white shadow-md' 
          : 'bg-surface text-primary hover:bg-gray-300'
        }
        ${className}
      `}
    >
      {genre}
    </motion.button>
  );
};

export default GenreChip;