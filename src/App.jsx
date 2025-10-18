import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import NavigationBar from './components/NavigationBar';
import SidebarMenu from './components/SidebarMenu';
import Toast from './components/Toast';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import SearchResults from './pages/SearchResults';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-dark-bg">
            <NavigationBar />
            <SidebarMenu />
            <Toast />
            
            <main className="lg:ml-64">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryNo" element={<CategoryPage />} />
                <Route path="/video/:videoId" element={<VideoPlayerPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
