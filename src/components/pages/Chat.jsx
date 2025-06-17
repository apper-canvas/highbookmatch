import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { matchService, userService, bookService } from '@/services';
import Avatar from '@/components/atoms/Avatar';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import SkeletonLoader from '@/components/organisms/SkeletonLoader';
import ErrorState from '@/components/organisms/ErrorState';
import ApperIcon from '@/components/ApperIcon';

const Chat = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [sharedBooks, setSharedBooks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [matchId]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [matchResult, usersResult, booksResult, currentUserResult] = await Promise.all([
        matchService.getById(parseInt(matchId, 10)),
        userService.getAll(),
        bookService.getAll(),
        userService.getCurrentUser()
      ]);
      
      setMatch(matchResult);
      setCurrentUser(currentUserResult);
      
      // Find the other user in the match
      const otherUserId = matchResult.userId1 === currentUserResult.Id 
        ? matchResult.userId2 
        : matchResult.userId1;
      const otherUserData = usersResult.find(user => user.Id === otherUserId);
      setOtherUser(otherUserData);
      
      // Get shared books
      const sharedBooksData = booksResult.filter(book => 
        matchResult.sharedBooks?.includes(book.Id)
      );
      setSharedBooks(sharedBooksData);
      
      // Simulate chat messages
      setMessages([
        {
          id: 1,
          senderId: otherUserId,
          text: matchResult.lastMessage || "Hi! I see we both love the same books!",
          timestamp: new Date(matchResult.timestamp)
        },
        {
          id: 2,
          senderId: currentUserResult.Id,
          text: "Yes! What did you think about the ending?",
          timestamp: new Date(Date.now() - 3600000)
        }
      ]);
    } catch (err) {
      setError(err.message || 'Failed to load chat');
      toast.error('Failed to load chat');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      senderId: currentUser.Id,
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    try {
      await matchService.update(match.Id, {
        ...match,
        lastMessage: newMessage
      });
      toast.success('Message sent!');
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4">
          <SkeletonLoader type="list" count={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <ErrorState 
          message={error}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col bg-background"
    >
      {/* Chat Header */}
      <header className="bg-white border-b border-surface px-4 py-3 z-40">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/matches')}
            className="p-2"
          >
            <ApperIcon name="ArrowLeft" size={20} />
          </Button>
          
          <Avatar 
            src={otherUser?.avatar} 
            alt={otherUser?.name} 
            size="md"
          />
          
          <div className="flex-1 min-w-0">
            <Text size="lg" weight="semibold" className="truncate">
              {otherUser?.name}
            </Text>
            <div className="flex items-center space-x-1">
              <ApperIcon name="BookOpen" size={14} className="text-accent" />
              <Text size="sm" color="muted">
                {sharedBooks.length} shared {sharedBooks.length === 1 ? 'book' : 'books'}
              </Text>
            </div>
          </div>
        </div>
      </header>

      {/* Shared Books */}
      {sharedBooks.length > 0 && (
        <div className="bg-white border-b border-surface p-4">
          <Text size="sm" color="muted" className="mb-2">Shared Books</Text>
          <div className="flex space-x-2 overflow-x-auto">
            {sharedBooks.map((book) => (
              <div key={book.Id} className="flex-shrink-0 w-12 h-16">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isOwnMessage = message.senderId === currentUser?.Id;
          
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                isOwnMessage 
                  ? 'bg-secondary text-white' 
                  : 'bg-white border border-surface'
              }`}>
                <Text size="sm" className={isOwnMessage ? 'text-white' : 'text-primary'}>
                  {message.text}
                </Text>
                <Text 
                  size="xs" 
                  className={`mt-1 ${isOwnMessage ? 'text-red-200' : 'text-gray-500'}`}
                >
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-surface p-4">
        <div className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            variant="secondary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-6"
          >
            <ApperIcon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;