import { motion } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Footer } from './LandingPage';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  image: string;
  video?: string;
}

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInteractionStart = () => {
    setIsHovered(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing
          })
          .catch(err => {
            console.log("Video play interrupted or blocked:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleInteractionEnd = () => {
    setIsHovered(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div 
      className="group bg-punta-sand rounded-xl overflow-hidden border border-atlantic-blue/5 hover:border-golden-sunset/30 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer h-full flex flex-col"
      whileHover={{ y: -8 }}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onClick={() => {
        if (isPlaying) handleInteractionEnd();
        else handleInteractionStart();
      }}
    >
      <div className="h-56 overflow-hidden relative bg-atlantic-blue/5">
        {/* Static Image - Always present as fallback/base */}
        <img 
          src={item.image} 
          alt={item.name} 
          className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
        />
        
        {/* Video Layer */}
        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onWaiting={() => setIsPlaying(false)}
            onCanPlay={() => {
              if (isHovered && videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
        
        {/* Play Indicator for Video Items */}
        {item.video && !isPlaying && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-500 border border-white/10">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden-sunset opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-golden-sunset"></span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Ver vídeo</span>
          </div>
        )}

        {/* Loading Spinner for Video */}
        {isHovered && item.video && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-golden-sunset/30 border-t-golden-sunset rounded-full animate-spin" />
          </div>
        )}
      </div>
      
      <div className="p-6 space-y-4 flex-grow">
        <div className="flex justify-between items-start">
          <h4 className="text-xl font-serif font-medium group-hover:text-golden-sunset transition-colors duration-300">{item.name}</h4>
          <span className="text-golden-sunset font-mono font-bold text-lg">{item.price}</span>
        </div>
        {item.desc && (
          <p className="text-atlantic-blue/60 text-sm font-light leading-relaxed">{item.desc}</p>
        )}
      </div>
    </motion.div>
  );
};

export const MenuPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'sushi' | 'drinks'>('sushi');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'drinks') {
      setActiveTab('drinks');
    } else if (tab === 'sushi') {
      setActiveTab('sushi');
    }
  }, [location.search]);

  const sushiMenu: { category: string; items: MenuItem[] }[] = [
    {
      category: "Entradas",
      items: [
        { name: "Arrolladitos Primavera", desc: "6 unidades", price: "$450", image: "https://img.freepik.com/free-photo/close-up-delicious-asian-food_23-2150535885.jpg" ,video:"https://www.pexels.com/download/video/10823655/"},
        { name: "Ebi Furai", desc: "Langostinos fritos 6 unidades", price: "$790", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop" ,video:"https://videos.pexels.com/video-files/8964691/8964691-hd_1920_1080_25fps.mp4"},
        { name: "Tiradito de Salmón", desc: "Finos cortes de salmón con sal marina, jugo de lima, salsa de maracuyá, crocante de jengibre y aceite de oliva", price: "$690", image: "https://img.freepik.com/free-photo/carpaccio-salmon-white-plate_74190-682.jpg" },
        { name: "Sashimi", desc: "Cuatro cortes de salmón fresco", price: "$490", image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=800&auto=format&fit=crop" },
        { name: "Nigiris Nikkei", desc: "Cuatro nigiri de salmón flameado con parmesano, salsa de ceviche y chips de papa", price: "$590", image: "https://img.freepik.com/free-photo/sushi-roll_1203-3648.jpg" },
      ]
    },
    {
      category: "Thalassa Ceviche",
      items: [
        { name: "Thalassa Ceviche", desc: "Pesca blanca fresca, jugo cítrico, toques picantes y hierbas mediterráneas. Un bocado de luz, sal y brisa marina.", price: "$850", image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=800&auto=format&fit=crop" },
      ]
    },
    {
      category: "Combinados",
      items: [
        { name: "15 Piezas", desc: "Combinado de 15 piezas Nikkei a elección del sushiman", price: "$1500", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop" },
        { name: "30 Piezas", desc: "Combinado de 30 piezas a elección del sushiman", price: "$2600", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" },
      ]
    },
    {
      category: "Poke",
      items: [
        { name: "Poke Tropi", desc: "Arroz de sushi, salmón fresco, mango, mix de verdes, queso crema, salsa de maracuyá, chips de boniato", price: "$890", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" },
        { name: "Poke Furai", desc: "Arroz de sushi, langostino furai, queso crema, cebolla crispy, repollo, sal de ají amarillo, salsa sriracha y ciboulette", price: "$890", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
        { name: "Poke Mediterráneo", desc: "Arroz de sushi, tomates asados, camarones salteados al curry, salsa alioli", price: "$890", image: "https://img.freepik.com/free-photo/bowl-with-salmon-rice-fresh-vegetables-poke-top-view_127032-2413.jpg" },
      ]
    },
    {
      category: "Ensaladas",
      items: [
        { name: "Tropikós", desc: "Mix de verdes, tomates cherry, vinagreta de salmón fresco, salsa de maracuyá, crocante de jengibre", price: "$750", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
        { name: "Rosinka", desc: "Mix de verdes, habas, pepino, cherry, salsa teriyaki, langostino furai", price: "$750", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop" },
        { name: "La Keelvin", desc: "Mix de verdes, queso azul, almendras, reducción de vino tinto, arándanos y peras salteadas", price: "$850", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=800&auto=format&fit=crop" },
      ]
    },
    {
      category: "Special Rolls",
      items: [
        { name: "Ebi Tropikós", desc: "Langostino hervido, queso crema y rúcula, cubierto de mango, salsa de maracuyá y garrapiñada de jengibre", price: "$690", image: "https://img.freepik.com/free-photo/shrimp-sauteed-garlic-soy-caramel_2829-13850.jpg" },
        { name: "Thalassa Roll", desc: "Salmón fresco, pepino, salsa de ceviche y chips de papa", price: "$690", image: "https://img.freepik.com/premium-photo/plate-food-with-green-vegetable-it_1272888-3258.jpg" },
        { name: "Ebi Piperiés", desc: "Langostino furai, queso crema y pepino, cubierto de palta, salsa de ají amarillo y ciboulette", price: "$690", image: "https://images.unsplash.com/photo-1617196035154-1e7e6e28b0db?q=80&w=800&auto=format&fit=crop" },
        { name: "Veggie Roll", desc: "Queso crema, palta, tomates asados y salsa de ají amarillo", price: "$600", image: "https://img.freepik.com/free-photo/side-view-sushi-set-dark-plate_176474-3231.jpg" },
        { name: "Ebi Criollo", desc: "Langostino furai, queso crema, palta, parmesano flameado y salsa criolla", price: "$690", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop" },
        { name: "Yaqui Tropikós", desc: "Salmón cocido, manzana, queso crema, ralladura de lima, almendras y un toque de canela", price: "$690", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop" },
        { name: "Hot Kymo", desc: "Salmón cocido, queso crema, ciboulette, topping de guacamole y alioli", price: "$750", image: "https://img.freepik.com/free-photo/sushi-rolls-served-with-sauce-sesame-seeds_141793-1276.jpg" },
        { name: "New York Clásico", desc: "Salmón fresco, queso crema, palta y sésamo", price: "$600", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop" },
        { name: "Hot Teri", desc: "Salmón fresco, queso crema, palta y salsa teriyaki", price: "$750", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800&auto=format&fit=crop" },
      ]
    }
  ];

  const drinksMenu: { category: string; items: MenuItem[] }[] = [
    {
      category: "Tragos de Autor",
      items: [
        { 
          name: "La Vita e Bella", 
          desc: "Vino blanco, cordial de pinos y rosas, espuma cítrica, ralladura de lima", 
          price: "$590", 
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
          video: "https://www.pexels.com/download/video/4765778/"
        },
        { name: "Cosmo Malamba", desc: "Cordial de ananá y cedrón, Cointreau, jugo de lima, aire de vino blanco", price: "$590", image: "https://img.freepik.com/free-photo/lemon-drink-garnished-with-dried-lemon-slice-rosemarine-crystal-glass_140725-790.jpg" , video:"https://www.pexels.com/download/video/2345459/"},
        { name: "Espresso Martini Sahara", desc: "Vodka, licor 43, licor de café, espresso y almíbar simple", price: "$590", image: "https://img.freepik.com/free-photo/vertical-shot-iced-cocktail-with-dried-lemons-black-board_181624-57689.jpg" },
        { name: "Caipi Tanganika", desc: "Vodka, almíbar especiado, maracuyá, limón y bitter green", price: "$590", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop" },
        { name: "Green Tonic", desc: "Gin, tónica Bitter Green, garnish de pepino", price: "$590", image: "https://img.freepik.com/free-photo/tasty-caipirinha-cocktail-with-lime_23-2149451555.jpg" },
        { name: "The Ritual", desc: "Aperol, ron añejo, almíbar especiado, jugo de ananá, jugo de limón, jugo de mango, espumante, menta y perfume de cítricos", price: "$650", image: "https://img.freepik.com/premium-photo/mango-iced-tea-with-lime-mint-has-perfect-ratio-juice-tea-mint-sweetened-with-honey-so-fresh-delicious-prepare-this-summer-refreshing-organic-soft-drink_252124-4213.jpg" },
        { name: "Savage Spritz", desc: "Aperol, jugo de limón, jugo de naranja, almíbar simple, bitter green, espuma cítrica, ralladura de naranja", price: "$650", image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=800&auto=format&fit=crop" },
        { name: "Tano Spritz", desc: "Aperol, Cynar, Espumante, aceitunas marinadas en especias y cítricos, aceite CBD", price: "$650", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop" },
      ]
    },
    {
      category: "Mocktails",
      items: [
        { name: "Wild Africa", desc: "Jugo de ananá, limón, maracuyá, naranja, frutos rojos y espuma cítrica", price: "$590", image: "https://storage.googleapis.com/www.tanganika.uy/public/drinks/wild-africa/wild-africa.jpeg", video: "https://storage.googleapis.com/www.tanganika.uy/public/drinks/wild-africa/wild-africa.mp4" },
        { name: "Gibraltar Sunset", desc: "Naranja, almíbar de frambuesas, tónica y limón", price: "$590", image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=800&auto=format&fit=crop" },
        { name: "Hércules Iced Tea", desc: "Limón, almíbar especiado, ananá y té Earl Grey", price: "$590", image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=800&auto=format&fit=crop" },
      ]
    },
    {
      category: "Clásicos",
      items: [
        { name: "Negroni", desc: "", price: "$490", image: "https://img.freepik.com/free-photo/cocktail-glass-with-ice-cubes-garnished-with-dried-lemon-fruit_141793-1983.jpg", video: "https://storage.googleapis.com/www.tanganika.uy/public/drinks/negroni/negroni.mp4" },
        { name: "Aperol Spritz", desc: "", price: "$590", image: "https://img.freepik.com/free-photo/glass-aperol-spritz-cocktail-black-background_123827-21324.jpg", video: "https://storage.googleapis.com/www.tanganika.uy/public/drinks/aperol-spritz/aperol-spritz.mp4" },
        { name: "Caipirinha / Caipiroska", desc: "", price: "$490", image: "https://img.freepik.com/free-photo/delicious-beverage-with-mint-leaves_23-2148751852.jpg", video: "https://storage.googleapis.com/www.tanganika.uy/public/drinks/caipirinha-caipiroska/caipirinha-caipiroska.mp4" },
        { name: "Old Fashioned", desc: "", price: "$490", image: "https://img.freepik.com/free-photo/closeup-glass-old-fashioned-cocktail-with-ice-wooden-table-with-blurry-background_181624-59474.jpg", video: "https://storage.googleapis.com/www.tanganika.uy/public/drinks/old-fashioned/old-fashioned.mp4" },
        { name: "Fernet Cola", desc: "", price: "$490", image: "https://img.freepik.com/free-photo/high-angle-delicious-drink-with-orange_52683-86015.jpg", video:"https://storage.googleapis.com/www.tanganika.uy/public/drinks/fernet-cola/fernet-cola.mp4 "},
        { name: "Campari Orange", desc: "", price: "$490", image: "https://img.freepik.com/free-photo/americano-cocktail-garnished-with-twist-orange_123827-36007.jpg", video:"https://storage.googleapis.com/www.tanganika.uy/public/drinks/campari-orange/campari-orange.mp4" },
        { name: "Jägermeister bull", desc: "", price: "$650", image: "https://img.freepik.com/premium-photo/summer-alcohol-cocktail-sun-light-beam_93675-156343.jpg", video: "https://storage.googleapis.com/www.tanganika.uy/public/drinks/jagermeister-bull/jagermeister-bull.mp4" },
        { name: "Cerveza Corona 330ml", desc: "", price: "$390", image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=800&auto=format&fit=crop" , video:"https://videos.pexels.com/video-files/8030483/8030483-hd_1920_1080_30fps.mp4"},
      ]
    },
    {
      category: "Sin Alcohol",
      items: [
        { name: "Agua con o sin gas", desc: "", price: "$180", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800&auto=format&fit=crop" , video:"https://videos.pexels.com/video-files/4622861/4622861-uhd_1440_2560_30fps.mp4"},
        { name: "Refrescos línea Coca-Cola", desc: "", price: "$230", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop" , video:"https://videos.pexels.com/video-files/33356765/14203633_2560_1440_50fps.mp4"},
        { name: "Maracuyada / Pomelada / Limonada", desc: "", price: "$290", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop" , video:"https://storage.googleapis.com/www.tanganika.uy/public/drinks/maracuyada-pomelada-limonada/maracuyada-pomelada-limonada.mp4" },
        { name: "Jugo de naranja", desc: "", price: "$260", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop" , video:"https://videos.pexels.com/video-files/7458246/7458246-hd_1920_1080_25fps.mp4"},
      ]
    },

    {
      category: "Clericó",
      items: [
        { name: "Linea Básica", desc: "", price: "$1500", image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop" },
        { name: "Linea Premium", desc: "", price: "$1890", image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop" },
        { name: "Linea Extra Premium", desc: "", price: "$2300", image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop" },
      ]
    },
    {
      category: "Vinos por Copa",
      items: [
        { name: "Rosé Blend Viña Eden", desc: "", price: "$400", image: "https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?q=80&w=800&auto=format&fit=crop" },
        { name: "Viña Edén Chardonnay Kosher", desc: "", price: "$400", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop" },
        { name: "Pueblo Edén Tannat Kosher", desc: "", price: "$400", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop" },
        { name: "Albariño de Bouza", desc: "", price: "$400", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop" },
      ]
    }
  ];

  return (
    <div className="bg-white-pueblo min-h-screen text-atlantic-blue selection:bg-golden-sunset selection:text-white-pueblo relative overflow-hidden">
      {/* Sea-themed background elements - Optimized for performance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base Sea Texture - Static for performance */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.12] mix-blend-multiply" />
        
        {/* Soft Blue Gradient Overlay - Static */}
        <div className="absolute inset-0 bg-gradient-to-b from-uruguayan-sky/15 via-white-pueblo/95 to-white-pueblo" />
        
        {/* Animated Light Shimmer - Simplified and GPU accelerated */}
        <motion.div 
          animate={{ 
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.2)_0%,transparent_70%)] mix-blend-overlay will-change-[opacity]"
        />

        {/* Subtle Wave Effect - Single layer, slow, GPU accelerated */}
        <motion.div 
          animate={{ 
            x: [-10, 10, -10],
            y: [-5, 5, -5],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay will-change-transform"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-golden-sunset text-xs tracking-[0.3em] uppercase font-bold block mb-4">Nuestra Carta</span>
            <h1 className="text-4xl md:text-7xl font-serif mb-8">Menú Visual</h1>
            
            <div className="flex justify-center gap-4 md:gap-8 border-b border-atlantic-blue/10 pb-4 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('sushi')}
                className={`text-base md:text-lg font-serif tracking-widest uppercase transition-colors pb-4 border-b-2 whitespace-nowrap ${
                  activeTab === 'sushi' ? 'text-golden-sunset border-golden-sunset' : 'text-atlantic-blue/40 border-transparent hover:text-uruguayan-sky'
                }`}
              >
                Sushi Bar
              </button>
              <button 
                onClick={() => setActiveTab('drinks')}
                className={`text-base md:text-lg font-serif tracking-widest uppercase transition-colors pb-4 border-b-2 whitespace-nowrap ${
                  activeTab === 'drinks' ? 'text-golden-sunset border-golden-sunset' : 'text-atlantic-blue/40 border-transparent hover:text-uruguayan-sky'
                }`}
              >
                Drinks
              </button>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] uppercase tracking-[0.2em] text-atlantic-blue/40 mt-4 font-bold"
            >
              Toca en los ítems para ver el video
            </motion.p>
          </motion.div>

          <div className="space-y-20">
            {(activeTab === 'sushi' ? sushiMenu : drinksMenu).map((section, idx) => (
              <motion.div 
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-8"
              >
                <h3 className="text-3xl font-serif text-golden-sunset border-l-2 border-golden-sunset pl-4">{section.category}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item, i) => (
                    <MenuCard key={i} item={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};
