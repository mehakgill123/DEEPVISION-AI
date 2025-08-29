import React, { useState } from 'react';
import { Eye, Cpu, BrainCircuit, Fingerprint, Mail, Shield } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import RecentPosts from '../components/Community/RecentPosts';

const CommunityPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Navbar - Now properly included */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <section className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Eye className="w-10 h-10 text-green-400 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              DEEPVISION AI 
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-8">
            Secure Access to Next-Gen Surveillance Solutions
          </p>
        </section>

        {/* Technology Section */}
        <section className="bg-slate-800/50 border border-green-500/20 rounded-xl p-8 mb-12 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center text-green-400">
            <Eye className="w-6 h-6 mr-2 text-green-400" />
            DEEPVISION AI Technology
          </h2>
          <p className="text-slate-300 mb-8 text-center max-w-2xl mx-auto">
            Revolutionizing visual intelligence with cutting-edge AI technology for a smarter future.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Solutions Card */}
            <div className="bg-slate-700/40 p-6 rounded-lg border border-slate-600">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-green-400">AI Solutions</h3>
              </div>
              <ul className="space-y-3 pl-8">
                <li className="flex items-center text-slate-200">
                  <Cpu className="w-5 h-5 mr-3 text-green-400" />
                  Computer Vision
                </li>
                <li className="flex items-center text-slate-200">
                  <BrainCircuit className="w-5 h-5 mr-3 text-green-400" />
                  Neural Networks
                </li>
                <li className="flex items-center text-slate-200">
                  <Cpu className="w-5 h-5 mr-3 text-green-400" />
                  Edge AI
                </li>
                <li className="flex items-center text-slate-200">
                  <Fingerprint className="w-5 h-5 mr-3 text-green-400" />
                  Biometric ID
                </li>
              </ul>
            </div>

            {/* AI Insights Card */}
            <div className="bg-slate-700/40 p-6 rounded-lg border border-slate-600">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 rounded-full border-2 border-green-400 mr-3"></div>
                <h3 className="text-lg font-semibold text-green-400">AI Insights</h3>
              </div>
              <p className="text-slate-300 mb-4 pl-8">
                Subscribe to our newsletter for the latest in vision AI technology.
              </p>
              <form onSubmit={handleSubscribe} className="pl-8">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg mb-3 focus:ring-2 focus:ring-green-400/20 focus:border-green-400 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 px-6 py-2 rounded-lg font-medium transition-all"
                >
                  Subscribe Now
                </button>
              </form>
              {isSubscribed && (
                <p className="mt-3 text-green-400 text-sm pl-8">Thank you for subscribing!</p>
              )}
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        <section className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Get Started with DeepVision</h3>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 rounded-lg flex items-center gap-2 text-white transition-all">
              <Shield className="w-5 h-5" />
              Request Demo
            </button>
            <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 text-white transition-all">
              <Mail className="w-5 h-5" />
              Contact Sales
            </button>
          </div>
        </section>
      </main>
      <RecentPosts />
      <Footer />
    </div>
  );
};

export default CommunityPage;