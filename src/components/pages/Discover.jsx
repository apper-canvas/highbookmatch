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
      className="h-full flex flex-col bg-background"
    >
      <Header 
        title="BookMatch" 
        subtitle={`${likedBooks.length} books in your library`}
        showLogo={true}
        action={
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-surface"
          >
            <ApperIcon name="RotateCcw" size={20} className="text-primary" />
          </motion.button>
        }
      />

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