import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/LoginRegister';
import DashboardPage from './pages/DashboardPage';

import CamerasPage from './pages/CamerasPage';

import CommunityPage from './pages/CommunityPage';
import NewPost from './components/Community/NewPost';
import PostDetail from './components/Community/PostDetail';

import FeedbackPage from './pages/FeedbackPage';
import ContactusPage from './pages/ContactusPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/surveillance" element={<CamerasPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/contact-us" element={<ContactusPage />} />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/new-post" element={<NewPost />} />
        <Route path="/community/posts/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;