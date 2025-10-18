import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  
  // In a real app, you'd fetch search results from API
  // For now, we'll show a placeholder
  const [results] = useState([]);
  const [loading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // Here you would typically fetch search results
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-20 px-4">
      <div className="container mx-auto py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full px-4 py-3 pl-12 bg-dark-card border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary-purple transition-colors"
                autoFocus
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Search Results */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            {query ? `Search results for "${query}"` : 'Search Videos'}
          </h2>

          {query && results.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-gray-500">
                Try searching with different keywords
              </p>
            </div>
          )}

          {!query && (
            <div className="text-center py-20">
              <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Enter a search term to find videos
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Video cards would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
