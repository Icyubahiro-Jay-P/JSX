import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, useAnimation, useInView, useAnimationControls } from 'framer-motion';
import { Sun, Moon, Home, Feather, Fish, Menu, X } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Chicken Lifecycle Loader
const Loader = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const stages = [
    { name: 'egg', label: 'Egg', color: '#FFD54F' },
    { name: 'chick', label: 'Chick', color: '#FFB74D' },
    { name: 'hen', label: 'Hen', color: '#FF9800' },
    { name: 'laying', label: 'Laying Egg', color: '#F57C00' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage(prev => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50 transition-colors duration-500">
      <div className="relative w-48 h-48 mb-8">
        {/* Egg Stage */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: currentStage === 0 ? 1 : 0.8, opacity: currentStage === 0 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-24 h-32 rounded-full bg-gradient-to-b from-yellow-50 to-yellow-200 border-2 border-yellow-300 shadow-lg" />
        </motion.div>
        
        {/* Chick Stage */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: currentStage === 1 ? 1 : 0.8, opacity: currentStage === 1 ? 1 : 0, y: currentStage === 1 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-yellow-300 border-2 border-yellow-400" />
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black" />
            <div className="absolute bottom-4 left-3 w-2 h-4 bg-orange-500 rounded-tl-full rounded-tr-full" />
            <div className="absolute bottom-4 right-3 w-2 h-4 bg-orange-500 rounded-tl-full rounded-tr-full" />
          </div>
        </motion.div>
        
        {/* Hen Stages */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: currentStage === 2 ? 1.2 : 0.8, opacity: currentStage === 2 ? 1 : 0, y: currentStage === 2 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-orange-300 border-2 border-orange-400" />
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-red-500 rounded-t-full" />
            <div className="absolute bottom-4 left-3 w-3 h-6 bg-brown-700 rounded-tl-full rounded-tr-full" />
            <div className="absolute bottom-4 right-3 w-3 h-6 bg-brown-700 rounded-tl-full rounded-tr-full" />
          </div>
        </motion.div>
        
        {/* Laying Egg Stage */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: currentStage === 3 ? 1 : 0.8, opacity: currentStage === 3 ? 1 : 0, y: currentStage === 3 ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-orange-300 border-2 border-orange-400" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-16 rounded-full bg-gradient-to-b from-yellow-50 to-yellow-200 border-2 border-yellow-300" />
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-red-500 rounded-t-full" />
            <div className="absolute bottom-4 left-3 w-3 h-6 bg-brown-700 rounded-tl-full rounded-tr-full" />
            <div className="absolute bottom-4 right-3 w-3 h-6 bg-brown-700 rounded-tl-full rounded-tr-full" />
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold text-orange-500 dark:text-orange-400 mb-4"
      >
        D4 KIENYEJI
      </motion.div>
      
      <div className="flex space-x-2">
        {stages.map((stage, index) => (
          <div 
            key={stage.name}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentStage === index ? 'scale-150' : 'scale-100'
            }`}
            style={{ backgroundColor: currentStage >= index ? stage.color : '#e0e0e0' }}
          />
        ))}
      </div>
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

// Navigation Component
const Navbar = ({ currentPage, setCurrentPage }) => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const controls = useAnimationControls();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        controls.start("scrolled");
      } else {
        controls.start("default");
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);
  
  const navVariants = {
    default: { 
      backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 0.9)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    scrolled: { 
      backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.95)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }
  };
  
  return (
    <motion.nav
      ref={navRef}
      initial="default"
      animate={controls}
      variants={navVariants}
      transition={{ duration: 0.3 }}
      className="fixed w-full z-40 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="flex-shrink-0 flex items-center"
            >
              <Feather className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">D4 KIENYEJI</span>
            </motion.div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('chicken')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'chicken' 
                  ? 'text-orange-500 dark:text-orange-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
              }`}
            >
              <Home size={18} />
              <span>Chicken</span>
            </button>
            
            <button 
              onClick={() => setCurrentPage('catfish')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === 'catfish' 
                  ? 'text-orange-500 dark:text-orange-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400'
              }`}
            >
              <Fish size={18} />
              <span>Catfish</span>
            </button>
            
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => {
                  setCurrentPage('chicken');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'chicken' 
                    ? 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Home size={18} />
                <span>Chicken Catalog</span>
              </button>
              
              <button 
                onClick={() => {
                  setCurrentPage('catfish');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'catfish' 
                    ? 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Fish size={18} />
                <span>Catfish Catalog</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

// Reusable Card Component
const CatalogCard = ({ title, description, price, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1, 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-orange-500 dark:text-orange-400">{price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Order Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Chicken Catalog Page
const ChickenCatalogPage = () => {
  const chickenItems = [
    { 
      id: 1, 
      title: "Kuchi Breed", 
      description: "Premium Kuchi breed chickens known for their hardiness and high egg production.", 
      price: "150,000 TZS" 
    },
    { 
      id: 2, 
      title: "5–8 kg Chicken", 
      description: "Healthy chickens in the 5-8 kg weight range, perfect for family consumption.", 
      price: "15,000 TZS" 
    },
    { 
      id: 3, 
      title: "10 kg+ Chicken", 
      description: "Large mature chickens weighing 10 kg or more, ideal for special occasions.", 
      price: "30,000–40,000 TZS" 
    },
    { 
      id: 4, 
      title: "1–2 Weeks Old", 
      description: "Young chicks aged 1-2 weeks, easy to raise and adapt to new environments.", 
      price: "15,000 TZS" 
    },
    { 
      id: 5, 
      title: "2–4 Weeks Old", 
      description: "Chicks aged 2-4 weeks, developing strong immune systems and growth patterns.", 
      price: "25,000 TZS" 
    },
    { 
      id: 6, 
      title: "Full Grown", 
      description: "Mature chickens ready for immediate use, fully developed and healthy.", 
      price: "40,000 TZS" 
    },
    { 
      id: 7, 
      title: "Incubation Services", 
      description: "Professional incubation services for your eggs with high hatch rates.", 
      price: "50,000 TZS /tray" 
    },
    { 
      id: 8, 
      title: "Egg Sales", 
      description: "Fresh, high-quality eggs from our free-range hens.", 
      price: "50 TZS /egg" 
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4"
        >
          Chicken Catalog
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12"
        >
          Premium poultry products and services for your farming needs. All chickens are raised with care using traditional Kienyeji methods.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chickenItems.map((item, index) => (
            <CatalogCard 
              key={item.id} 
              title={item.title} 
              description={item.description} 
              price={item.price}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Catfish Catalog Page
const CatfishCatalogPage = () => {
  const catfishItems = [
    { 
      id: 1, 
      title: "Juvenile Catfish", 
      description: "Young catfish (2-4 inches) perfect for stocking your ponds.", 
      price: "5,000 TZS" 
    },
    { 
      id: 2, 
      title: "Sub-Adult Catfish", 
      description: "Catfish in the 6-8 inch range, ready for rapid growth.", 
      price: "15,000 TZS" 
    },
    { 
      id: 3, 
      title: "Adult Catfish", 
      description: "Mature catfish (12+ inches) ready for harvest.", 
      price: "35,000 TZS" 
    },
    { 
      id: 4, 
      title: "Catfish Fingerlings", 
      description: "Newly hatched catfish, ideal for commercial aquaculture.", 
      price: "2,000 TZS" 
    },
    { 
      id: 5, 
      title: "Catfish Feed", 
      description: "Nutritionally balanced feed for optimal catfish growth.", 
      price: "25,000 TZS/bag" 
    },
    { 
      id: 6, 
      title: "Pond Setup Service", 
      description: "Professional pond design and setup services.", 
      price: "150,000 TZS" 
    }
  ];
  
  // Water animation effect
  const waterRef = useRef(null);
  
  useEffect(() => {
    const water = waterRef.current;
    let animationFrame;
    
    const animateWater = () => {
      const time = Date.now() * 0.001;
      const amplitude = 5;
      
      for (let i = 0; i < water.children.length; i++) {
        const wave = water.children[i];
        const frequency = 0.05 + i * 0.01;
        const yOffset = Math.sin(time * frequency) * amplitude;
        wave.style.transform = `translateY(${yOffset}px)`;
      }
      
      animationFrame = requestAnimationFrame(animateWater);
    };
    
    animateWater();
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 pt-16 relative overflow-hidden">
      {/* Animated Water Background */}
      <div ref={waterRef} className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent dark:via-blue-400/20"
            style={{ 
              top: `${(i + 1) * 5}%`,
              opacity: 0.3 + Math.random() * 0.3
            }}
          />
        ))}
      </div>
      
      {/* Floating Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: -50,
              x: Math.random() > 0.5 
                ? `+=${Math.random() * 100}` 
                : `-=${Math.random() * 100}`,
              opacity: [0.3, 0.7, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bg-white/20 dark:bg-white/10 rounded-full"
            style={{ 
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
      
      {/* Swimming Fish Animation */}
      <motion.div
        animate={{ 
          x: ["-10%", "110%"],
          y: [0, -50, 0, 50, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed z-10"
        style={{ 
          top: '50%',
          left: '-10%'
        }}
      >
        <div className="relative">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M85 30C85 38.2843 78.2843 45 70 45C61.7157 45 55 38.2843 55 30C55 21.7157 61.7157 15 70 15C78.2843 15 85 21.7157 85 30Z" fill="#FF9800" />
            <path d="M70 45C78.2843 45 85 38.2843 85 30C85 21.7157 78.2843 15 70 15" stroke="black" strokeWidth="1" />
            <path d="M55 30C55 38.2843 48.2843 45 40 45C31.7157 45 25 38.2843 25 30C25 21.7157 31.7157 15 40 15C48.2843 15 55 21.7157 55 30Z" fill="#FFB74D" />
            <path d="M40 45C48.2843 45 55 38.2843 55 30C55 21.7157 48.2843 15 40 15" stroke="black" strokeWidth="1" />
            <path d="M25 30C25 38.2843 18.2843 45 10 45C1.71573 45 -5 38.2843 -5 30C-5 21.7157 1.71573 15 10 15C18.2843 15 25 21.7157 25 30Z" fill="#FFD54F" />
            <path d="M10 45C18.2843 45 25 38.2843 25 30C25 21.7157 18.2843 15 10 15" stroke="black" strokeWidth="1" />
            <circle cx="75" cy="25" r="2" fill="black" />
          </svg>
        </div>
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-4 drop-shadow-md"
        >
          Catfish Catalog
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-blue-100 max-w-3xl mx-auto mb-12 drop-shadow"
        >
          Premium catfish products and aquaculture services. Our fish are raised in clean, natural water systems following sustainable practices.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catfishItems.map((item, index) => (
            <CatalogCard 
              key={item.id} 
              title={item.title} 
              description={item.description} 
              price={item.price}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('chicken');
  
  useEffect(() => {
    // Simulate initial loading time for the loader animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <ThemeProvider>
      <div className={`min-h-screen transition-colors duration-500 ${
        currentPage === 'catfish' 
          ? 'bg-blue-50 dark:bg-blue-900' 
          : 'bg-gray-50 dark:bg-gray-900'
      }`}>
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'chicken' ? <ChickenCatalogPage /> : <CatfishCatalogPage />}
        </motion.div>
      </div>
    </ThemeProvider>
  );
}