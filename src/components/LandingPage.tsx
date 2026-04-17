import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, animate } from 'motion/react';
import { Menu, X, Instagram, Facebook, MapPin, Phone, Mail, Wine, Fish, Utensils, ArrowRight, MessageCircle } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      if (location.pathname === '/') {
        const sections = ['sushi', 'cocktails', 'experiencia', 'ubicacion'];
        let current = '';

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is in viewport (considering navbar height)
            if (rect.top <= 150 && rect.bottom >= 150) {
              current = section;
              break;
            }
          }
        }
        setActiveSection(current);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount/location change to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = [
    { name: 'Sushi Bar', path: '/#sushi', id: 'sushi' },
    { name: 'Cocktails', path: '/#cocktails', id: 'cocktails' },
    { name: 'Experiencia', path: '/#experiencia', id: 'experiencia' },
    { name: 'Ubicación', path: '/#ubicacion', id: 'ubicacion' },
  ];

  const isLandingPage = location.pathname === '/';
  const showWhiteLogo = isScrolled || isMobileMenuOpen;
  const useDarkText = isMenuPage && !isScrolled && !isMobileMenuOpen;
  const isLogoVisible = isMenuPage || isScrolled || isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        isMobileMenuOpen ? 'z-[120]' : 'z-[100]'
      } ${
        isMobileMenuOpen 
          ? 'bg-atlantic-blue py-3 border-b border-white/10' 
          : isScrolled 
            ? 'bg-atlantic-blue/90 backdrop-blur-md py-3 shadow-lg border-b border-white/10' 
            : isMenuPage 
              ? 'bg-transparent py-6'
              : 'bg-gradient-to-b from-black/70 to-transparent py-6'
      }`}
    >
      <div className="w-full px-4 md:px-8 flex justify-between items-center">
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`transition-opacity duration-500 hover:opacity-80 ${
            isLogoVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <AnimatePresence mode="wait">
            {showWhiteLogo ? (
              <motion.img 
                key="white-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src="https://storage.googleapis.com/www.tanganika.uy/public/bg-rm-white.png" 
                alt="Tanganika" 
                className="h-8 md:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,1)]"
              />
            ) : (
              <motion.img 
                key="black-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src="https://storage.googleapis.com/www.tanganika.uy/public/bg-rm-blue.png" 
                alt="Tanganika" 
                className="h-8 md:h-12 w-auto object-contain"
              />
            )}
          </AnimatePresence>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-xs lg:text-sm tracking-widest uppercase font-medium transition-colors ${
                activeSection === item.id 
                  ? 'text-golden-sunset' 
                  : useDarkText 
                    ? 'text-atlantic-blue hover:text-golden-sunset' 
                    : 'text-white/80 hover:text-uruguayan-sky drop-shadow-sm'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 lg:gap-6">
            <Link 
              to="/menu"
              className={`px-4 lg:px-6 py-2 rounded-sm text-xs lg:text-xs font-medium uppercase tracking-widest transition-all duration-300 border hover:bg-white hover:text-black ${
                isMenuPage 
                  ? useDarkText 
                    ? 'bg-transparent text-atlantic-blue border-atlantic-blue hover:bg-atlantic-blue hover:text-white' 
                    : 'bg-white text-black border-white' 
                  : 'text-white border-white/30 hover:border-white'
              }`}
            >
              Ver Menú
            </Link>
            <Link 
              to="/reservation"
              className="bg-golden-sunset hover:bg-white hover:text-black text-white px-4 lg:px-6 py-2 rounded-sm text-xs lg:text-xs font-medium uppercase tracking-widest transition-all duration-300 shadow-lg shadow-golden-sunset/20 hover:shadow-xl hover:scale-105"
            >
              Reservar
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${useDarkText ? 'text-atlantic-blue' : 'text-white-pueblo'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-atlantic-blue border-t border-white-pueblo/10 p-6 flex flex-col space-y-4 shadow-xl"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-xl font-serif transition-colors ${
                activeSection === item.id ? 'text-golden-sunset' : 'text-white/90 hover:text-uruguayan-sky'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/menu"
            className={`text-xl font-serif transition-colors ${
              isMenuPage ? 'text-golden-sunset' : 'text-white-pueblo/90 hover:text-uruguayan-sky'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ver Menú
          </Link>
          <Link to="/reservation" className="bg-golden-sunset text-white-pueblo px-6 py-3 rounded-sm text-center mt-8 font-bold uppercase block text-xl" onClick={() => setIsMobileMenuOpen(false)}>
            Reservar Mesa
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export const Hero = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effect for the content
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-white-pueblo">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-100"
        >
          <source src="https://storage.googleapis.com/www.tanganika.uy/public/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Darker overlay for premium restaurant vibe and logo visibility */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Ornamental Frame - Light for contrast */}
        <div className="absolute inset-4 md:inset-8 border border-white/20 pointer-events-none z-20" />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto pb-16 md:pb-0"
      >
        <motion.img 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          src="https://storage.googleapis.com/www.tanganika.uy/public/tanganika_white.png" 
          alt="Tanganika" 
          className="h-48 sm:h-64 md:h-80 lg:h-96 w-auto max-w-[90vw] object-contain mb-8 md:mb-12 relative z-30 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-3 md:gap-6 w-full md:w-auto items-center px-4 md:px-0"
        >
          <Link 
            to="/reservation" 
            className="group relative px-6 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 w-full md:w-64 overflow-hidden rounded-sm bg-golden-sunset text-white transition-all duration-500 hover:bg-white hover:text-atlantic-blue shadow-lg shadow-golden-sunset/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10 flex items-center justify-center gap-3 font-serif italic text-base md:text-base lg:text-lg">
              Reservar Mesa <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
          
          <Link 
            to="/menu" 
            className="group relative px-6 py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 w-full md:w-64 overflow-hidden rounded-sm border border-white text-white transition-all duration-500 hover:bg-white hover:text-atlantic-blue backdrop-blur-sm"
          >
            <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-[10px] md:text-[10px] lg:text-xs">
              Explorar Menú
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/70">Descubrir</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
};

export const SushiShowcase = () => {
  return (
    <section id="sushi" className="py-24 bg-white-pueblo relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-golden-sunset text-xs tracking-[0.2em] uppercase font-bold mb-2 block">Nuestra Esencia</span>
            <h2 className="text-4xl md:text-5xl font-serif text-atlantic-blue">Arte en cada corte</h2>
          </div>
          <p className="text-atlantic-blue/50 max-w-md mt-6 md:mt-0 text-sm leading-relaxed">
            Pescado fresco seleccionado diariamente. Técnicas tradicionales japonesas combinadas con la audacia de la cocina moderna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Yaqui Tropikós",
              desc: "Salmón cocido, manzana. queso crema, ralladura de lima, almendras y un toque  de canela",
              img: "https://i.imgur.com/pcRynzz.png"
            },
            {
              title: "Ceviche",
              desc: "Ceviche fresco con notas cítricas y marinas",
              img: "https://img.freepik.com/free-photo/view-delicious-shrimp-dish_23-2150777643.jpg"
            },
            {
              title: "Hot Kymo",
              desc: "Salmón cocido, queso crema, ciboulette, topping de guacamole y alioli",
              img: "https://img.freepik.com/free-photo/sushi-rolls-served-with-wasabi-soy-sause_141793-986.jpg"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative h-[500px] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-punta-sand">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-atlantic-blue via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="w-12 h-[1px] bg-golden-sunset mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                <h3 className="text-3xl font-serif text-white-pueblo mb-2">{item.title}</h3>
                <p className="text-white-pueblo/60 text-sm uppercase tracking-wider">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CulinaryArt = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center bg-white-pueblo">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="https://www.pexels.com/download/video/8908214/" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-white-pueblo via-transparent to-white-pueblo/50" />
      
      <div className="relative z-10 text-center px-4 md:px-8 py-8 md:py-12 max-w-4xl mx-auto md:bg-white-pueblo/40 md:backdrop-blur-md md:rounded-3xl md:border md:border-white-pueblo/30 md:shadow-2xl">
        <span className="text-golden-sunset text-xs md:text-base tracking-[0.3em] uppercase font-bold mb-4 inline-block md:block bg-white-pueblo/90 md:bg-transparent px-3 py-1 md:p-0 rounded-sm md:rounded-none">Maestría</span>
        <h2 className="text-5xl md:text-7xl font-serif text-atlantic-blue mb-6">El Arte del Sashimi</h2>
        <p className="text-atlantic-blue/90 text-lg font-light max-w-2xl mx-auto leading-relaxed">
          Precisión milimétrica. Respeto por el producto. Una danza de cuchillos que transforma la materia prima en una obra de arte.
        </p>
      </div>
    </section>
  );
};

export const BarSection = () => {
  const [activeId, setActiveId] = useState(0);

  const categories = [
    {
      id: 0,
      title: "Tragos de Autor",
      subtitle: "Nuestra Firma",
      desc: "Historias líquidas. Fusiones botánicas, espumas cítricas y cordiales caseros diseñados para despertar los sentidos.",
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1740&auto=format&fit=crop",
      highlight: "La Vita e Bella"
    },
    {
      id: 1,
      title: "Mocktails",
      subtitle: "Sin Alcohol",
      desc: "Sabor sin restricciones. Mezclas complejas y refrescantes para quienes buscan la experiencia completa, sin alcohol.",
      img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1857&auto=format&fit=crop",
      highlight: "Wild Africa"
    }
  ];

  return (
    <section id="cocktails" className="relative min-h-screen lg:h-screen w-full bg-atlantic-blue overflow-hidden flex items-center py-20 lg:py-0">
      
      {/* Immersive Background Transition */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={categories[activeId].img} 
            alt={categories[activeId].title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-atlantic-blue via-atlantic-blue/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-atlantic-blue via-transparent to-atlantic-blue/40" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        
        {/* Left: Navigation List */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-4 text-golden-sunset mb-8">
            <Wine size={24} />
            <span className="text-sm tracking-[0.3em] uppercase font-bold">The Bar</span>
          </div>

          <div className="flex flex-col gap-2">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="group flex items-center gap-6 text-left py-4 focus:outline-none"
              >
                <span className={`font-mono text-sm transition-colors duration-300 ${
                  activeId === cat.id ? 'text-golden-sunset' : 'text-white-pueblo/30 group-hover:text-white-pueblo/60'
                }`}>
                  0{idx + 1}
                </span>
                <span className={`text-3xl md:text-5xl font-serif transition-all duration-500 ${
                  activeId === cat.id 
                    ? 'text-white-pueblo translate-x-4' 
                    : 'text-white-pueblo/30 group-hover:text-white-pueblo/60'
                }`}>
                  {cat.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right: Active Details */}
        <div className="lg:col-span-7 relative min-h-[400px] lg:h-auto flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="space-y-8"
            >
              <div className="inline-block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="block text-golden-sunset text-sm tracking-[0.3em] uppercase font-bold"
                >
                  {categories[activeId].subtitle}
                </motion.span>
              </div>
              
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white-pueblo leading-tight">
                {categories[activeId].title}
              </h3>
              
              <p className="text-white-pueblo/80 text-xl font-light leading-relaxed max-w-xl">
                {categories[activeId].desc}
              </p>

              <div className="pt-8 border-t border-white-pueblo/10 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-white-pueblo/40 text-xs uppercase tracking-wider mb-1">Recomendado</span>
                  <span className="text-golden-sunset font-serif text-xl">{categories[activeId].highlight}</span>
                </div>
                <div className="h-10 w-[1px] bg-white-pueblo/10" />
                <Link 
                  to="/menu?tab=drinks"
                  className="px-6 py-2 border border-white-pueblo/20 rounded-full text-white-pueblo text-sm hover:bg-white-pueblo hover:text-atlantic-blue transition-colors uppercase tracking-widest"
                >
                  Ver Menú
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white-pueblo/10 w-full">
        <motion.div 
          className="h-full bg-golden-sunset"
          initial={{ width: "0%" }}
          animate={{ width: `${((activeId + 1) / categories.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </section>
  );
};

export const Atmosphere = () => {
  return (
    <section id="experiencia" className="py-24 bg-white-pueblo text-center">
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <span className="text-golden-sunset text-xs tracking-[0.2em] uppercase font-bold mb-4 block">El Ambiente</span>
        <h2 className="text-4xl md:text-5xl font-serif text-atlantic-blue mb-6">Día y Noche en Tanganika</h2>
        <p className="text-atlantic-blue/60">
          La magia comienza al mediodía. Disfruta de almuerzos frescos con vista al mar que, al caer el sol, dan paso a una atmósfera nocturna vibrante de luces tenues y música curada.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] md:h-[600px]">
        <div className="relative group overflow-hidden">
          <img 
            src="https://storage.googleapis.com/www.tanganika.uy/public/afternoon.jpg" 
            alt="Bar Afternoon" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-atlantic-blue/40 group-hover:bg-atlantic-blue/20 transition-colors" />
        </div>
        <div className="relative group overflow-hidden">
          <img 
            src="https://storage.googleapis.com/www.tanganika.uy/public/night.jpg" 
            alt="Restaurant Vibe" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-atlantic-blue/40 group-hover:bg-atlantic-blue/20 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export const Location = () => {
  return (
    <section id="ubicacion" className="py-32 bg-punta-sand relative overflow-hidden">
      {/* Sand Texture Background */}
      <div 
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("https://img.freepik.com/fotos-gratis/areia-amarela-natural-no-fundo-da-praia_53876-146905.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} 
      />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-golden-sunset/5 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-atlantic-blue/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <div className="flex items-center gap-4 text-golden-sunset mb-4">
                <MapPin size={24} />
                <span className="text-sm tracking-[0.3em] uppercase font-bold">Ubicación</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-atlantic-blue leading-tight">
                Encuentra tu <br />
                <span className="text-golden-sunset italic">Refugio</span>
              </h2>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  icon: <MapPin className="text-golden-sunset" size={24} />,
                  title: "Dirección",
                  content: ["Mar Mediterraneo", "20000 Maldonado, Uruguay"]
                },
                {
                  icon: <Utensils className="text-golden-sunset" size={24} />,
                  title: "Horario",
                  content: ["Lunes a Domingo", "12:00 - 00:00"]
                },
                {
                  icon: <Phone className="text-golden-sunset" size={24} />,
                  title: "Contacto",
                  content: [
                    "+598 94 488 580", 
                    "reservas@tanganika.uy",
                    <a href="https://www.instagram.com/tanganikauy/" target="_blank" rel="noopener noreferrer" className="hover:text-golden-sunset transition-colors inline-flex items-center gap-2 mt-1">
                      <Instagram size={16} /> @tanganikauy
                    </a>,
                    <a href="https://wa.me/59894488580" target="_blank" rel="noopener noreferrer" className="hover:text-golden-sunset transition-colors inline-flex items-center gap-2 mt-1">
                      <MessageCircle size={16} /> WhatsApp
                    </a>
                  ]
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex items-start gap-6 group cursor-default"
                >
                  <div className="p-3 rounded-full bg-atlantic-blue/5 border border-atlantic-blue/10 group-hover:border-golden-sunset/50 group-hover:bg-golden-sunset/10 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-atlantic-blue font-serif text-xl mb-2 group-hover:text-golden-sunset transition-colors">{item.title}</h4>
                    {item.content.map((line, i) => (
                      <p key={i} className="text-atlantic-blue/60 font-light leading-relaxed">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link 
              to="/reservation"
              className="mt-10 px-10 py-4 bg-golden-sunset text-white-pueblo font-bold uppercase tracking-widest text-xs hover:bg-atlantic-blue transition-colors duration-300 inline-block"
            >
              Reservar Mesa
            </Link>
          </motion.div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[600px] w-full rounded-2xl overflow-hidden border border-atlantic-blue/10 group"
          >
            <div className="absolute inset-0 bg-punta-sand animate-pulse" /> {/* Loading placeholder */}
            <iframe 
              src="https://maps.google.com/maps?q=Mar%20Mediterraneo%2C%2020000%20Maldonado%2C%20Departamento%20de%20Maldonado%2C%20Uruguay&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-10 w-full h-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              title="Ubicación Tanganika Sushi Bar"
            ></iframe>
            
            {/* Overlay Gradient for better integration */}
            <div className="absolute inset-0 pointer-events-none border-[1px] border-atlantic-blue/10 rounded-2xl z-20" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-atlantic-blue text-white-pueblo pt-24 pb-12 border-t border-white-pueblo/5 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-golden-sunset/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block">
              <img 
                src="https://storage.googleapis.com/www.tanganika.uy/public/tanganika_white.png" 
                alt="Tanganika" 
                className="h-36 w-auto object-contain hover:opacity-80 transition-opacity duration-300"
              />
            </Link>
            <p className="text-white-pueblo/60 text-sm font-light leading-relaxed max-w-xs">
              Donde la tradición japonesa se encuentra con la costa uruguaya. Una experiencia sensorial única en Punta Ballena.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-6">
            <h4 className="text-golden-sunset text-xs tracking-[0.2em] uppercase font-bold">Explorar</h4>
            <ul className="space-y-4">
              {[
                { name: 'Inicio', path: '/' },
                { name: 'Menú', path: '/menu' },
                { name: 'Reservas', path: '/reservation' },
                { name: 'Ubicación', path: '/#ubicacion' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white-pueblo/60 hover:text-white-pueblo text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-golden-sunset transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-golden-sunset text-xs tracking-[0.2em] uppercase font-bold">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white-pueblo/60 group">
                <MapPin size={18} className="mt-1 group-hover:text-golden-sunset transition-colors" />
                <span className="text-sm font-light leading-relaxed">
                  Mar Mediterraneo, 20000<br />Maldonado, Uruguay
                </span>
              </div>
              <a href="tel:+59894488580" className="flex items-center gap-3 text-white-pueblo/60 hover:text-white-pueblo transition-colors group">
                <Phone size={18} className="group-hover:text-golden-sunset transition-colors" />
                <span className="text-sm font-light">+598 94 488 580</span>
              </a>
              <a href="mailto:reservas@tanganika.uy" className="flex items-center gap-3 text-white-pueblo/60 hover:text-white-pueblo transition-colors group">
                <Mail size={18} className="group-hover:text-golden-sunset transition-colors" />
                <span className="text-sm font-light">reservas@tanganika.uy</span>
              </a>
            </div>
          </div>

          {/* Social & Hours Column */}
          <div className="space-y-6">
            <h4 className="text-golden-sunset text-xs tracking-[0.2em] uppercase font-bold">Horario y Social</h4>
            <div className="space-y-4">
              <p className="text-white-pueblo/60 text-sm font-light">
                <span className="block text-white-pueblo mb-1">Lunes a Domingo</span>
                12:00 - 00:00
              </p>
              <div className="pt-4 flex flex-col gap-3 items-start">
                <a 
                  href="https://www.instagram.com/tanganikauy/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white-pueblo/10 rounded-full text-xs uppercase tracking-widest hover:bg-white-pueblo hover:text-atlantic-blue transition-all duration-300 group w-full justify-center md:w-auto md:justify-start"
                >
                  <Instagram size={16} />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://wa.me/59894488580" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white-pueblo/10 rounded-full text-xs uppercase tracking-widest hover:bg-white-pueblo hover:text-atlantic-blue transition-all duration-300 group w-full justify-center md:w-auto md:justify-start"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white-pueblo/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white-pueblo/30 text-xs font-light tracking-wide">
            &copy; {new Date().getFullYear()} Tanganika Sushi Bar. Todos los derechos reservados.
          </p>
          
          <a 
            href="https://www.japantech.com.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-2 text-white-pueblo/30 hover:text-white-pueblo/60 transition-colors text-xs tracking-wide"
          >
            <span>Desarrollado por</span>
            <span className="text-golden-sunset group-hover:text-golden-sunset/80">Japantech 伊藤</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
