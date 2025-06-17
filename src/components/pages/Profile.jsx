import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { userService, bookService } from '@/services';
import Header from '@/components/organisms/Header';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import GenreChip from '@/components/atoms/GenreChip';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import ApperIcon from '@/components/ApperIcon';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    readingGoal: '',
    favoriteGenres: []
  });

  const allGenres = [
    'Romance', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller',
    'Historical Fiction', 'Contemporary Fiction', 'Self-Help', 'Biography',
    'Psychology', 'Adventure', 'Horror', 'Comedy', 'Drama', 'Philosophy'
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userResult, booksResult] = await Promise.all([
        userService.getCurrentUser(),
        bookService.getAll()
      ]);
      
      setUser(userResult);
      setBooks(booksResult);
      
      setEditForm({
        name: userResult.name,
        readingGoal: userResult.readingGoal.toString(),
        favoriteGenres: userResult.favoriteGenres || []
      });
    } catch (err) {
      setError(err.message || 'Failed to load profile');
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        name: editForm.name,
        readingGoal: parseInt(editForm.readingGoal, 10),
        favoriteGenres: editForm.favoriteGenres
      };
      
      await userService.update(user.Id, updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleGenreToggle = (genre) => {
    setEditForm(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const getBooksById = (bookIds) => {
    return books.filter(book => bookIds?.includes(book.Id)) || [];
  };

  const readBooks = user ? getBooksById(user.booksRead) : [];
  const currentlyReading = user ? getBooksById(user.currentlyReading) : [];
  const progressPercentage = user?.readingGoal 
    ? Math.round((readBooks.length / user.readingGoal) * 100)
    : 0;

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="Profile" 
          subtitle="Your reading profile"
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
          title="Profile" 
          subtitle="Your reading profile"
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col bg-background"
    >
      <Header 
        title="Profile" 
        subtitle="Your reading journey"
        action={
          <Button
            variant={isEditing ? "accent" : "outline"}
            size="sm"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            <ApperIcon 
              name={isEditing ? "Check" : "Edit"} 
              size={16} 
              className="mr-1" 
            />
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-md border border-surface"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Avatar 
                src={user?.avatar} 
                alt={user?.name} 
                size="xl"
              />
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="mb-2"
                  />
                ) : (
                  <Text size="2xl" weight="bold">{user?.name}</Text>
                )}
                <Text size="sm" color="muted">Book lover since 2020</Text>
              </div>
            </div>

            {/* Reading Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Text size="2xl" weight="bold" color="secondary">
                  {readBooks.length}
                </Text>
                <Text size="sm" color="muted">Books Read</Text>
              </div>
              <div className="text-center">
                <Text size="2xl" weight="bold" color="accent">
                  {currentlyReading.length}
                </Text>
                <Text size="sm" color="muted">Currently Reading</Text>
              </div>
              <div className="text-center">
                <Text size="2xl" weight="bold" color="primary">
                  {progressPercentage}%
                </Text>
                <Text size="sm" color="muted">Goal Progress</Text>
              </div>
            </div>
          </motion.div>

          {/* Reading Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-md border border-surface"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Target" size={20} className="text-accent" />
                <Text size="lg" weight="semibold">Reading Goal</Text>
              </div>
              {isEditing && (
                <Input
                  type="number"
                  value={editForm.readingGoal}
                  onChange={(e) => setEditForm(prev => ({ ...prev, readingGoal: e.target.value }))}
                  className="w-20"
                  placeholder="24"
                />
              )}
            </div>

            {!isEditing && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <Text size="base">
                    {readBooks.length} of {user?.readingGoal} books
                  </Text>
                  <Text size="sm" color="accent" weight="medium">
                    {progressPercentage}%
                  </Text>
                </div>
                
                <div className="w-full bg-surface rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-accent h-3 rounded-full"
                  />
                </div>
              </>
            )}
          </motion.div>

          {/* Favorite Genres */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-md border border-surface"
          >
            <div className="flex items-center space-x-2 mb-4">
              <ApperIcon name="Heart" size={20} className="text-secondary" />
              <Text size="lg" weight="semibold">Favorite Genres</Text>
            </div>

            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                allGenres.map((genre) => (
                  <GenreChip
                    key={genre}
                    genre={genre}
                    isSelected={editForm.favoriteGenres.includes(genre)}
                    onClick={handleGenreToggle}
                  />
                ))
              ) : (
                user?.favoriteGenres?.map((genre) => (
                  <GenreChip
                    key={genre}
                    genre={genre}
                    isSelected={true}
                  />
                ))
              )}
            </div>
          </motion.div>

          {isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-3"
            >
              <Button
                variant="secondary"
                onClick={handleSave}
                className="flex-1"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({
                    name: user.name,
                    readingGoal: user.readingGoal.toString(),
                    favoriteGenres: user.favoriteGenres || []
                  });
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;