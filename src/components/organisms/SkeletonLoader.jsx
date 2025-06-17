import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'card', count = 3 }) => {
  const shimmer = {
    animate: {
      backgroundPosition: ["200% 0", "-200% 0"],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const CardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
      <motion.div
        {...shimmer}
        className="h-48 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        style={{ backgroundSize: "400% 100%" }}
      />
      <motion.div
        {...shimmer}
        className="h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-3/4"
        style={{ backgroundSize: "400% 100%" }}
      />
      <motion.div
        {...shimmer}
        className="h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-1/2"
        style={{ backgroundSize: "400% 100%" }}
      />
    </div>
  );

  const ListSkeleton = () => (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              {...shimmer}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
              style={{ backgroundSize: "400% 100%" }}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                {...shimmer}
                className="h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-3/4"
                style={{ backgroundSize: "400% 100%" }}
              />
              <motion.div
                {...shimmer}
                className="h-3 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 w-1/2"
                style={{ backgroundSize: "400% 100%" }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const BookSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="aspect-[2/3]"
        >
          <motion.div
            {...shimmer}
            className="w-full h-full rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            style={{ backgroundSize: "400% 100%" }}
          />
        </motion.div>
      ))}
    </div>
  );

  switch (type) {
    case 'list':
      return <ListSkeleton />;
    case 'books':
      return <BookSkeleton />;
    default:
      return <CardSkeleton />;
  }
};

export default SkeletonLoader;