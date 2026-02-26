import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { SocketProvider } from './context/SocketContext';
import { Toaster } from 'react-hot-toast';
import './i18n'; // Initialize i18n

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RoleSelection from './pages/auth/RoleSelection';
import LanguageSelection from './pages/auth/LanguageSelection';

// Farmer Pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';

import CropManagement from './pages/farmer/CropManagement';
import DiseaseDetection from './pages/DiseaseDetection';
import CropRecommendation from './pages/farmer/CropRecommendation';
import WeatherForecast from './pages/farmer/WeatherForecast';
import WasteManagement from './pages/farmer/WasteManagement';
import ChatBot from './pages/farmer/ChatBot';
import Posts from './pages/common/Posts';
import FutureDemand from './pages/farmer/FutureDemand';
import RetailerContact from './pages/farmer/RetailerContact';
import GovernmentSchemes from './pages/farmer/GovernmentSchemes';

import Negotiation from './pages/farmer/Negotiation';
import AgricultureProducts from './pages/farmer/AgricultureProducts';
import ConsumerListings from './pages/farmer/ConsumerListings';

// Retailer Pages
import RetailerDashboard from './pages/retailer/RetailerDashboard';
import RetailerProducts from './pages/retailer/RetailerProducts';
import RetailerInventory from './pages/retailer/RetailerInventory';
import RetailerOptions from './pages/retailer/RetailerOptions';
import RetailerProductsList from './pages/retailer/RetailerProductsList';
import RetailerWasteProducts from './pages/retailer/RetailerWasteProducts';
import RetailerChatBot from './pages/retailer/ChatBot';
import RetailerConsumerListings from './pages/retailer/RetailerConsumerListings';


// Consumer Pages
import ConsumerDashboard from './pages/consumer/ConsumerDashboard';
import ProductDetails from './pages/consumer/ProductDetails';
import Cart from './pages/consumer/Cart';
import FarmerContact from './pages/consumer/FarmerContact';
import ConsumerChatBot from './pages/consumer/ChatBot';

import ConsumerShop from './pages/consumer/ConsumerShop';
import Wishlist from './pages/consumer/Wishlist';

// Common Pages
import Profile from './pages/common/Profile';
import Chat from './pages/common/Chat';

import Orders from './pages/common/Orders';
import ReportSection from './pages/common/ReportSection';
import MarketPrices from './pages/common/MarketPrices';
import GovtSchemes from './pages/common/GovtSchemes';
import News from './pages/common/News';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <SocketProvider>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: 'red',
                secondary: 'black',
              },
            },
          }}
        />

        {/* Global Page Layout with Grass Background */}
        <div className="flex flex-col min-h-screen relative overflow-x-hidden">

          <div className="flex-grow z-10 pb-32">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                isAuthenticated ? (
                  user?.role === 'farmer' ? <Navigate to="/farmer/dashboard" /> :
                    user?.role === 'retailer' ? <Navigate to="/retailer/options" /> :
                      <Navigate to="/consumer/dashboard" />
                ) : <RoleSelection />
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/language-selection" element={<LanguageSelection />} />

              {/* Farmer Routes */}
              <Route path="/farmer/dashboard" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/farmer/products" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <AgricultureProducts />
                </ProtectedRoute>
              } />
              <Route path="/farmer/crops" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <CropManagement />
                </ProtectedRoute>
              } />
              <Route path="/farmer/disease-detection" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <DiseaseDetection />
                </ProtectedRoute>
              } />
              <Route path="/farmer/crop-recommendation" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <CropRecommendation />
                </ProtectedRoute>
              } />
              <Route path="/farmer/weather" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <WeatherForecast />
                </ProtectedRoute>
              } />
              <Route path="/farmer/waste" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <WasteManagement />
                </ProtectedRoute>
              } />
              <Route path="/farmer/chatbot" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <ChatBot />
                </ProtectedRoute>
              } />
              <Route path="/farmer/community" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <Posts />
                </ProtectedRoute>
              } />
              <Route path="/farmer/future-demand" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FutureDemand />
                </ProtectedRoute>
              } />
              <Route path="/farmer/retailers" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <RetailerContact />
                </ProtectedRoute>
              } />
              <Route path="/farmer/schemes" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <GovernmentSchemes />
                </ProtectedRoute>
              } />
              <Route path="/farmer/add-products" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <ConsumerListings />
                </ProtectedRoute>
              } />
              <Route path="/farmer/negotiation" element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <Negotiation />
                </ProtectedRoute>
              } />

              {/* Retailer Routes */}
              <Route path="/retailer/dashboard" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/retailer/products" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerProducts />
                </ProtectedRoute>
              } />
              <Route path="/retailer/inventory" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerInventory />
                </ProtectedRoute>
              } />
              <Route path="/retailer/options" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerOptions />
                </ProtectedRoute>
              } />
              <Route path="/retailer/products-list" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerProductsList />
                </ProtectedRoute>
              } />
              <Route path="/retailer/waste-products" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerWasteProducts />
                </ProtectedRoute>
              } />
              <Route path="/retailer/farmers" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <FarmerContact />
                </ProtectedRoute>
              } />
              <Route path="/retailer/chatbot" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerChatBot />
                </ProtectedRoute>
              } />
              <Route path="/retailer/community" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <Posts />
                </ProtectedRoute>
              } />
              <Route path="/retailer/consumer-listings" element={
                <ProtectedRoute allowedRoles={['retailer']}>
                  <RetailerConsumerListings />
                </ProtectedRoute>
              } />

              {/* Consumer Routes */}
              <Route path="/consumer/dashboard" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <ConsumerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/product/:id" element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/consumer/farmers" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <FarmerContact />
                </ProtectedRoute>
              } />
              <Route path="/consumer/chatbot" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <ConsumerChatBot />
                </ProtectedRoute>
              } />
              <Route path="/consumer/community" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <Posts />
                </ProtectedRoute>
              } />
              <Route path="/consumer/shop" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <ConsumerShop />
                </ProtectedRoute>
              } />
              <Route path="/consumer/wishlist" element={
                <ProtectedRoute allowedRoles={['consumer']}>
                  <Wishlist />
                </ProtectedRoute>
              } />

              {/* Common Routes */}
              <Route path="/products" element={
                <ProtectedRoute>
                  <ConsumerShop />
                </ProtectedRoute>
              } />
              <Route path="/market" element={
                <ProtectedRoute>
                  <ConsumerShop />
                </ProtectedRoute>
              } />
              <Route path="/posts" element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/report" element={
                <ProtectedRoute>
                  <ReportSection />
                </ProtectedRoute>
              } />
              <Route path="/market-prices" element={
                <ProtectedRoute>
                  <MarketPrices />
                </ProtectedRoute>
              } />
              <Route path="/govt-schemes" element={
                <ProtectedRoute>
                  <GovtSchemes />
                </ProtectedRoute>
              } />
              <Route path="/news" element={
                <ProtectedRoute>
                  <News />
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Global Grass SVG Element */}
          <div className="absolute bottom-0 left-0 w-full h-[120px] z-0 pointer-events-none overflow-hidden">
            <svg className="w-full h-full block" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path fill="#81C784" d="M0,100 C150,80 350,110 500,70 C650,30 850,90 1000,60 L1000,100 L0,100 Z" />
              <path fill="#66BB6A" d="M0,100 C200,90 400,60 600,90 C800,120 900,50 1000,80 L1000,100 L0,100 Z" />
              {/* Animated front layer via inline style tag since it uses keyframes */}
              <style>{`
                @keyframes windWave {
                  0% { transform: translateX(0) scaleY(1); }
                  100% { transform: translateX(-2%) scaleY(1.05); }
                }
                .grass-front {
                  fill: #4CAF50;
                  animation: windWave 10s ease-in-out infinite alternate;
                }
              `}</style>
              <path className="grass-front" d="M0,100 C250,100 450,80 650,100 C850,120 950,90 1000,100 L1000,120 L0,120 Z" />
            </svg>
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}

export default App;
