import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('tanganika_cookies_accepted');
    if (!hasAccepted) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('tanganika_cookies_accepted', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[200]"
        >
          <div className="bg-atlantic-blue/95 backdrop-blur-md border border-white-pueblo/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
            {/* Decorative background glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-golden-sunset/10 rounded-full blur-2xl group-hover:bg-golden-sunset/20 transition-colors duration-500" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="bg-golden-sunset/20 p-2.5 rounded-xl shrink-0">
                <Cookie className="text-golden-sunset" size={20} />
              </div>
              
              <div className="space-y-3">
                <h4 className="text-white-pueblo font-serif text-lg">Privacidad y Cookies</h4>
                <p className="text-white-pueblo/70 text-xs leading-relaxed">
                  Tanganika utiliza cookies propias y de terceros para mejorar su experiencia, analizar el tráfico y ofrecerle un servicio de alta calidad frente al mar.
                </p>
                
                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    onClick={handleAccept}
                    className="bg-golden-sunset hover:bg-white-pueblo hover:text-atlantic-blue text-white-pueblo text-[10px] uppercase tracking-widest font-bold h-9 px-6 rounded-lg transition-all duration-300"
                  >
                    Aceptar y Continuar
                  </Button>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-white-pueblo/40 hover:text-white-pueblo text-[10px] uppercase tracking-widest font-bold transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
