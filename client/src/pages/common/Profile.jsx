import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuthStore } from '../../store/authStore';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    address: '',
    bio: '',
    farmName: '',
    location: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileImage, setProfileImage] = useState('https://ui-avatars.com/api/?name=User&background=10b981&color=fff&size=200');

  useEffect(() => {
    if (user) {
      setFormData({ 
        name: user.name || '', 
        email: user.email || '', 
        phone: user.phone || '+91 98765 43210', 
        address: user.address || 'Mumbai, Maharashtra',
        bio: user.bio || 'Passionate about sustainable farming and organic produce.',
        farmName: user.farmName || 'Green Valley Farm',
        location: user.location || 'Maharashtra, India'
      });
      if (user.name) {
        setProfileImage(`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10b981&color=fff&size=200`);
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', formData);
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      alert('Error updating profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    try {
      await api.put('/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      alert('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert('Error changing password');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const stats = [
    { label: 'Orders', value: '24', icon: 'fa-shopping-bag', color: 'blue' },
    { label: 'Products', value: '12', icon: 'fa-box', color: 'green' },
    { label: 'Reviews', value: '48', icon: 'fa-star', color: 'yellow' },
    { label: 'Followers', value: '156', icon: 'fa-users', color: 'purple' }
  ];

  const activities = [
    { icon: 'fa-shopping-cart', text: 'Purchased Fresh Tomatoes', time: '2 hours ago', color: 'green' },
    { icon: 'fa-star', text: 'Received 5-star review', time: '5 hours ago', color: 'yellow' },
    { icon: 'fa-box', text: 'Added new product: Organic Rice', time: '1 day ago', color: 'blue' },
    { icon: 'fa-comment', text: 'New message from Priya Sharma', time: '2 days ago', color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)'
          }}></div>
        </div>
        <div className="container mx-auto px-6 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()} 
                className="mr-4 hover:bg-white hover:bg-opacity-20 p-3 rounded-xl transition-all transform hover:scale-110"
              >
                <i className="fas fa-arrow-left text-2xl"></i>
              </button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
                <p className="text-green-100 mt-1">Manage your profile and settings</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 border-2 border-gray-100">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                <button className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all">
                  <i className="fas fa-camera"></i>
                </button>
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold text-gray-800">{formData.name || 'User Name'}</h2>
                <p className="text-gray-600 text-lg">{user?.role || 'Farmer'}</p>
                <p className="text-gray-500 mt-2">{formData.bio}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center"
              >
                <i className={`fas fa-${isEditing ? 'times' : 'edit'} mr-2`}></i>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 text-center border-2 border-gray-200 hover:shadow-lg transition-all">
                  <i className={`fas ${stat.icon} text-3xl text-${stat.color}-600 mb-2`}></i>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 border-2 border-gray-100">
          <div className="flex overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile Info', icon: 'fa-user' },
              { id: 'security', label: 'Security', icon: 'fa-lock' },
              { id: 'activity', label: 'Activity', icon: 'fa-history' },
              { id: 'settings', label: 'Settings', icon: 'fa-cog' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold transition-all border-b-4 ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`fas ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="fas fa-user-circle text-green-600 mr-3"></i>
                Profile Information
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-user mr-2 text-green-600"></i>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-envelope mr-2 text-green-600"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-phone mr-2 text-green-600"></i>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <i className="fas fa-map-marker-alt mr-2 text-green-600"></i>
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-home mr-2 text-green-600"></i>
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    disabled={!isEditing}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <i className="fas fa-info-circle mr-2 text-green-600"></i>
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 resize-none"
                  />
                </div>
                {isEditing && (
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-bold text-lg"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Changes
                  </button>
                )}
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="fas fa-shield-alt text-green-600 mr-3"></i>
                Security Settings
              </h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Password</h4>
                      <p className="text-gray-600">Last changed 30 days ago</p>
                    </div>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
                    >
                      <i className="fas fa-key mr-2"></i>
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Two-Factor Authentication</h4>
                      <p className="text-gray-600">Add an extra layer of security</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg">
                      <i className="fas fa-mobile-alt mr-2"></i>
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">Active Sessions</h4>
                      <p className="text-gray-600">Manage your active login sessions</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg">
                      <i className="fas fa-desktop mr-2"></i>
                      View Sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="fas fa-clock text-green-600 mr-3"></i>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all border-2 border-gray-200">
                    <div className={`w-12 h-12 bg-${activity.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                      <i className={`fas ${activity.icon} text-${activity.color}-600 text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{activity.text}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <i className="fas fa-sliders-h text-green-600 mr-3"></i>
                Preferences
              </h3>
              <div className="space-y-6">
                {[
                  { label: 'Email Notifications', desc: 'Receive email updates about your orders', icon: 'fa-envelope' },
                  { label: 'SMS Alerts', desc: 'Get SMS notifications for important updates', icon: 'fa-sms' },
                  { label: 'Push Notifications', desc: 'Receive push notifications on your device', icon: 'fa-bell' },
                  { label: 'Marketing Emails', desc: 'Receive promotional offers and news', icon: 'fa-bullhorn' }
                ].map((setting, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border-2 border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <i className={`fas ${setting.icon} text-green-600 text-xl`}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{setting.label}</h4>
                        <p className="text-sm text-gray-600">{setting.desc}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
