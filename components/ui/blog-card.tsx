import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  image?: string;
  className?: string;
  date?: string;
  readTime?: string;
  category?: string;
}

export function BlogCard({
  id,
  title,
  content,
  image = '/default-blog-image.jpg',
  className = '',
  date = 'Maggio 2025',
  readTime = '5 min',
  category = 'Agricoltura'
}: BlogCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden group ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-green-800/20 z-10 group-hover:bg-green-800/10 transition-colors duration-300" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/90 backdrop-blur-sm text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime} lettura</span>
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-3 mb-4">
            {content.slice(16)}
          </p>
          <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
            Leggi di più
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
