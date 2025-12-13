import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const farmManagementItems = [
    { icon: 'fa-carrot', title: t('navigation.products'), desc: t('dashboard.manageItems') || 'Manage your items', link: '/farmer/products', color: 'green' },
    { icon: 'fa-recycle', title: t('navigation.wasteManagement'), desc: t('dashboard.sustainableSolutions') || 'Sustainable solutions', link: '/farmer/waste', color: 'amber' },
    { icon: 'fa-seedling', title: t('dashboard.cropDiseaseDetection') || 'Crop Disease Detection', desc: t('dashboard.aiDetection') || 'AI-powered detection', link: '/farmer/disease-detection', color: 'green' },
    { icon: 'fa-robot', title: t('navigation.chatBot'), desc: t('dashboard.instantHelp') || 'Get instant help', link: '/farmer/chatbot', color: 'amber' },
    { icon: 'fa-history', title: t('orders.orderHistory'), desc: t('dashboard.trackTransactions') || 'Track all transactions', link: '/orders', color: 'blue' },
    { icon: 'fa-file-alt', title: t('dashboard.reportSection') || 'Report Section', desc: t('dashboard.submitReports') || 'Submit reports', link: '/report', color: 'green' },
  ];

  const marketGrowthItems = [
    { icon: 'fa-user-plus', title: t('dashboard.addForConsumer') || 'ADD FOR CONSUMER', desc: t('dashboard.createListings') || 'Create listings', link: '/farmer/add-products', color: 'purple' },
    { icon: 'fa-edit', title: t('navigation.posts'), desc: t('dashboard.shareConnect') || 'Share and connect', link: '/farmer/community', color: 'purple' },
    { icon: 'fa-store', title: t('dashboard.market') || 'Market', desc: t('dashboard.browseMarketplace') || 'Browse marketplace', link: '/products', color: 'green' },
    { icon: 'fa-chart-line', title: t('navigation.futureDemand'), desc: t('dashboard.marketPredictions') || 'Market predictions', link: '/farmer/future-demand', color: 'blue' },
    { icon: 'fa-handshake', title: t('navigation.retailerContact'), desc: t('dashboard.connectBuyers') || 'Connect with buyers', link: '/farmer/retailers', color: 'yellow' },
    { icon: 'fa-newspaper', title: t('dashboard.news') || 'NEWS', desc: t('dashboard.industryUpdates') || 'Industry updates', link: '/news', color: 'gray' },
    { icon: 'fa-university', title: t('navigation.governmentSchemes'), desc: t('dashboard.policyBenefits') || 'Policy benefits', link: '/farmer/schemes', color: 'green' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'border-green-400 bg-green-100 text-green-500',
      amber: 'border-amber-400 bg-amber-100 text-amber-500',
      blue: 'border-blue-400 bg-blue-100 text-blue-500',
      purple: 'border-purple-400 bg-purple-100 text-purple-500',
      yellow: 'border-yellow-400 bg-yellow-100 text-yellow-600',
      gray: 'border-gray-400 bg-gray-100 text-gray-600',
    };
    return colors[color] || colors.green;
  };

  const filteredFarmItems = farmManagementItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMarketItems = marketGrowthItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <i className="fas fa-leaf text-2xl text-yellow-400"></i>
              <h1 className="text-3xl font-bold">
                <span className="text-white">Go</span>
                <span className="text-yellow-400">Farm</span>
              </h1>
            </div>
            
            <div className="relative flex-1 max-w-2xl mx-4">
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <Link to="/profile" className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full">
                <i className="fas fa-user text-white"></i>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Weather Card */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <i className="fas fa-cloud-sun text-3xl text-yellow-500"></i>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Today's Weather</h3>
              <p className="text-gray-600">Sunny, 28°C | Perfect for harvesting</p>
            </div>
          </div>
          <button className="hidden md:block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            View Forecast <i className="fas fa-chevron-right ml-2 text-sm"></i>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Farm Management Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-yellow-400 pl-3">
              {t('dashboard.farmManagement') || 'Farm Management'}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFarmItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`flex flex-col items-center p-4 border-b-4 ${getColorClasses(item.color).split(' ')[0]}`}>
                  <div className={`w-16 h-16 mb-3 rounded-full flex items-center justify-center ${getColorClasses(item.color).split(' ')[1]}`}>
                    <i className={`fas ${item.icon} text-2xl ${getColorClasses(item.color).split(' ')[2]}`}></i>
                  </div>
                  <span className="text-gray-800 font-medium text-center">{item.title}</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">{item.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Market & Growth Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-yellow-400 pl-3">
              {t('dashboard.marketGrowth') || 'Market & Growth'}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMarketItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`flex flex-col items-center p-4 border-b-4 ${getColorClasses(item.color).split(' ')[0]}`}>
                  <div className={`w-16 h-16 mb-3 rounded-full flex items-center justify-center ${getColorClasses(item.color).split(' ')[1]}`}>
                    <i className={`fas ${item.icon} text-2xl ${getColorClasses(item.color).split(' ')[2]}`}></i>
                  </div>
                  <span className="text-gray-800 font-medium text-center">{item.title}</span>
                  <span className="text-xs text-gray-500 mt-1 text-center">{item.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* No Results */}
        {filteredFarmItems.length === 0 && filteredMarketItems.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
              <i className="fas fa-search text-4xl text-gray-400 mb-3"></i>
              <p className="text-gray-500">No results found. Try a different search term.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-3 text-green-600 hover:text-green-700"
              >
                <i className="fas fa-redo mr-1"></i> Reset search
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-200 z-50">
        <div className="flex justify-around py-3 max-w-lg mx-auto">
          <Link 
            to="/farmer/dashboard" 
            className={`flex flex-col items-center transition-all ${
              isActive('/farmer/dashboard') ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/farmer/dashboard') 
                ? 'bg-green-100 scale-110' 
                : 'bg-gray-100 hover:bg-green-50'
            }`}>
              <i className="fas fa-home text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Home</span>
          </Link>
          
          <Link 
            to="/farmer/community" 
            className={`flex flex-col items-center transition-all ${
              isActive('/farmer/community') ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/farmer/community') 
                ? 'bg-green-100 scale-110' 
                : 'bg-gray-100 hover:bg-green-50'
            }`}>
              <i className="fas fa-edit text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Posts</span>
          </Link>
          
          <Link 
            to="/chat" 
            className={`flex flex-col items-center transition-all ${
              isActive('/chat') ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/chat') 
                ? 'bg-green-100 scale-110' 
                : 'bg-gray-100 hover:bg-green-50'
            }`}>
              <i className="fas fa-comments text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Chat</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex flex-col items-center transition-all ${
              isActive('/profile') ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/profile') 
                ? 'bg-green-100 scale-110' 
                : 'bg-gray-100 hover:bg-green-50'
            }`}>
              <i className="fas fa-user text-xl"></i>
            </div>
            <span className="text-xs font-semibold">Account</span>
          </Link>
        </div>
      </nav>

      {/* Floating Action Button */}
      <div className="fixed right-6 bottom-20 z-50">
        <Link
          to="/farmer/products"
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        >
          <i className="fas fa-plus text-xl"></i>
        </Link>
      </div>
    </div>
  );
};

export default FarmerDashboard;
