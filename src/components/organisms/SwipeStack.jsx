import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '@/components/molecules/BookCard';

const SwipeStack = ({ books, onSwipe }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const handleDragEnd = (event, info, book) => {
    const threshold = 100;
    const { offset } = info;

    if (Math.abs(offset.x) > threshold) {
      const direction = offset.x > 0 ? 'right' : 'left';
      onSwipe(book, direction);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const visibleBooks = books.slice(currentIndex, currentIndex + 3);

  if (visibleBooks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-primary mb-2">No more books!</h3>
          <p className="text-gray-600">Check back later for new recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative flex-1 max-w-sm mx-auto">
      <AnimatePresence>
        {visibleBooks.map((book, index) => (
          <motion.div
            key={book.Id}
            className="absolute inset-0"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1 - (index * 0.05), 
              opacity: 1,
              zIndex: visibleBooks.length - index,
              y: index * 4
            }}
            exit={{ 
              x: 300,
              opacity: 0,
              transition: { duration: 0.3 }
            }}
            style={{
              pointerEvents: index === 0 ? 'auto' : 'none'
            }}
          >
            <BookCard
              book={book}
              onDragEnd={(event, info) => handleDragEnd(event, info, book)}
              dragConstraints={containerRef}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SwipeStack;