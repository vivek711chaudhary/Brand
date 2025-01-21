import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const CategoryBox = ({ category, isActive, onClick, count }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-6 transition-all duration-300 transform hover:scale-[1.02] ${
        isActive 
          ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 shadow-lg shadow-primary/10' 
          : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700'
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-semibold mb-2 ${isActive ? 'text-primary' : 'text-white'}`}>
            {category}
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              isActive ? 'bg-primary/20 text-primary' : 'bg-gray-700 text-gray-300'
            }`}>
              {count} {count === 1 ? 'Brand' : 'Brands'}
            </span>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isActive ? (
            <ChevronUpIcon className="w-6 h-6 text-primary" />
          ) : (
            <ChevronDownIcon className="w-6 h-6 text-gray-400" />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CategoryBox;
