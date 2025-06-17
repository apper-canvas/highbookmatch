import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import ApperIcon from '@/components/ApperIcon';

const BookshelfSection = ({ title, books, icon, onBookClick }) => {
  if (!books || books.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <ApperIcon name={icon} size={20} className="text-primary" />
          <Text size="lg" weight="semibold">{title}</Text>
        </div>
        <div className="text-center py-8 text-gray-500">
          <ApperIcon name="BookOpen" size={48} className="mx-auto mb-2 text-gray-300" />
          <Text size="sm" color="muted">No books yet</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <ApperIcon name={icon} size={20} className="text-primary" />
        <Text size="lg" weight="semibold">{title}</Text>
        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
          {books.length}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book, index) => (
          <motion.div
            key={book.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => onBookClick?.(book)}
          >
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-md group">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Text size="xs" color="white" weight="medium" className="line-clamp-2">
                  {book.title}
                </Text>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookshelfSection;