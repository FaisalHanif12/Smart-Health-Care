import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  price: number;
  calories: number;
  protein: number;
  image: string;
  category: string;
}

export default function Store() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showMoreItems, setShowMoreItems] = useState(false);
  
  // Initial 12 products
  const initialProducts: Product[] = [
    {
      id: 1,
      name: 'Organic Eggs',
      price: 5.99,
      calories: 70,
      protein: 6,
      image: '🥚',
      category: 'Protein',
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      price: 4.99,
      calories: 120,
      protein: 15,
      image: '🥛',
      category: 'Dairy',
    },
    {
      id: 3,
      name: 'Quinoa',
      price: 7.99,
      calories: 120,
      protein: 4,
      image: '🌾',
      category: 'Grains',
    },
    {
      id: 4,
      name: 'Almonds',
      price: 8.99,
      calories: 160,
      protein: 6,
      image: '🥜',
      category: 'Nuts',
    },
    {
      id: 5,
      name: 'Chicken Breast',
      price: 12.99,
      calories: 165,
      protein: 31,
      image: '🍗',
      category: 'Protein',
    },
    {
      id: 6,
      name: 'Avocado',
      price: 2.99,
      calories: 160,
      protein: 2,
      image: '🥑',
      category: 'Fruits',
    },
    {
      id: 7,
      name: 'Salmon Fillet',
      price: 15.99,
      calories: 208,
      protein: 22,
      image: '🐟',
      category: 'Protein',
    },
    {
      id: 8,
      name: 'Sweet Potato',
      price: 1.99,
      calories: 103,
      protein: 2,
      image: '🍠',
      category: 'Vegetables',
    },
    {
      id: 9,
      name: 'Blueberries',
      price: 6.99,
      calories: 84,
      protein: 1,
      image: '🫐',
      category: 'Fruits',
    },
    {
      id: 10,
      name: 'Spinach',
      price: 3.49,
      calories: 23,
      protein: 3,
      image: '🥬',
      category: 'Vegetables',
    },
    {
      id: 11,
      name: 'Brown Rice',
      price: 4.99,
      calories: 111,
      protein: 3,
      image: '🍚',
      category: 'Grains',
    },
    {
      id: 12,
      name: 'Protein Powder',
      price: 24.99,
      calories: 120,
      protein: 25,
      image: '🥤',
      category: 'Supplements',
    },
  ];

  // Additional 4 products that appear when "Load More" is clicked
  const additionalProducts: Product[] = [
    {
      id: 13,
      name: 'Chia Seeds',
      price: 9.99,
      calories: 137,
      protein: 4,
      image: '🌱',
      category: 'Seeds',
    },
    {
      id: 14,
      name: 'Kale',
      price: 2.99,
      calories: 33,
      protein: 3,
      image: '🥬',
      category: 'Vegetables',
    },
    {
      id: 15,
      name: 'Turkey Breast',
      price: 11.99,
      calories: 135,
      protein: 30,
      image: '🦃',
      category: 'Protein',
    },
    {
      id: 16,
      name: 'Coconut Oil',
      price: 13.99,
      calories: 121,
      protein: 0,
      image: '🥥',
      category: 'Oils',
    },
  ];

  // Combine products based on showMoreItems state
  const [products] = useState<Product[]>(initialProducts);
  const displayedProducts = showMoreItems ? [...products, ...additionalProducts] : products;

  const [cart, setCart] = useState<number[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (productId: number) => {
    const newCart = [...cart, productId];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId: number) => {
    const newCart = cart.filter(id => id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const isInCart = (productId: number) => cart.includes(productId);

  const handleLoadMore = () => {
    setShowMoreItems(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="bg-gray-900 p-4 flex justify-between items-center md:hidden">
        <h1 className="text-xl font-bold text-white">Health Tracker</h1>
        <button className="text-white" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Side Navigation */}
      <nav className={`w-64 bg-gray-900 min-h-screen p-4 flex flex-col ${isMobileMenuOpen ? 'block' : 'hidden'} md:block fixed md:relative z-50`}>
        <div className="flex items-center mb-8">
          <h1 className="text-xl font-bold text-yellow-400">HEALTH TRACKER</h1>
        </div>
        
        {/* Navigation Links Container */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Main Navigation Links */}
          <div className="space-y-2 flex-grow-0">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === '/dashboard' ? 'bg-gray-800 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              to="/dashboard/workout"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === '/dashboard/workout' ? 'bg-gray-800 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-9a9 9 0 100 18 9 9 0 000-18z" clipRule="evenodd" />
              </svg>
              <span>Workout Plan</span>
            </Link>
            <Link
              to="/dashboard/diet"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === '/dashboard/diet' ? 'bg-gray-800 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
              <span>Diet Plan</span>
            </Link>
            <Link
              to="/dashboard/store"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === '/dashboard/store' ? 'bg-gray-800 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Store</span>
            </Link>
            <Link
              to="/dashboard/profile"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === '/dashboard/profile' ? 'bg-gray-800 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>Profile</span>
            </Link>
          </div>
          
          {/* Spacer to push logout to bottom */}
          <div className="flex-1"></div>
          
          {/* Logout Button - Always visible at bottom */}
          <div className="mt-auto py-4 border-t border-gray-800">          
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm3 6V7a1 1 0 012 0v2h2a1 1 0 110 2H8v2a1 1 0 11-2 0v-2H4a1 1 0 110-2h2z" clipRule="evenodd" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto max-h-screen">
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-full">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Health Food Store</h2>
              <div className="relative">
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
                <Link to="/dashboard/cart" className="p-2 text-gray-500 hover:text-gray-700">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
              {displayedProducts.map(product => (
                <div key={product.id} className="bg-gray-50 rounded-lg p-4 flex flex-col">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>{product.calories} calories</p>
                    <p>{product.protein}g protein</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900">${product.price}</span>
                    <button
                      onClick={() =>
                        isInCart(product.id) ? removeFromCart(product.id) : addToCart(product.id)
                      }
                      className={`px-4 py-2 rounded-md text-sm font-medium ${isInCart(product.id)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                    >
                      {isInCart(product.id) ? 'Remove' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {!showMoreItems && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="group relative inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Load More Items
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full text-sm font-bold">
                    4
                  </span>
                </button>
              </div>
            )}

            {/* Show message when all items are loaded */}
            {showMoreItems && (
              <div className="flex justify-center mt-8">
                <div className="inline-flex items-center px-4 py-2 border border-emerald-200 rounded-lg bg-emerald-50 text-emerald-700 shadow-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  All {displayedProducts.length} healthy items loaded!
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}