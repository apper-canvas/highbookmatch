import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const SwipeActions = ({ onPass, onLike, onSuperLike }) => {
  return (
    <div className="flex justify-center items-center space-x-6 py-6">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="lg"
          onClick={onPass}
          className="w-16 h-16 rounded-full border-gray-300 text-gray-600 hover:border-gray-400"
        >
          <ApperIcon name="X" size={24} />
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="accent"
          size="lg"
          onClick={onSuperLike}
          className="w-16 h-16 rounded-full"
        >
          <ApperIcon name="Star" size={24} />
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="secondary"
          size="lg"
          onClick={onLike}
          className="w-20 h-20 rounded-full animate-heart-pulse"
        >
          <ApperIcon name="Heart" size={28} />
        </Button>
      </motion.div>
    </div>
  );
};

export default SwipeActions;