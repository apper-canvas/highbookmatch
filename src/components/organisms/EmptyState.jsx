import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  illustration 
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center h-full text-center p-8"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-6"
      >
        {illustration || (
          <ApperIcon 
            name={icon || "BookOpen"} 
            size={64} 
            className="text-gray-300" 
          />
        )}
      </motion.div>

      <Text 
        size="xl" 
        weight="semibold" 
        color="primary" 
        className="mb-2"
      >
        {title}
      </Text>

      <Text 
        size="base" 
        color="muted" 
        className="mb-6 max-w-md"
      >
        {description}
      </Text>

      {actionLabel && onAction && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;