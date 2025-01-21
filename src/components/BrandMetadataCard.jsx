import { useState } from 'react';
import {
  GlobeAltIcon,
  ChatBubbleLeftIcon,
  PhotoIcon,
  LinkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const BrandMetadataCard = ({ brand }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxDescriptionLength = 150;

  const socialLinks = [
    { url: brand.twitter_url, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>, name: 'Twitter' },
    { url: brand.discord_url, icon: <ChatBubbleLeftIcon className="w-5 h-5" />, name: 'Discord' },
    { url: brand.instagram_url, icon: <PhotoIcon className="w-5 h-5" />, name: 'Instagram' },
    { url: brand.medium_url, icon: <GlobeAltIcon className="w-5 h-5" />, name: 'Medium' },
    { url: brand.telegram_url, icon: <ChatBubbleLeftIcon className="w-5 h-5" />, name: 'Telegram' },
  ].filter(link => link.url);

  const description = brand.description || 'No description available';
  const isDescriptionLong = description.length > maxDescriptionLength;
  const truncatedDescription = isDescriptionLong 
    ? `${description.slice(0, maxDescriptionLength)}...`
    : description;

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-primary/30 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
              {brand.brand}
            </h3>
            <p className="text-gray-400 text-sm">{brand.category}</p>
          </div>
          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
            {brand.contract_type}
          </span>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-gray-300 text-sm">
            {isExpanded ? description : truncatedDescription}
          </p>
          {isDescriptionLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary/80 hover:text-primary text-sm flex items-center space-x-1 transition-colors"
            >
              <span>{isExpanded ? 'Show less' : 'Read more'}</span>
              {isExpanded ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Contract Address */}
        <div className="flex items-center space-x-2 text-gray-400 bg-gray-800/50 rounded-lg p-3">
          <LinkIcon className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm truncate font-mono">{brand.contract_address}</p>
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700/50 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                title={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BrandMetadataCard;
