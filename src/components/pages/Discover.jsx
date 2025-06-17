import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { bookService } from '@/services';
import Header from '@/components/organisms/Header';
import FilterBar from '@/components/molecules/FilterBar';
import SwipeStack from '@/components/organisms/SwipeStack';
import SwipeActions from '@/components/molecules/SwipeActions';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import ApperIcon from '@/components/ApperIcon';

const Discover = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await bookService.getRandomStack(15);
      setBooks(result);
    } catch (err) {
      setError(err.message || 'Failed to load books');
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = selectedGenres.length > 0 
    ? books.filter(book => 
        book.genres?.some(genre => selectedGenres.includes(genre))
      )
    : books;

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleGenreClear = () => {
    setSelectedGenres([]);
  };

  const handleSwipe = (book, direction) => {
    if (direction === 'right') {
      setLikedBooks(prev => [...prev, book]);
      toast.success(`Added "${book.title}" to your library!`, {
        icon: '📚'
      });
    }
    setCurrentBookIndex(prev => prev + 1);
  };

  const handleLike = () => {
    const currentBook = filteredBooks[currentBookIndex];
    if (currentBook) {
      handleSwipe(currentBook, 'right');
    }
  };

  const handlePass = () => {
    const currentBook = filteredBooks[currentBookIndex];
    if (currentBook) {
      handleSwipe(currentBook, 'left');
    }
  };

  const handleSuperLike = () => {
    const currentBook = filteredBooks[currentBookIndex];
    if (currentBook) {
      setLikedBooks(prev => [...prev, { ...currentBook, superLiked: true }]);
      toast.success(`Super liked "${currentBook.title}"! 🌟`, {
        icon: '⭐'
      });
      setCurrentBookIndex(prev => prev + 1);
    }
  };

  const availableBooks = filteredBooks.slice(currentBookIndex);

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="BookMatch" 
          subtitle="Discover your next favorite read"
          showLogo={true}
        />
        <div className="flex-1 p-4">
          <SkeletonLoader type="card" count={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="BookMatch" 
          subtitle="Discover your next favorite read"
          showLogo={true}
        />
        <div className="flex-1">
          <ErrorState 
            message={error}
            onRetry={loadBooks}
          />
        </div>
      </div>
    );
  }

return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col bg-gradient-literary"
    >
      {/* Hero Header Section */}
      <div className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-8">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mr-3"
              >
                <ApperIcon name="BookOpen" size={32} className="text-white" />
              </motion.div>
              <h1 className="text-3xl font-display font-bold text-white animate-glow">
                BookMatch
              </h1>
            </div>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-white/90 font-medium mb-2"
            >
              Discover Your Next Literary Adventure
            </motion.p>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white/80 text-sm mb-4"
            >
              Swipe through curated books tailored to your taste
            </motion.p>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center justify-center space-x-4"
            >
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <ApperIcon name="Heart" size={16} className="text-white" />
                <span className="text-white text-sm font-medium">
                  {likedBooks.length} books saved
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
                onClick={loadBooks}
              >
                <ApperIcon name="RotateCcw" size={20} className="text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Book Icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-4 opacity-20"
        >
          <ApperIcon name="BookOpen" size={24} className="text-white" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-12 left-4 opacity-20"
        >
          <ApperIcon name="Book" size={20} className="text-white" />
        </motion.div>
      </div>

      <FilterBar
        selectedGenres={selectedGenres}
        onGenreToggle={handleGenreToggle}
        onClear={handleGenreClear}
      />

      <div className="flex-1 flex flex-col p-4">
        {availableBooks.length === 0 ? (
          <EmptyState
            icon="BookOpen"
            title="No more books!"
            description="You've seen all available books. Check back later for new recommendations or adjust your filters."
            actionLabel="Reset Filters"
            onAction={handleGenreClear}
          />
        ) : (
          <>
            <SwipeStack
              books={availableBooks}
              onSwipe={handleSwipe}
            />

            <SwipeActions
              onPass={handlePass}
              onLike={handleLike}
              onSuperLike={handleSuperLike}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Discover;