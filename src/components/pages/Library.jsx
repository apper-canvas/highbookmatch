import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { bookService, userService } from '@/services';
import Header from '@/components/organisms/Header';
import BookshelfSection from '@/components/molecules/BookshelfSection';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [booksResult, userResult] = await Promise.all([
        bookService.getAll(),
        userService.getCurrentUser()
      ]);
      
      setBooks(booksResult);
      setCurrentUser(userResult);
      
      // Simulate saved books from local storage or user preferences
      const savedBookIds = JSON.parse(localStorage.getItem('savedBooks') || '[]');
      const savedBooksData = booksResult.filter(book => savedBookIds.includes(book.Id));
      setSavedBooks(savedBooksData);
    } catch (err) {
      setError(err.message || 'Failed to load library');
      toast.error('Failed to load library');
    } finally {
      setLoading(false);
    }
  };

  const getBooksById = (bookIds) => {
    return books.filter(book => bookIds?.includes(book.Id)) || [];
  };

  const readBooks = currentUser ? getBooksById(currentUser.booksRead) : [];
  const currentlyReading = currentUser ? getBooksById(currentUser.currentlyReading) : [];

  const handleBookClick = (book) => {
    toast.info(`Opening "${book.title}"...`);
  };

  const progressPercentage = currentUser?.readingGoal 
    ? Math.round((readBooks.length / currentUser.readingGoal) * 100)
    : 0;

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="My Library" 
          subtitle="Your reading journey"
        />
        <div className="flex-1 p-4">
          <SkeletonLoader type="books" count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="My Library" 
          subtitle="Your reading journey"
        />
        <div className="flex-1">
          <ErrorState 
            message={error}
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }

  const totalBooks = readBooks.length + currentlyReading.length + savedBooks.length;

  if (totalBooks === 0) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="My Library" 
          subtitle="Your reading journey"
        />
        <div className="flex-1">
          <EmptyState
            icon="BookOpen"
            title="Your library is empty"
            description="Start discovering books to build your personal library. Like books while swiping to save them here!"
            actionLabel="Discover Books"
            onAction={() => window.location.href = '/'}
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
        title="My Library" 
        subtitle={`${totalBooks} books in your collection`}
      />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          {/* Reading Goal Progress */}
          {currentUser?.readingGoal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 mb-6 shadow-md border border-surface"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Target" size={20} className="text-accent" />
                  <Text size="lg" weight="semibold">Reading Goal Progress</Text>
                </div>
                <Text size="lg" weight="bold" color="accent">
                  {readBooks.length}/{currentUser.readingGoal}
                </Text>
              </div>
              
              <div className="w-full bg-surface rounded-full h-3 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-accent h-3 rounded-full"
                />
              </div>
              
              <Text size="sm" color="muted">
                {progressPercentage}% complete • {Math.max(0, currentUser.readingGoal - readBooks.length)} books to go
              </Text>
            </motion.div>
          )}

          {/* Currently Reading */}
          <BookshelfSection
            title="Currently Reading"
            books={currentlyReading}
            icon="BookOpenCheck"
            onBookClick={handleBookClick}
          />

          {/* Saved Books */}
          <BookshelfSection
            title="Want to Read"
            books={savedBooks}
            icon="Heart"
            onBookClick={handleBookClick}
          />

          {/* Read Books */}
          <BookshelfSection
            title="Finished Books"
            books={readBooks}
            icon="CheckCircle"
            onBookClick={handleBookClick}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Library;