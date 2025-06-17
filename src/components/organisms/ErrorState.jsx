import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ErrorState = ({ 
  message = 'Something went wrong', 
  onRetry,
  showIcon = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full text-center p-8"
    >
      {showIcon && (
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <ApperIcon 
            name="AlertCircle" 
            size={48} 
            className="text-error" 
          />
        </motion.div>
      )}

      <Text 
        size="lg" 
        weight="semibold" 
        color="primary" 
        className="mb-2"
      >
        Oops! Something went wrong
      </Text>

      <Text 
        size="base" 
        color="muted" 
        className="mb-6 max-w-md"
      >
        {message}
      </Text>

      {onRetry && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="secondary" onClick={onRetry}>
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ErrorState;