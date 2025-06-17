import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { matchService, userService } from '@/services';
import Header from '@/components/organisms/Header';
import MatchCard from '@/components/molecules/MatchCard';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import EmptyState from '@/components/organisms/EmptyState';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [matchesResult, usersResult, currentUserResult] = await Promise.all([
        matchService.getAll(),
        userService.getAll(),
        userService.getCurrentUser()
      ]);
      
      setMatches(matchesResult);
      setUsers(usersResult);
      setCurrentUser(currentUserResult);
    } catch (err) {
      setError(err.message || 'Failed to load matches');
      toast.error('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const userMatches = matches.filter(match => 
    currentUser && (match.userId1 === currentUser.Id || match.userId2 === currentUser.Id)
  );

  const getMatchUser = (match) => {
    if (!currentUser) return null;
    const otherUserId = match.userId1 === currentUser.Id ? match.userId2 : match.userId1;
    return users.find(user => user.Id === otherUserId);
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="Your Matches" 
          subtitle="Connect with fellow book lovers"
        />
        <div className="flex-1 p-4">
          <SkeletonLoader type="list" count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="Your Matches" 
          subtitle="Connect with fellow book lovers"
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

  if (userMatches.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="Your Matches" 
          subtitle="Connect with fellow book lovers"
        />
        <div className="flex-1">
          <EmptyState
            icon="Users"
            title="No matches yet"
            description="Start swiping on books to connect with readers who share your interests!"
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
        title="Your Matches" 
        subtitle={`${userMatches.length} ${userMatches.length === 1 ? 'match' : 'matches'}`}
      />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          {userMatches.map((match, index) => {
            const user = getMatchUser(match);
            if (!user) return null;

            return (
              <motion.div
                key={match.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MatchCard
                  match={match}
                  user={user}
                  sharedBooksCount={match.sharedBooks?.length || 0}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Matches;