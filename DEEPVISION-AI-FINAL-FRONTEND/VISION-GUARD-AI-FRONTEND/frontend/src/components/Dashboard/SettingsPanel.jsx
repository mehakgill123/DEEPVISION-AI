import { useState } from 'react';
import { toast } from 'react-toastify';

const SettingsPanel = () => {
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [emailData, setEmailData] = useState({
    current: '',
    new: ''
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      toast.error("New passwords don't match!");
      return;
    }
    // Add your password update logic here
    toast.success("Password updated successfully!");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Add your email update logic here
    toast.success("Email updated successfully!");
  };

  return (
    <div className="space-y-8 p-4">
      {/* Password Update */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-green-400">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <input
            type="password"
            name="current"
            placeholder="Current Password"
            value={passwordData.current}
            onChange={handlePasswordChange}
            className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-300 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
            required
          />
          <input
            type="password"
            name="new"
            placeholder="New Password"
            value={passwordData.new}
            onChange={handlePasswordChange}
            className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-300 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            value={passwordData.confirm}
            onChange={handlePasswordChange}
            className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-300 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
            required
          />
          <button 
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Email Update */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-green-400">Change Email</h3>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <input
            type="email"
            name="current"
            placeholder="Current Email"
            value={emailData.current}
            onChange={handleEmailChange}
            className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-300 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
            required
          />
          <input
            type="email"
            name="new"
            placeholder="New Email"
            value={emailData.new}
            onChange={handleEmailChange}
            className="w-full bg-slate-700/40 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-300 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
            required
          />
          <button 
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg transition-colors"
          >
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPanel;