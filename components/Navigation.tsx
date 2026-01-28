import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'Overview', href: '#hero' },
    { label: 'Features', href: '#anc' },
    { label: 'Technology', href: '#latency' },
    { label: 'Products', href: '#products' },
    { label: 'Ultra X', href: '#waitlist' },
    { label: 'Join Club', href: '#club' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[9999] shadow-2xl"
          >
            <div className="h-full flex flex-col">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-900">Menu</span>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.05 + 0.1,
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      onClick={onClose}
                      className="block text-2xl font-semibold text-gray-900 hover:text-gray-600 transition-colors py-3 border-b border-gray-50 last:border-0"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border-t border-gray-100 space-y-4"
              >
                <a href="#" className="block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                  Support
                </a>
                <a href="#" className="block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                  Find a Store
                </a>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    © 2026 Inferno Audio. All rights reserved.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navigation;
