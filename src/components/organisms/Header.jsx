import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ title, subtitle, action, showLogo = false }) => {
  return (
    <header className="bg-white border-b border-surface px-4 py-4 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showLogo && (
            <motion.div
              whileHover={{ rotate: 15 }}
              className="bg-secondary rounded-full p-2"
            >
              <ApperIcon name="Heart" size={24} className="text-white" />
            </motion.div>
          )}
          <div>
            <Text 
              variant="display" 
              size="2xl" 
              weight="bold" 
              color="primary"
            >
              {title}
            </Text>
            {subtitle && (
              <Text size="sm" color="muted">
                {subtitle}
              </Text>
            )}
          </div>
        </div>
        
        {action && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {action}
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;