import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShieldCheck, Camera, Users2, Mail, Phone, Menu, User, LayoutGrid, LogOut, Rocket } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/", icon: <ShieldCheck className="w-5 h-5" /> },
    { name: "Cameras", path: "/surveillance", icon: <Camera className="w-5 h-5" /> },
    { name: "Community", path: "/community", icon: <Users2 className="w-5 h-5" /> },
    { name: "Feedback", path: "/feedback", icon: <Mail className="w-5 h-5" /> },
    { name: "Contact Us", path: "/contact-us", icon: <Phone className="w-5 h-5" /> },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem('user');
      const userObj = JSON.parse(userString);
      setUser(userObj);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    toast.success('Logged out successfully!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => window.location.href = '/', 2000);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="fixed w-full bg-gradient-to-b from-gray-900/90 to-gray-900/30 backdrop-blur-xl border-b border-gray-800 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section - Updated */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 group"
          >
            <div className="p-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 shadow-lg shadow-emerald-500/20">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
              DEEPVISION AI
            </span>
          </motion.div>

          {/* Desktop Navigation - Updated Colors */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-emerald-400 relative group"
              >
                <Link to={item.path} className="flex items-center space-x-2">
                  {item.icon && (
                    <span className="text-emerald-400/80">
                      {item.icon}
                    </span>
                  )}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/80 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}

            {/* User Dropdown - Updated Styling */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  <div className="p-1.5 rounded-full bg-gradient-to-r from-emerald-400/20 to-green-600/20 border border-emerald-400/30">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">
                    Hi {user?.first_name} {user?.last_name}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-xl border border-gray-700"
                    >
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2.5 text-gray-300 hover:bg-gray-700/50 transition-colors"
                        >
                          <LayoutGrid className="w-5 h-5 mr-2 text-emerald-400" />
                          Dashboard
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full flex items-center px-4 py-2.5 text-gray-300 hover:bg-gray-700/50 transition-colors"
                        >
                          <LogOut className="w-5 h-5 mr-2 text-emerald-400" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login-register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
                >
                  <Rocket className="w-5 h-5 text-white" />
                  <span className="text-sm font-semibold text-white">Get Started</span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="md:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
          >
            <Menu className="w-6 h-6" />
          </motion.button>

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;