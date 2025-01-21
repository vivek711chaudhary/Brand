import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  GlobeAltIcon,
  ChatBubbleLeftIcon,
  PhotoIcon,
  NewspaperIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

const BrandCategoryCard = ({ brand }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  // Parse thumbnail palette
  const getPaletteColors = () => {
    try {
      if (!brand.thumbnail_palette) return ['#6366f1'];
      return JSON.parse(brand.thumbnail_palette.replace(/'/g, '"'));
    } catch {
      return ['#6366f1'];
    }
  };

  const paletteColors = getPaletteColors();

  // Social media links with icons
  const socialLinks = [
    { url: brand.discord_url, icon: ChatBubbleLeftIcon, label: 'Discord' },
    { url: brand.instagram_url, icon: PhotoIcon, label: 'Instagram' },
    { url: brand.medium_url, icon: NewspaperIcon, label: 'Medium' },
    { url: brand.telegram_url, icon: PaperAirplaneIcon, label: 'Telegram' },
    { url: brand.twitter_url, icon: GlobeAltIcon, label: 'Twitter' },
  ].filter(link => link.url);

  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-900">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <PhotoIcon className="w-20 h-20 text-gray-700" />
          </div>
        ) : (
          <motion.img
            src={brand.thumbnail_url}
            alt={brand.brand}
            onError={handleImageError}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
        
        {/* Category badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: paletteColors[0] + '33',
            color: paletteColors[0],
          }}
        >
          {brand.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">{brand.brand}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span className="capitalize">{brand.blockchain}</span>
            <span>•</span>
            <span>{brand.contract_type}</span>
          </div>
        </div>

        {/* Description */}
        {brand.description && (
          <p className="text-gray-400 text-sm line-clamp-3">
            {brand.description}
          </p>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {socialLinks.map(({ url, icon: Icon, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                title={label}
              >
                <Icon className="w-5 h-5 text-gray-400" />
              </a>
            ))}
          </div>
        )}

        {/* Contract Info */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex flex-col space-y-1">
            <span className="text-gray-400 text-sm">Contract Address</span>
            <span className="text-white font-mono text-sm truncate">
              {brand.contract_address}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BrandCategoryCard;
