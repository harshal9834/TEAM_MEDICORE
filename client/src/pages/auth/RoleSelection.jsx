import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (roleType) => {
    navigate('/language-selection', { state: { role: roleType } });
  };

  const roles = [
    {
      type: 'farmer',
      icon: '👨‍🌾',
      title: 'Farmer',
      description: 'Sell your produce directly and get fair prices for your hard work',
      features: ['Direct Market Access', 'Fair Pricing', 'No Middlemen'],
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      type: 'retailer',
      icon: '🏪',
      title: 'Retailer',
      description: 'Source quality products at wholesale prices for your business',
      features: ['Wholesale Prices', 'Bulk Orders', 'Quality Products'],
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-50'
    },
    {
      type: 'consumer',
      icon: '🛒',
      title: 'Consumer',
      description: 'Buy fresh, quality produce directly from local farmers',
      features: ['Fresh Products', 'Best Prices', 'Home Delivery'],
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-emerald-300 flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-5xl">
        {/* Logo */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">🌾GO</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">FaRm</span>
          </h2>
        </div>

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Choose Your Path</h1>
          <p className="text-lg text-green-600 font-medium">Select your role to get started</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {roles.map((role) => (
            <div
              key={role.type}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
            >
              <div className={`bg-gradient-to-br ${role.bgGradient} rounded-3xl shadow-2xl p-8 h-full flex flex-col items-center border-4 border-transparent hover:border-${role.color}-300 transition-all duration-500`}>
                {/* Icon */}
                <div className="text-8xl mb-6 group-hover:scale-125 transition-transform duration-500 animate-bounce">
                  {role.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{role.title}</h3>
                
                {/* Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">{role.description}</p>
                
                {/* Features */}
                <div className="space-y-2 mb-8 w-full">
                  {role.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700 bg-white bg-opacity-50 rounded-lg px-4 py-2">
                      <i className="fas fa-check-circle text-green-600 mr-2"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Button */}
                <button 
                  onClick={() => handleRoleSelect(role.type)}
                  className={`w-full bg-gradient-to-r ${role.gradient} text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 text-lg`}
                >
                  <i className="fas fa-arrow-right mr-2"></i>
                  Start {role.title === 'Farmer' ? 'Selling' : role.title === 'Retailer' ? 'Sourcing' : 'Shopping'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-10">
          <p>Already have an account? <button onClick={() => navigate('/login')} className="text-green-600 font-semibold hover:underline">Login here</button></p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
