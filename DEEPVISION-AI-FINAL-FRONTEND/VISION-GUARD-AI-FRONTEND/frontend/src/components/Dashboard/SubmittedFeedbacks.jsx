import { useState } from 'react';
import { AlertCircle, Check, X, Clock } from 'lucide-react';

const SubmittedFeedbacks = () => {
  const [feedbacks] = useState([
    {
      id: 1,
      title: 'Feature Request: Night Mode',
      content: 'It would be great to have a dark mode option...',
      status: 'pending',
      date: '3 days ago'
    },
    {
      id: 2,
      title: 'Bug Report: Camera Feed Issue',
      content: 'Experiencing lag in the camera feed...',
      status: 'resolved',
      date: '1 week ago'
    },
    {
      id: 3,
      title: 'Suggestion: Mobile App',
      content: 'Would love to see a mobile version...',
      status: 'reviewing',
      date: '2 weeks ago'
    }
  ]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'resolved':
        return <Check className="w-4 h-4 text-emerald-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'reviewing':
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      default:
        return <X className="w-4 h-4 text-rose-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved':
        return 'bg-emerald-400/10 text-emerald-400';
      case 'pending':
        return 'bg-amber-400/10 text-amber-400';
      case 'reviewing':
        return 'bg-blue-400/10 text-blue-400';
      default:
        return 'bg-rose-400/10 text-rose-400';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r  from-green-400 to-green-600 bg-clip-text text-transparent">
        Submitted Feedbacks
      </h2>

      <div className="space-y-4">
        {feedbacks.map(feedback => (
          <div key={feedback.id} className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-100 font-medium">{feedback.title}</h3>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm ${getStatusColor(feedback.status)}`}>
                {getStatusIcon(feedback.status)}
                <span>{feedback.status}</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mt-2">{feedback.content}</p>
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-gray-500 text-xs">{feedback.date}</span>
              <button className="text-blue-400 hover:text-blue-300 text-xs">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm">Total Feedbacks</p>
          <p className="text-2xl font-bold text-gray-100">12</p>
        </div>
        <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm">Resolved</p>
          <p className="text-2xl font-bold text-emerald-400">8</p>
        </div>
        <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-amber-400">3</p>
        </div>
        <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400 text-sm">In Review</p>
          <p className="text-2xl font-bold text-blue-400">1</p>
        </div>
      </div>
    </div>
  );
};

export default SubmittedFeedbacks;