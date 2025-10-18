import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCarousel = ({ categories, activeCategory, onCategoryChange }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    setTimeout(() => updateArrows(), 100);
  };

  const updateArrows = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const handleCategoryClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    navigate(`/category/${category.categoryNo}`);
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-dark-card/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-primary-purple transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Categories */}
      <div
        ref={scrollContainerRef}
        onScroll={updateArrows}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* All Categories */}
        <button
          onClick={() => navigate('/')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
            !activeCategory
              ? 'bg-gradient-to-r from-primary-purple to-primary-pink text-white shadow-lg scale-105'
              : 'bg-dark-card text-gray-300 hover:bg-dark-hover border border-gray-700'
          }`}
        >
          All Categories
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
              activeCategory?.categoryNo === category.categoryNo
                ? 'bg-gradient-to-r from-primary-purple to-primary-pink text-white shadow-lg scale-105'
                : 'bg-dark-card text-gray-300 hover:bg-dark-hover border border-gray-700'
            }`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-dark-card/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-primary-purple transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default CategoryCarousel;
