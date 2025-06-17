import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GenreChip from '@/components/atoms/GenreChip';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const FilterBar = ({ selectedGenres = [], onGenreToggle, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const allGenres = [
    'Romance', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller',
    'Historical Fiction', 'Contemporary Fiction', 'Self-Help', 'Biography',
    'Psychology', 'Adventure', 'Horror', 'Comedy', 'Drama', 'Philosophy'
  ];

  const visibleGenres = isExpanded ? allGenres : allGenres.slice(0, 6);

  return (
    <div className="bg-white border-b border-surface px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Filter" size={20} className="text-primary" />
          <span className="text-primary font-medium">Filter by genre</span>
        </div>
        
        {selectedGenres.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-secondary"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {visibleGenres.map((genre) => (
              <motion.div
                key={genre}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <GenreChip
                  genre={genre}
                  isSelected={selectedGenres.includes(genre)}
                  onClick={onGenreToggle}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {allGenres.length > 6 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary"
          >
            {isExpanded ? 'Show less' : `Show ${allGenres.length - 6} more`}
            <ApperIcon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="ml-1" 
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;