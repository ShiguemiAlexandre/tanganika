import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Users, User, Phone, ArrowLeft, Send, ShieldCheck, DollarSign, Timer, ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ReservationPage = () => {
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    time: '',
    guests: '2',
    name: '',
    phone: '',
    selectedTable: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [minDate, setMinDate] = useState<Date>(new Date());
  const [maxDate, setMaxDate] = useState<Date>(new Date());

  useEffect(() => {
    const today = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(today.getMonth() + 2);

    setMinDate(today);
    setMaxDate(twoMonthsLater);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = 'Seleccione una fecha';
    if (!formData.time) newErrors.time = 'Seleccione una hora';
    if (!formData.guests) newErrors.guests = 'Indique cantidad de personas';
    if (!formData.name.trim()) newErrors.name = 'Ingrese su nombre completo';
    if (!formData.phone.trim()) newErrors.phone = 'Ingrese su teléfono de contacto';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    
    const { date, time, guests, name, phone, selectedTable } = formData;
    if (!date) return; // Should be caught by validateForm
    
    const guestCount = parseInt(guests);
    
    // Format date to DD/MM/YYYY
    const formattedDate = format(date, 'dd/MM/yyyy');
    
    const tableInfo = selectedTable ? `\n\u{1FA91} Mesa: ${selectedTable}` : '';
    const specialAttention = guestCount > 5 ? '\n\u{26A0}\u{FE0F} ATENCIÓN: Grupo mayor a 5 personas (requiere atención especial)' : '';
    
    const message = `Hola, quisiera hacer una reserva en Tanganika.\n\n\u{1F4C5} Fecha: ${formattedDate}\n\u{23F0} Hora: ${time}\n\u{1F465} Personas: ${guests}${tableInfo}${specialAttention}\n\u{1F464} Nombre: ${name}\n\u{1F4DE} Teléfono: ${phone}`;
    
    // Tanganika phone number: +598 94 488 580
    const whatsappUrl = `https://api.whatsapp.com/send?phone=59894488580&text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white-pueblo text-atlantic-blue selection:bg-golden-sunset selection:text-white-pueblo relative">
      {/* Sand Background Image */}
      <div 
        className="fixed inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-multiply z-0"
        style={{
          backgroundImage: `url("https://img.freepik.com/fotos-gratis/areia-amarela-natural-no-fundo-da-praia_53876-146905.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} 
      />

      {/* Navbar Placeholder for consistency */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-atlantic-blue/95 backdrop-blur-md py-4 shadow-lg border-b border-atlantic-blue/5">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <Link to="/" className="transition-opacity hover:opacity-80">
            <img 
              src="https://storage.googleapis.com/www.tanganika.uy/public/bg-rm-white.png" 
              alt="Tanganika" 
              className="h-12 w-auto object-contain"
            />
          </Link>
          <Link to="/" className="text-white-pueblo/60 hover:text-white-pueblo transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
            <ArrowLeft size={16} /> Volver
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-golden-sunset/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-atlantic-blue/10 rounded-full blur-[100px]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-golden-sunset text-xs tracking-[0.2em] uppercase font-bold mb-4 block">Reservas</span>
            <h1 className="text-4xl md:text-5xl font-serif text-atlantic-blue mb-6">Reserva tu Mesa</h1>
            <p className="text-atlantic-blue/60 leading-relaxed max-w-2xl mx-auto">
              Complete el formulario a continuación para solicitar su reserva. 
              Será redirigido a WhatsApp para confirmar los detalles con nuestro equipo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-8 bg-atlantic-blue/5 p-8 md:p-10 rounded-2xl border border-atlantic-blue/10 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="space-y-2">
                    <Label className={cn(
                      "text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors",
                      errors.date ? "text-destructive" : "text-atlantic-blue/60"
                    )}>
                      <CalendarIcon size={14} className={errors.date ? "text-destructive" : "text-golden-sunset"} /> Fecha
                    </Label>
                    <Popover>
                      <PopoverTrigger
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full justify-start text-left font-normal !h-12 rounded-xl bg-atlantic-blue/5 border-atlantic-blue/10 hover:bg-atlantic-blue/10 hover:border-atlantic-blue/20 transition-all",
                          !formData.date && "text-atlantic-blue/40",
                          errors.date && "border-destructive/50 bg-destructive/5 ring-1 ring-destructive/20"
                        )}
                      >
                        <CalendarIcon className={cn("mr-2 h-4 w-4", errors.date ? "text-destructive" : "text-golden-sunset")} />
                        {formData.date ? (
                          format(formData.date, "PPP", { locale: es })
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => {
                            setFormData(prev => ({ ...prev, date }));
                            setErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors.date;
                              return newErrors;
                            });
                          }}
                          disabled={(date) =>
                            date < minDate || date > maxDate
                          }
                          initialFocus
                          locale={es}
                        />
                      </PopoverContent>
                    </Popover>
                    <AnimatePresence>
                      {errors.date && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-[10px] text-destructive font-bold uppercase tracking-wider"
                        >
                          {errors.date}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <Label className={cn(
                      "text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors",
                      errors.time ? "text-destructive" : "text-atlantic-blue/60"
                    )}>
                      <Clock size={14} className={errors.time ? "text-destructive" : "text-golden-sunset"} /> Hora
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(time) => {
                        setFormData(prev => ({ ...prev, time }));
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.time;
                          return newErrors;
                        });
                      }}
                    >
                      <SelectTrigger className={cn(
                        "w-full !h-12 rounded-xl bg-atlantic-blue/5 border-atlantic-blue/10 hover:bg-atlantic-blue/10 hover:border-atlantic-blue/20 transition-all",
                        errors.time && "border-destructive/50 bg-destructive/5 ring-1 ring-destructive/20"
                      )}>
                        <SelectValue placeholder="Seleccionar hora" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                        <SelectItem value="21:00">21:00</SelectItem>
                      </SelectContent>
                    </Select>
                    <AnimatePresence>
                      {errors.time && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-[10px] text-destructive font-bold uppercase tracking-wider"
                        >
                          {errors.time}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label className={cn(
                      "text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors",
                      errors.guests ? "text-destructive" : "text-atlantic-blue/60"
                    )}>
                      <Users size={14} className={errors.guests ? "text-destructive" : "text-golden-sunset"} /> Personas
                    </Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, guests: value }));
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.guests;
                          return newErrors;
                        });
                      }}
                    >
                      <SelectTrigger className={cn(
                        "w-full !h-12 rounded-xl bg-atlantic-blue/5 border-atlantic-blue/10 hover:bg-atlantic-blue/10 hover:border-atlantic-blue/20 transition-all",
                        errors.guests && "border-destructive/50 bg-destructive/5 ring-1 ring-destructive/20"
                      )}>
                        <SelectValue placeholder="Personas" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Persona' : 'Personas'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <AnimatePresence>
                      {errors.guests && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-[10px] text-destructive font-bold uppercase tracking-wider"
                        >
                          {errors.guests}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label className={cn(
                      "text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors",
                      errors.phone ? "text-destructive" : "text-atlantic-blue/60"
                    )}>
                      <Phone size={14} className={errors.phone ? "text-destructive" : "text-golden-sunset"} /> Teléfono
                    </Label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+598 ..."
                      value={formData.phone}
                      onChange={handleChange}
                      className={cn(
                        "!h-12 rounded-xl bg-atlantic-blue/5 border-atlantic-blue/10 focus:ring-golden-sunset/20 focus:border-golden-sunset transition-all",
                        errors.phone && "border-destructive/50 bg-destructive/5 ring-1 ring-destructive/20 placeholder:text-destructive/40"
                      )}
                    />
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-[10px] text-destructive font-bold uppercase tracking-wider"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label className={cn(
                    "text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors",
                    errors.name ? "text-destructive" : "text-atlantic-blue/60"
                  )}>
                    <User size={14} className={errors.name ? "text-destructive" : "text-golden-sunset"} /> Nombre Completo
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Su nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      "!h-12 rounded-xl bg-atlantic-blue/5 border-atlantic-blue/10 focus:ring-golden-sunset/20 focus:border-golden-sunset transition-all",
                      errors.name && "border-destructive/50 bg-destructive/5 ring-1 ring-destructive/20 placeholder:text-destructive/40"
                    )}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[10px] text-destructive font-bold uppercase tracking-wider"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

              {/* Table Selection Map */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-end">
                  <Label className="text-xs uppercase tracking-widest text-atlantic-blue/60 font-bold block">
                    Selecciona tu ubicación preferida
                  </Label>
                  {parseInt(formData.guests) > 5 && (
                    <span className="text-[10px] text-golden-sunset font-bold animate-pulse">
                      Grupos &gt; 5: Sujeto a disposición especial
                    </span>
                  )}
                </div>
                
                <div className={`relative bg-white-pueblo/40 rounded-2xl border border-atlantic-blue/10 p-6 overflow-hidden transition-opacity duration-300 ${parseInt(formData.guests) > 5 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                  {/* Sea Indication */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-uruguayan-sky/30 to-transparent flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-uruguayan-sky font-bold flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            className="h-1 w-3 bg-uruguayan-sky/40 rounded-full"
                          />
                        ))}
                      </div>
                      Vistas al Mar
                    </span>
                  </div>

                  {/* Tables Layout */}
                  <div className="mt-12 space-y-8 max-w-md mx-auto">
                    {/* First Line - 7 Tables */}
                    <div className="space-y-3">
                      <span className="text-[8px] uppercase tracking-widest text-atlantic-blue/40 font-bold block text-center">Primera Línea</span>
                      <div className="flex flex-wrap justify-center gap-3">
                        {[1, 2, 3, 4, 5, 6, 7].map(num => {
                          const isTable1 = num === 1;
                          const guestCount = parseInt(formData.guests);
                          const isDisabled = (isTable1 && guestCount > 2) || guestCount > 5;
                          
                          return (
                            <button
                              key={num}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => setFormData(prev => ({ ...prev, selectedTable: `Mesa ${num} (Primera Línea)` }))}
                              className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 border-2 text-[10px] font-bold ${
                                formData.selectedTable === `Mesa ${num} (Primera Línea)`
                                  ? 'bg-golden-sunset border-golden-sunset text-white-pueblo shadow-lg shadow-golden-sunset/30 scale-110 z-10'
                                  : isDisabled
                                    ? 'bg-atlantic-blue/5 border-atlantic-blue/5 text-atlantic-blue/20 cursor-not-allowed'
                                    : 'bg-white-pueblo border-atlantic-blue/10 text-atlantic-blue hover:border-golden-sunset/50'
                              }`}
                            >
                              <span>{num}</span>
                              {isTable1 && <span className="text-[6px] absolute -bottom-1 bg-atlantic-blue/10 px-1 rounded text-atlantic-blue/60">Máx 2</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Second Line */}
                    <div className="space-y-3">
                      <span className="text-[8px] uppercase tracking-widest text-atlantic-blue/40 font-bold block text-center">Salón</span>
                      <div className="flex justify-center gap-4">
                        {[8, 9, 10].map(num => {
                          const guestCount = parseInt(formData.guests);
                          const isDisabled = guestCount > 5;
                          
                          return (
                            <button
                              key={num}
                              type="button"
                              disabled={isDisabled}
                              onClick={() => setFormData(prev => ({ ...prev, selectedTable: `Mesa ${num}` }))}
                              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 text-xs font-bold ${
                                formData.selectedTable === `Mesa ${num}`
                                  ? 'bg-golden-sunset border-golden-sunset text-white-pueblo shadow-lg shadow-golden-sunset/30 scale-110 z-10'
                                  : isDisabled
                                    ? 'bg-atlantic-blue/5 border-atlantic-blue/5 text-atlantic-blue/20 cursor-not-allowed'
                                    : 'bg-white-pueblo border-atlantic-blue/10 text-atlantic-blue hover:border-golden-sunset/50'
                              }`}
                            >
                              <span>{num}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[9px] uppercase tracking-widest font-bold text-atlantic-blue/40">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-golden-sunset"></div> Seleccionada
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white-pueblo border border-atlantic-blue/10"></div> Disponible
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-atlantic-blue/5 border border-atlantic-blue/5"></div> No disponible
                    </div>
                  </div>
                </div>
                
                {formData.selectedTable && parseInt(formData.guests) <= 5 && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-golden-sunset font-bold italic"
                  >
                    Has seleccionado: {formData.selectedTable}
                  </motion.p>
                )}

                {parseInt(formData.guests) > 5 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-golden-sunset/5 rounded-xl border border-golden-sunset/20"
                  >
                    <p className="text-xs text-atlantic-blue/70 leading-relaxed">
                      <span className="font-bold text-golden-sunset">Nota para grupos grandes:</span> Debido a que nuestras mesas tienen una capacidad máxima de 5 personas, para grupos mayores requerimos una coordinación especial. Por favor, continúe con la solicitud por WhatsApp para que nuestro equipo pueda organizar su ubicación.
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full bg-golden-sunset text-white-pueblo font-bold uppercase tracking-widest h-14 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-xs md:text-sm shadow-lg shadow-golden-sunset/20",
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-atlantic-blue hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white-pueblo/30 border-t-white-pueblo rounded-full"
                    />
                  ) : (
                    <Send size={18} />
                  )}
                  {isSubmitting ? 'Procesando...' : 'Solicitar Reserva por WhatsApp'}
                </Button>
                <p className="text-center text-atlantic-blue/40 text-[10px] uppercase tracking-wider mt-4">
                  Se abrirá WhatsApp con los detalles pre-cargados
                </p>
              </div>
            </form>
          </motion.div>

            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="bg-atlantic-blue/5 p-8 rounded-2xl border border-atlantic-blue/10 backdrop-blur-sm h-full">
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-atlantic-blue/40 font-bold mb-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-atlantic-blue/10"></span>
                  Información Importante
                </h4>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="bg-golden-sunset/10 p-3 rounded-xl shrink-0 group-hover:bg-golden-sunset group-hover:text-white-pueblo transition-colors duration-300">
                      <ShieldCheck size={20} className="text-golden-sunset group-hover:text-inherit" />
                    </div>
                    <div>
                      <h5 className="text-atlantic-blue font-bold text-sm mb-1">Derecho de Admisión</h5>
                      <p className="text-atlantic-blue/60 text-xs leading-relaxed">
                        La casa se reserva el derecho de admisión y permanencia en el establecimiento.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-golden-sunset/10 p-3 rounded-xl shrink-0 group-hover:bg-golden-sunset group-hover:text-white-pueblo transition-colors duration-300">
                      <DollarSign size={20} className="text-golden-sunset group-hover:text-inherit" />
                    </div>
                    <div>
                      <h5 className="text-atlantic-blue font-bold text-sm mb-1">Consumo Mínimo</h5>
                      <p className="text-atlantic-blue/60 text-xs leading-relaxed">
                        Mesas en <span className="text-golden-sunset font-bold">primera línea</span> requieren un consumo mínimo de <span className="font-bold text-atlantic-blue">U$S 30</span> por persona.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-golden-sunset/10 p-3 rounded-xl shrink-0 group-hover:bg-golden-sunset group-hover:text-white-pueblo transition-colors duration-300">
                      <Timer size={20} className="text-golden-sunset group-hover:text-inherit" />
                    </div>
                    <div>
                      <h5 className="text-atlantic-blue font-bold text-sm mb-1">Tolerancia de Espera</h5>
                      <p className="text-atlantic-blue/60 text-xs leading-relaxed">
                        Máximo de <span className="font-bold text-atlantic-blue">15 minutos</span>. Pasado este tiempo, la mesa quedará sujeta a disponibilidad.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-golden-sunset/5 rounded-xl border border-golden-sunset/10">
                  <p className="text-atlantic-blue/50 text-[11px] leading-relaxed text-center italic">
                    "Nuestra prioridad es brindarle la mejor experiencia frente al mar."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
