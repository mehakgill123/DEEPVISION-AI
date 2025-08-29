import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Edit, Trash, Plus } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const CamerasPage = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [formData, setFormData] = useState({ name: '', ip_url: '' });

  const [streamingCameraId, setStreamingCameraId] = useState(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-register');
    }
  }, []);

  useEffect(() => {
    fetchCameras();
  }, []);

  const fetchCameras = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}surveillance/get_cameras/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCameras(response.data.cameras);
    } catch (error) {
      toast.error('Failed to fetch cameras');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCamera = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}surveillance/add_camera/`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCameras();
      setShowAddModal(false);
      toast.success('Camera added successfully');
    } catch (error) {
      toast.error('Failed to add camera');
    }
  };

  const handleUpdateCamera = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${BASE_URL}surveillance/update_camera/${selectedCamera.id}/`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCameras();
      setShowEditModal(false);
      toast.success('Camera updated successfully');
    } catch (error) {
      toast.error('Failed to update camera');
    }
  };

  const handleDeleteCamera = async (cameraId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/surveillance/delete_camera/${cameraId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCameras();
      toast.success('Camera deleted successfully');
    } catch (error) {
      toast.error('Failed to delete camera');
    }
  };

  const handleStream = (camera) => {
    setStreamingCameraId(camera.id);
    setIsStreamActive(false);
  };

  const startStream = () => {
    setIsStreamActive(true);
  };

  const stopStream = () => {
    setStreamingCameraId(null);
    setIsStreamActive(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar />

      <div className="flex-grow min-h-[600px] overflow-y-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add Camera Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700 cursor-pointer hover:border-cyan-400 transition-all"
            onClick={() => setShowAddModal(true)}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <Plus className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-100">Add New Camera</h3>
            </div>
          </motion.div>

          {/* Camera Cards / Stream Cards */}
          {cameras.map((camera) =>
            streamingCameraId === camera.id ? (
              // Stream Card
              <motion.div
                key={camera.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700"
              >
                <h3 className="text-xl font-semibold text-slate-100 mb-4">
                  Streaming - {camera.name}
                </h3>
                <div className="flex justify-end space-x-3 mb-4">
                  {!isStreamActive && (
                    <button
                      onClick={startStream}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                    >
                      Start Stream
                    </button>
                  )}
                  <button
                    onClick={stopStream}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    Stop Stream
                  </button>
                </div>
                {isStreamActive && (
                  <div className="mt-4">
                    <img
                      id="video_display"
                      src={`${BASE_URL}surveillance/video/?camera_id=${camera.id}&token=${localStorage.getItem('token')}`}
                      alt="Streaming Video"
                      width="640"
                      height="480"
                    />
                  </div>
                )}
              </motion.div>
            ) : (
              // Normal Camera Card
              <motion.div
                key={camera.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">{camera.name}</h3>
                    <p className="text-slate-400 text-sm">{camera.ip_url}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStream(camera)}
                      className="p-2 hover:bg-slate-700/50 rounded-lg text-cyan-400"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${camera.is_active ? 'bg-green-400' : 'bg-red-400'}`} />
                    <span className="text-sm text-slate-400">
                      {camera.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCamera(camera);
                        setFormData({ name: camera.name, ip_url: camera.ip_url });
                        setShowEditModal(true);
                      }}
                      className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-300"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCamera(camera.id)}
                      className="p-2 hover:bg-slate-700/50 rounded-lg text-red-400"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Add Camera Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-slate-800/90 backdrop-blur-lg rounded-xl p-6 w-full max-w-md border border-slate-700"
            >
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Add New Camera</h3>
              <form onSubmit={handleAddCamera} className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2">Camera Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-700/40 rounded-lg px-4 py-2 text-slate-300 border border-slate-600"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">IP Address/URL</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-700/40 rounded-lg px-4 py-2 text-slate-300 border border-slate-600"
                    value={formData.ip_url}
                    onChange={(e) => setFormData({ ...formData, ip_url: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-slate-300 hover:text-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                  >
                    Add Camera
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Edit Camera Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-slate-800/90 backdrop-blur-lg rounded-xl p-6 w-full max-w-md border border-slate-700"
            >
              <h3 className="text-xl font-semibold text-slate-100 mb-4">Edit Camera</h3>
              <form onSubmit={handleUpdateCamera} className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2">Camera Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-700/40 rounded-lg px-4 py-2 text-slate-300 border border-slate-600"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">IP Address/URL</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-700/40 rounded-lg px-4 py-2 text-slate-300 border border-slate-600"
                    value={formData.ip_url}
                    onChange={(e) => setFormData({ ...formData, ip_url: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-slate-300 hover:text-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                  >
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CamerasPage;