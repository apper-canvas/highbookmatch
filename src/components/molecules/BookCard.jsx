import { motion } from 'framer-motion';
import Text from '@/components/atoms/Text';
import GenreChip from '@/components/atoms/GenreChip';
import ApperIcon from '@/components/ApperIcon';

const BookCard = ({ 
  book, 
  onSwipe, 
  style,
  dragConstraints,
  onDragEnd,
  ...props 
}) => {
  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={style}
      drag
      dragConstraints={dragConstraints}
      onDragEnd={onDragEnd}
      whileDrag={{ rotate: 5, scale: 1.05 }}
      {...props}
    >
      <div className="bg-white rounded-2xl shadow-xl h-full overflow-hidden border border-surface">
        {/* Book Cover */}
        <div className="relative h-3/5">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <ApperIcon name="Star" size={14} className="text-accent fill-current" />
            <Text size="sm" weight="medium">{book.rating}</Text>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-6 h-2/5 overflow-y-auto">
          <Text 
            variant="display" 
            size="xl" 
            weight="semibold" 
            className="mb-2 line-clamp-2"
          >
            {book.title}
          </Text>
          
          <Text 
            color="muted" 
            size="base" 
            className="mb-3"
          >
            by {book.author}
          </Text>

          <Text 
            size="sm" 
            color="muted" 
            className="mb-4 line-clamp-3"
          >
            {book.synopsis}
          </Text>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {book.genres?.slice(0, 3).map((genre, index) => (
              <GenreChip 
                key={index} 
                genre={genre} 
                size="sm"
              />
            ))}
          </div>

          {/* Book Details */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{book.pageCount} pages</span>
            <span>{book.publishYear}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;