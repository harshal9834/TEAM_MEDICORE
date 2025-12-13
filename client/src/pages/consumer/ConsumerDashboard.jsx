import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const ConsumerDashboard = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const shoppingItems = [
    { icon: 'fa-shopping-bag', title: t('consumerDashboard.gofarmShop'), desc: t('consumerDashboard.allAgriProducts'), link: '/consumer/shop', color: 'green' },
    { icon: 'fa-heart', title: t('consumerDashboard.myWishlist'), desc: t('consumerDashboard.savedItems'), link: '/consumer/wishlist', color: 'red' },
    { icon: 'fa-store', title: t('consumerDashboard.browseProducts'), desc: t('consumerDashboard.shopFreshProduce'), link: '/products', color: 'blue' },
    { icon: 'fa-shopping-cart', title: t('consumerDashboard.myCart'), desc: t('consumerDashboard.viewCartItems'), link: '/cart', color: 'green' },
    { icon: 'fa-box', title: t('consumerDashboard.myOrders'), desc: t('consumerDashboard.trackDeliveries'), link: '/orders', color: 'purple' },
    { icon: 'fa-tractor', title: t('consumerDashboard.contactFarmers'), desc: t('consumerDashboard.directConnection'), link: '/consumer/farmers', color: 'green' },
    { icon: 'fa-robot', title: t('consumerDashboard.aiAssistant'), desc: t('consumerDashboard.getInstantHelp'), link: '/consumer/chatbot', color: 'indigo' },
    { icon: 'fa-comments', title: t('consumerDashboard.posts'), desc: t('consumerDashboard.shareConnect'), link: '/posts', color: 'purple' },
    { icon: 'fa-comment-dots', title: t('consumerDashboard.chat'), desc: t('consumerDashboard.messageOthers'), link: '/chat', color: 'blue' },
  ];

  // Removed community items as requested

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-blue-400 bg-blue-100 text-blue-500',
      green: 'border-green-400 bg-green-100 text-green-500',
      purple: 'border-purple-400 bg-purple-100 text-purple-500',
      indigo: 'border-indigo-400 bg-indigo-100 text-indigo-500',
      gray: 'border-gray-400 bg-gray-100 text-gray-600',
      red: 'border-red-400 bg-red-100 text-red-500',
    };
    return colors[color] || colors.blue;
  };

  const filteredShoppingItems = shoppingItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <i className="fas fa-shopping-bag text-2xl text-blue-200"></i>
              <h1 className="text-3xl font-bold">
                <span className="text-white">{t('consumerDashboard.farm')}</span>
                <span className="text-blue-200">{t('consumerDashboard.shop')}</span>
              </h1>
            </div>
            
            <div className="relative flex-1 max-w-2xl mx-4">
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                placeholder={t('consumerDashboard.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <Link to="/profile" className="bg-blue-200 hover:bg-blue-300 p-2 rounded-full transition">
              <i className="fas fa-user text-blue-700"></i>
            </Link>
          </div>
        </div>
      </header>

      {/* Promotional Banner */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 flex items-center justify-between mb-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
              <i className="fas fa-gift text-3xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg">{t('consumerDashboard.specialOffer')}</h3>
              <p className="text-blue-100">{t('consumerDashboard.offerDescription')}</p>
            </div>
          </div>
          <button className="hidden md:block bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 font-semibold transition">
            {t('consumerDashboard.shopNow')} <i className="fas fa-chevron-right ml-2 text-sm"></i>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Shopping Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-400 pl-3">
              {t('consumerDashboard.shoppingServices')}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredShoppingItems.map((item, index) => (
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
        {filteredShoppingItems.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
              <i className="fas fa-search text-4xl text-gray-400 mb-3"></i>
              <p className="text-gray-500">{t('consumerDashboard.noResults')}</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-3 text-blue-600 hover:text-blue-700"
              >
                <i className="fas fa-redo mr-1"></i> {t('consumerDashboard.resetSearch')}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-gray-200 z-50">
        <div className="flex justify-around py-3 max-w-lg mx-auto">
          <Link 
            to="/consumer/dashboard" 
            className={`flex flex-col items-center transition-all ${
              isActive('/consumer/dashboard') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/consumer/dashboard') 
                ? 'bg-blue-100 scale-110' 
                : 'bg-gray-100 hover:bg-blue-50'
            }`}>
              <i className="fas fa-home text-xl"></i>
            </div>
            <span className="text-xs font-semibold">{t('consumerDashboard.home')}</span>
          </Link>
          
          <Link 
            to="/posts" 
            className={`flex flex-col items-center transition-all ${
              isActive('/posts') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/posts') 
                ? 'bg-blue-100 scale-110' 
                : 'bg-gray-100 hover:bg-blue-50'
            }`}>
              <i className="fas fa-comments text-xl"></i>
            </div>
            <span className="text-xs font-semibold">{t('consumerDashboard.posts')}</span>
          </Link>
          
          <Link 
            to="/chat" 
            className={`flex flex-col items-center transition-all ${
              isActive('/chat') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/chat') 
                ? 'bg-blue-100 scale-110' 
                : 'bg-gray-100 hover:bg-blue-50'
            }`}>
              <i className="fas fa-comments text-xl"></i>
            </div>
            <span className="text-xs font-semibold">{t('consumerDashboard.chat')}</span>
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex flex-col items-center transition-all ${
              isActive('/profile') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-1 transition-all ${
              isActive('/profile') 
                ? 'bg-blue-100 scale-110' 
                : 'bg-gray-100 hover:bg-blue-50'
            }`}>
              <i className="fas fa-user text-xl"></i>
            </div>
            <span className="text-xs font-semibold">{t('consumerDashboard.account')}</span>
          </Link>
        </div>
      </nav>

      {/* Floating Action Button */}
      <div className="fixed right-6 bottom-20 z-50">
        <Link
          to="/cart"
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        >
          <i className="fas fa-shopping-cart text-xl"></i>
        </Link>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
