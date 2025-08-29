import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, AlertCircle, Settings, LogOut } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import Profile from '../components/Dashboard/Profile';
import CommunityPosts from '../components/Dashboard/CommunityPosts';
import SubmittedFeedbacks from '../components/Dashboard/SubmittedFeedbacks';
import SettingsPanel from '../components/Dashboard/SettingsPanel';
import { BASE_URL } from '../config';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const userString = localStorage.getItem('user');
  const userObj = JSON.parse(userString);
  const [profileData, setProfileData] = useState(userObj);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login-register';
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile': return <Profile user={profileData} />;
      case 'posts': return <CommunityPosts />;
      case 'feedbacks': return <SubmittedFeedbacks />;
      case 'settings': return <SettingsPanel />;
      default: return <Profile user={profileData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900/95 flex flex-col">
      <Navbar />
      
      {/* Grid Layout Container */}
      <div className="mt-20 grid grid-cols-[auto_1fr] flex-1">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-64 bg-gray-800/60 backdrop-blur-md border-r border-gray-700 h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <img
                  src={`${BASE_URL}media/${profileData.profile_picture}`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-400/30"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
              </div>
              <div>
                <h3 className="text-white font-medium">{profileData.first_name} {profileData.last_name}</h3>
                <p className="text-sm text-gray-400">{profileData.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'profile', icon: <User size={18} />, label: 'Profile' },
                { id: 'posts', icon: <MessageSquare size={18} />, label: 'My Posts' },
                { id: 'feedbacks', icon: <AlertCircle size={18} />, label: 'Feedbacks' },
                { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-400/20 shadow-md'
                      : 'text-gray-300 hover:bg-gray-700/40 hover:text-white'
                  }`}
                >
                  <span className={`${activeTab === item.id ? 'text-blue-400' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg mt-6 transition-colors"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="h-[calc(100vh-5rem)] overflow-y-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 m-6 shadow-lg"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default DashboardPage;