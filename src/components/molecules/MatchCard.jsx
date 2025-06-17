import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const MatchCard = ({ match, user, sharedBooksCount }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate(`/chat/${match.Id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg shadow-md p-4 border border-surface cursor-pointer"
      onClick={handleChatClick}
    >
      <div className="flex items-center space-x-3 mb-3">
        <Avatar 
          src={user?.avatar} 
          alt={user?.name} 
          size="lg"
        />
        <div className="flex-1 min-w-0">
          <Text size="lg" weight="semibold" className="truncate">
            {user?.name}
          </Text>
          <div className="flex items-center space-x-1 text-accent">
            <ApperIcon name="BookOpen" size={14} />
            <Text size="sm" color="muted">
              {sharedBooksCount} shared {sharedBooksCount === 1 ? 'book' : 'books'}
            </Text>
          </div>
        </div>
        <ApperIcon name="MessageCircle" size={20} className="text-primary" />
      </div>

      {match.lastMessage && (
        <div className="bg-surface rounded-lg p-3">
          <Text size="sm" color="muted" className="line-clamp-2">
            {match.lastMessage}
          </Text>
        </div>
      )}
    </motion.div>
  );
};

export default MatchCard;