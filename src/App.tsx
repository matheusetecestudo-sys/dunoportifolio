import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "motion/react";
import { 
  ExternalLink, 
  Github, 
  Mail, 
  Linkedin, 
  ChevronRight, 
  Code2, 
  Palette, 
  Zap, 
  Globe,
  ArrowUpRight,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  Search,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Plus,
  ArrowUp,
  Send,
  TrendingUp,
  Clock,
  Ban
} from "lucide-react";

// Types
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
  tags: string[];
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Ethereal Commerce",
    category: "Conversão Direta WhatsApp",
    image: "https://picsum.photos/seed/ethereal/800/600",
    link: "#",
    tags: ["Alta Conversão", "Integração WhatsApp", "Carga Rápida"]
  },
  {
    id: 2,
    title: "Chronos Dashboard",
    category: "Gestão de Leads",
    image: "https://picsum.photos/seed/chronos/800/600",
    link: "#",
    tags: ["Leads", "Funil de Vendas", "Analytics"]
  },
  {
    id: 3,
    title: "Aura Creative Agency",
    category: "Vendas High-Ticket",
    image: "https://picsum.photos/seed/aura/800/600",
    link: "#",
    tags: ["Branding", "Resposta Direta", "Mobile"]
  },
  {
    id: 4,
    title: "Nova Fintech",
    category: "Suporte Instantâneo",
    image: "https://picsum.photos/seed/nova/800/600",
    link: "#",
    tags: ["UX", "Sinais de Confiança", "Global"]
  },
  {
    id: 5,
    title: "Zenith Real Estate",
    category: "Agendamento WhatsApp",
    image: "https://picsum.photos/seed/zenith-real/800/600",
    link: "#",
    tags: ["Imobiliário", "Leads", "Interativo"]
  },
  {
    id: 6,
    title: "Vortex Gaming",
    category: "Comunidade & Vendas",
    image: "https://picsum.photos/seed/vortex/800/600",
    link: "#",
    tags: ["Engajamento", "Landing Page", "Performance"]
  },
  {
    id: 7,
    title: "Pulse SaaS",
    category: "Aquisição B2B",
    image: "https://picsum.photos/seed/pulse/800/600",
    link: "#",
    tags: ["B2B", "Funil SaaS", "WhatsApp"]
  },
  {
    id: 8,
    title: "BioTech Analytics",
    category: "Autoridade Digital",
    image: "https://picsum.photos/seed/biotech/800/600",
    link: "#",
    tags: ["Autoridade", "Ciência", "Conversão"]
  },
  {
    id: 9,
    title: "Obsidian Portfolio",
    category: "Foco em Resultados",
    image: "https://picsum.photos/seed/obsidian/800/600",
    link: "#",
    tags: ["Foco em ROI", "Minimalista", "Rápido"]
  }
];

const SKILLS = [
  { name: "Foco em Conversão", icon: <TrendingUp size={20} />, active: true },
  { name: "Design Magnético", icon: <Palette size={20} />, active: true },
  { name: "Engenharia de ROI", icon: <Zap size={20} />, active: true },
  { name: "WhatsApp Nexus", icon: <MessageSquare size={20} />, active: true },
];

const PROCESS = [
  { title: "Arquitetura de Vendas", desc: "Estruturamos o site para que o seu WhatsApp não pare de tocar.", step: "01" },
  { title: "Diferenciação", desc: "Criamos um layout que coloca sua marca anos-luz à frente da concorrência.", step: "02" },
  { title: "Otimização de ROI", desc: "Código leve pensado para que o site se pague no primeiro mês.", step: "03" },
  { title: "Consultoria Contínua", desc: "Suporte e atualizações constantes. Sem taxas ocultas.", step: "04" },
];

const PLANS = [
  { 
    name: "Aprendiz", 
    price: "49", 
    oldPrice: "59",
    features: ["Landing Page Essencial", "Integração WhatsApp", "Otimização Mobile", "Suporte Mensal"]
  },
  { 
    name: "Artesão Unlimited", 
    price: "119", 
    oldPrice: "149",
    features: ["E-commerce Completo", "Funil de Vendas", "ROI Dashboard", "Updates Semanais"],
    popular: true
  },
  { 
    name: "Maestro Unlimited", 
    price: "239", 
    oldPrice: "299",
    features: ["Ecossistema Digital", "IA de Atendimento", "Escala Global", "Suporte 24/7 VIP"]
  },
];

const COMPARISON = [
  { feature: "Custo de Implementação", buying: "Altíssimo (Investimento pesado)", duno: "Baixo (Investimento imediato em ROI)" },
  { feature: "Manutenção e Atualizações", buying: "Você paga por fora em cada alteração", duno: "Incluso. O site evolui com seu negócio" },
  { feature: "Foco do Projeto", buying: "Geralmente apenas 'estético'", duno: "Conversão bruta para o WhatsApp" },
  { feature: "Liberdade", buying: "Preso a uma tecnologia datada", duno: "Cancele a qualquer momento. Zero risco." },
];

const TESTIMONIALS = [
  { name: "Ricardo Santos", role: "CEO na TechNova", text: "Meu faturamento aumentou 40% em dois meses. O site não é apenas bonito, é uma máquina de leads via WhatsApp." },
  { name: "Ana Beatriz", role: "Diretora Criativa", text: "O diferencial da DUNO é que eles entendem de negócios, não só de design. O site se pagou em menos de 15 dias." },
  { name: "Marcos Oliveira", role: "Founder da Vortex", text: "Ter a liberdade de cancelar a qualquer momento me deu confiança, mas o resultado foi tão bom que o site virou meu maior canal de vendas." },
];

const FAQS = [
  { q: "O site realmente se paga rápido?", a: "Sim. Projetamos cada seção com técnicas de copywriting e UX focadas em levar o cliente ao clique de contato. Se você tem tráfego, o site converte." },
  { q: "Posso cancelar quando eu quiser?", a: "Absolutamente. Diferente de comprar um site onde você fica preso, aqui você tem um serviço de elite. Sem fidelidade, sem burocracia." },
  { q: "Como o site aumenta meu faturamento?", a: "Reduzindo o atrito de comunicação. Criamos um funil visual que filtra curiosos e entrega leads qualificados direto no seu WhatsApp." },
  { q: "Qual a diferença de comprar um site comum?", a: "Um site comum 'morre' após a entrega. Nosso modelo garante que seu site esteja sempre atualizado, seguro e otimizado para as mudanças do mercado." },
];

function ProjectCard({ project, index }: { project: Project; index: number; key?: any }) {
  const ref = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springY = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 30]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ willChange: "transform, opacity" }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-950 border border-white/5 mb-6">
        {/* Neon Skeleton/Fallback */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" />
            <Zap className="text-white/5 animate-bounce" size={32} />
          </div>
        )}
        
        {/* Error Fallback */}
        {hasError && (
          <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <Code2 className="text-fuchsia-500/50" size={40} />
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-mono">Erro ao carregar projeto</p>
          </div>
        )}

        <motion.img 
          src={project.image} 
          alt={project.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          style={{ y: springY }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-1000 scale-125 ${isLoaded ? 'opacity-80 group-hover:opacity-100 blur-0' : 'opacity-0 blur-xl'}`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex gap-2 flex-wrap text-white">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-primary-gradient rounded-full text-[10px] font-mono border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gradient text-xs font-mono mb-2 uppercase tracking-widest">{project.category}</p>
          <h3 className="text-2xl font-display font-semibold tracking-tight">{project.title}</h3>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary-gradient group-hover:border-transparent transition-all">
          <ArrowUpRight size={18} />
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#05060f] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-display font-black tracking-tighter text-gradient px-4">DUNO</h2>
            <div className="w-12 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "100%" }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="w-full h-full bg-primary-gradient"
               />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return <DunoNexusApp />;
}

function DunoNexusApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredFaqs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Parallax Scroll for Hero
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const springOpacity = useSpring(useTransform(heroScroll, [0, 0.5], [1, 0]), { stiffness: 100, damping: 30 });
  const springScale = useSpring(useTransform(heroScroll, [0, 1], [1, 1.2]), { stiffness: 100, damping: 30 });
  const springY = useSpring(useTransform(heroScroll, [0, 1], [0, 150]), { stiffness: 100, damping: 30 });

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const sectionVariants = fadeInUp;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-bg-dark">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      </div>

      {/* Sticky WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/seunumerosaqui"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover="hover"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center group"
      >
        {/* Wave Rings */}
        <motion.div 
          variants={{
            hover: { scale: 1.5, opacity: 0, transition: { duration: 1.5, repeat: Infinity } }
          }}
          className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
        />
        <motion.div 
          variants={{
            hover: { scale: 2, opacity: 0, transition: { duration: 1.5, repeat: Infinity, delay: 0.3 } }
          }}
          className="absolute inset-0 bg-[#25D366]/40 rounded-full -z-10"
        />

        <motion.div variants={{ hover: { scale: 1.1 } }}>
          <svg 
            viewBox="0 0 24 24" 
            className="w-7 h-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </motion.div>

        <span className="absolute right-full mr-4 bg-zinc-900 border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            Fale conosco agora!
          </div>
        </span>
      </motion.a>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(217, 70, 239, 1)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 right-6 z-[90] w-12 h-12 bg-fuchsia-600/20 backdrop-blur-md border border-fuchsia-500/30 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-colors duration-300"
            title="Voltar ao topo"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="bg-glass rounded-full px-6 py-2 flex items-center gap-8 md:gap-12 max-w-4xl"
        >
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-2xl tracking-tighter text-gradient">DUNO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {['Projetos', 'Planos', 'Processo', 'Vantagens', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-white/60 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-fuchsia-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Projetos', 'Processo', 'Vantagens', 'Planos', 'Depoimentos', 'FAQ', 'Contato'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-display font-bold hover:text-gradient transition-all"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
      >
        {/* Background Image Enhancement with Parallax */}
        <motion.div 
          style={{ scale: springScale, y: springY, opacity: springOpacity, willChange: "transform, opacity" }}
          className="absolute inset-0 -z-20 overflow-hidden"
        >
          <img 
            src="https://picsum.photos/seed/cyber-business/1200/800?blur=5" 
            alt="Hero Background" 
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover opacity-[0.08]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-transparent to-bg-dark" />
        </motion.div>

        <motion.div 
          style={{ opacity: springOpacity, willChange: "opacity" }}
          className="container mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-gradient/10 border border-fuchsia-100/10 rounded-full mb-10 shadow-[0_0_20px_rgba(217,70,239,0.1)]"
          >
            <div className="w-2 h-2 rounded-full bg-primary-gradient animate-pulse shadow-[0_0_10px_#fb7185]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/80 font-bold">
              ESTRATÉGIA DIGITAL • ALTA PERFORMANCE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-[8rem] lg:text-[10rem] font-display font-black leading-[0.8] tracking-tighter mb-8"
          >
            <span className="text-gradient">DESIGN</span> <br />
            <span className="text-white drop-shadow-2xl">QUE VENDE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            Sites desenhados para <span className="text-white font-medium">multiplicar seu faturamento</span>. 
            Não entregamos apenas páginas, construímos máquinas de venda direta para seu WhatsApp.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <a 
              href="#projetos"
              className="bg-primary-gradient px-12 py-7 rounded-3xl font-black text-sm uppercase tracking-[0.25em] shadow-[0_20px_50px_rgba(217,70,239,0.3)] hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
            >
              Ver Portfólio
            </a>
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-2 text-white/80 font-bold">
                 <ShieldCheck className="text-gradient" size={18} />
                 Cancelamento Livre
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Pague pelo resultado • Sem fidelidade</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating element for more life */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] hidden xl:block"
        >
           <div className="bg-glass p-6 rounded-[2rem] border-neon rotate-12 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
              <div className="flex items-center gap-4 mb-2">
                 <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <MessageSquare size={20} />
                 </div>
                 <span className="font-bold">Novo Lead!</span>
              </div>
              <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest">Via WhatsApp Business</p>
           </div>
        </motion.div>
      </motion.section>
      <motion.section 
        variants={sectionVariants}
        style={{ willChange: "transform" }}
        className="border-y border-white/5 py-8 overflow-hidden bg-white/2"
      >
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-6 text-4xl md:text-6xl font-display font-black text-white/5 uppercase tracking-tighter">
              <span className="text-gradient">Máxima Conversão</span>
              <div className="w-3 h-3 bg-primary-gradient rotate-45" />
              <span>WhatsApp Direct</span>
              <div className="w-3 h-3 bg-primary-gradient rotate-45" />
              <span className="text-gradient">Diferenciação Brutal</span>
              <div className="w-3 h-3 bg-primary-gradient rotate-45" />
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section 
        id="projetos" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 container mx-auto px-6"
      >
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight uppercase">SITES QUE <span className="text-gradient italic pr-2">CONVERTEM</span></h2>
            <p className="text-white/40 max-w-md font-light">Não apenas código. Estratégias visuais focadas em resultados reais de faturamento.</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-gradient font-medium cursor-pointer group"
          >
            PORQUE ESCOLHER A DUNO? 
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.div>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-16">
          {PROJECTS.map((project, idx) => (
            <motion.div key={project.id} variants={scaleIn}>
              <ProjectCard project={project} index={idx} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Comparison Section */}
      <motion.section 
        id="vantagens" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 bg-white/2 relative"
      >
        <div className="container mx-auto px-6">
           <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight uppercase">O MODELO <span className="text-gradient italic pr-2">PAGO POR RESULTADO</span></h2>
            <p className="text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
              Por que gastar milhares comprando um site que ficará obsoleto amanhã? 
              A DUNO oferece um ecossistema vivo que evolui com seu ROI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              variants={slideInLeft}
              className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem]"
            >
              <div className="flex items-center gap-3 mb-8 text-white/30 uppercase tracking-[0.3em] font-mono text-xs">
                 <Ban className="text-red-500/50" /> Modelo Tradicional (Compra)
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start border-b border-white/5 pb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Custo Inicial Massivo</h4>
                    <p className="text-sm text-white/40 font-light leading-relaxed">Você desembolsa 5k, 10k sem saber se terá retorno do investimento.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start border-b border-white/5 pb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Obsolescência Programada</h4>
                    <p className="text-sm text-white/40 font-light leading-relaxed">Em 6 meses seu site está lento e desatualizado. Você paga de novo.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Fidelidade Forçada</h4>
                    <p className="text-sm text-white/40 font-light leading-relaxed">Preso a sistemas complexos que só o desenvolvedor sabe mexer.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              variants={slideInRight}
              className="bg-glass border-fuchsia-500/50 p-10 rounded-[2.5rem] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 bg-fuchsia-600 text-[10px] font-black uppercase tracking-widest animate-pulse">
                Recomendado
              </div>
              <div className="flex items-center gap-3 mb-8 text-neon uppercase tracking-[0.3em] font-mono text-xs">
                 <Zap className="text-fuchsia-500" /> Ecossistema DUNO Nexus
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start border-b border-white/10 pb-6">
                  <CheckCircle2 className="text-fuchsia-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Baixo Risco, Alto ROI</h4>
                    <p className="text-sm text-white/60 font-light leading-relaxed">O site se paga rapidamente com o aumento de leads no WhatsApp.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start border-b border-white/10 pb-6">
                  <CheckCircle2 className="text-fuchsia-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Evolução Contínua</h4>
                    <p className="text-sm text-white/60 font-light leading-relaxed">Manutenção e melhorias inclusas. Seu site nunca fica velho.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <CheckCircle2 className="text-fuchsia-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Liberdade Total</h4>
                    <p className="text-sm text-white/60 font-light leading-relaxed text-neon">Cancele quando quiser. Trabalhamos para que você nunca queira cancelar.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Expertise */}
      <motion.section 
        id="processo"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-32"
      >
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={slideInLeft} className="relative order-2 lg:order-1">
             <div className="grid grid-cols-2 gap-4">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  variants={scaleIn}
                  className="bg-glass p-8 rounded-[2rem] flex flex-col gap-4 group hover:bg-white/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gradient group-hover:bg-primary-gradient group-hover:text-white transition-all">
                    {skill.icon}
                  </div>
                  <h4 className="font-display font-bold leading-tight">{skill.name}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={slideInRight} className="order-1 lg:order-2">
            <span className="text-gradient font-mono text-sm tracking-[0.3em] uppercase mb-4 block">Diferenciação Brutal</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight uppercase">SAIA DA <span className="text-white/30 italic pr-2">CONCORRÊNCIA</span></h2>
            <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
              <p>
                Ter um site hoje não é mais um luxo, é sua vitrine principal. Mas ter um site **ruim** 
                é o que está matando sua conversão. 
              </p>
              <p>
                Utilizamos 15 anos de experiência técnica e psicológica para criar ambientes digitais 
                que forçam a autoridade da sua marca e levam o cliente direto para o fechamento.
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <div>
                 <p className="text-3xl font-display font-bold text-neon">+40%</p>
                 <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Média de Faturamento</p>
              </div>
              <div>
                 <p className="text-3xl font-display font-bold text-neon">2X</p>
                 <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Velocidade de Contato</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        id="nexus-process" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 container mx-auto px-6"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight uppercase">CONSTRUÇÃO DE <span className="text-gradient italic pr-2">VALOR</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto font-light">Nossa metodologia é focada em ROI (Retorno sobre Investimento) imediato.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              variants={itemVariant}
              className="bg-glass p-10 rounded-[2.5rem] relative group hover:border-white/10 transition-colors"
            >
              <span className="text-6xl font-display font-black text-white/5 absolute top-6 right-6 group-hover:text-gradient transition-colors">{p.step}</span>
              <h3 className="text-2xl font-display font-bold mb-4">{p.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="depoimentos" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-20 bg-white/2"
      >
        <div className="container mx-auto px-6">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight uppercase">QUEM <span className="text-gradient italic pr-2">INVESTIU</span> E LUCROU</h2>
          </div>
          <motion.div variants={staggerContainer} className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={slideInRight}
                className="min-w-[300px] md:min-w-[400px] bg-glass p-8 rounded-3xl"
              >
                <div className="flex gap-1 text-gradient mb-6">
                  {[...Array(5)].map((_, star) => <Sparkles key={star} size={14} fill="currentColor" />)}
                </div>
                <p className="text-lg italic text-white/80 mb-8 font-light">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full p-px bg-primary-gradient flex items-center justify-center overflow-hidden bg-zinc-800">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${i + 10}`} 
                      alt="User" 
                      loading="lazy"
                      decoding="async"
                      className="rounded-full w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h5 className="font-bold">{t.name}</h5>
                    <p className="text-xs text-gradient uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Investment Plans Section (NEW) */}
      <motion.section 
        id="planos" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 container mx-auto px-6"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight uppercase">PLANOS DE <span className="text-gradient italic pr-2">INVESTIMENTO</span></h2>
          <p className="text-white/40 max-w-2xl mx-auto font-light">Escolha a escala de crescimento que seu negócio exige agora.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={scaleIn}
              className={`bg-[#0c0d21] border p-10 rounded-[2.5rem] flex flex-col gap-6 relative group transition-all duration-500 hover:scale-105 ${plan.popular ? 'border-fuchsia-500/50 shadow-[0_0_50px_rgba(217,70,239,0.2)]' : 'border-white/5'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full whitespace-nowrap">
                  Mais Procurado
                </div>
              )}
              <div className="text-center">
                <h3 className={`text-xl font-bold mb-4 ${i === 0 ? 'text-blue-400' : i === 1 ? 'text-fuchsia-400' : 'text-indigo-400'}`}>{plan.name}</h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-white/30 line-through text-lg font-mono">R${plan.oldPrice}</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-black ${i === 0 ? 'text-blue-500' : i === 1 ? 'text-fuchsia-500' : 'text-indigo-500'}`}>R${plan.price}</span>
                    <span className="text-white/40 text-sm font-mono tracking-widest">/mês</span>
                  </div>
                </div>
                <p className="text-[10px] text-white/20 mt-2 font-mono uppercase">Taxas inclusas</p>
              </div>

              <div className="h-px bg-white/5 w-full my-2" />

              <ul className="space-y-4 flex-grow">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/60 font-light">
                    <CheckCircle2 size={16} className="text-white/20" /> {f}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-primary-gradient py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(0,0,0,0.5)] active:scale-95 transition-transform hover:scale-[1.02]">
                Assinar Agora
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section 
        id="faq" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 container mx-auto px-6 max-w-4xl"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold text-center mb-10 tracking-tight uppercase">RESPOSTAS <span className="text-gradient italic pr-2">DIRETAS</span></motion.h2>
        
        {/* Search Input and Bulk Actions */}
        <motion.div variants={fadeInUp} className="flex flex-col gap-6 mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-fuchsia-500 transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Dúvida sobre planos, prazos ou suporte?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-fuchsia-500/50 focus:bg-white/10 transition-all font-light"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-6 flex items-center text-white/20 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex justify-center md:justify-end gap-6 text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-white/30">
            <button 
              onClick={() => setOpenFaqs(filteredFaqs.map((_, i) => i))}
              className="hover:text-fuchsia-500 transition-colors flex items-center gap-2"
            >
              <Plus size={12} /> Expandir Tudo
            </button>
            <div className="w-px h-3 bg-white/10" />
            <button 
              onClick={() => setOpenFaqs([])}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <X size={12} /> Recolher Tudo
            </button>
          </div>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {filteredFaqs.length > 0 ? filteredFaqs.map((faq, i) => (
            <motion.div key={i} variants={itemVariant} className="bg-glass rounded-2xl overflow-hidden group">
              <button 
                onClick={() => {
                  if (openFaqs.includes(i)) {
                    setOpenFaqs(openFaqs.filter(id => id !== i));
                  } else {
                    setOpenFaqs([...openFaqs, i]);
                  }
                }}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className={`font-medium text-lg transition-colors ${openFaqs.includes(i) ? 'text-gradient' : ''}`}>{faq.q}</span>
                <motion.div
                  animate={{ rotate: openFaqs.includes(i) ? 45 : 0 }}
                  className="text-fuchsia-500 group-hover:text-magenta-400"
                >
                  <Plus className={openFaqs.includes(i) ? "text-gradient" : ""} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaqs.includes(i) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-white/60 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )) : (
            <div className="text-center py-20 bg-white/2 rounded-3xl border border-dashed border-white/10">
              <p className="text-white/40 font-light italic">
                Nenhum resultado encontrado para "{searchTerm}". <br />
                <button 
                  onClick={() => setSearchTerm("")}
                  className="text-fuchsia-500 font-medium mt-4 hover:underline"
                >
                  Limpar busca
                </button>
              </p>
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* Final CTA / Footer */}
      <footer id="contato" className="pt-24 pb-8 bg-white/2 relative">
        <div className="container mx-auto px-6">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-gradient/10 border border-fuchsia-500/20 rounded-full mb-6 text-gradient font-mono text-xs font-bold tracking-widest uppercase">
              <TrendingUp size={14} /> O Próximo Nível do Seu Faturamento Começa Aqui
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-black mb-6 tracking-tighter leading-[0.9] uppercase">DOMINE O SEU <br /> <span className="text-gradient italic pr-4">MERCADO</span></h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto font-light text-lg">
              Sua concorrência está investindo em design. E você? 
              Transforme seu site em uma máquina de lucro imediato.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-8">
              <motion.a 
                href="https://wa.me/seunumerosaqui" 
                whileHover={{ scale: 1.05, boxShadow: "0 0 100px rgba(217,70,239,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary-gradient opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-14 py-8 rounded-full flex items-center justify-center gap-6 text-white font-black text-2xl border border-white/20 whitespace-nowrap">
                   QUERO MEU SITE AGORA
                   <div className="relative">
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                      <div className="absolute inset-0 bg-white blur-xl opacity-20 scale-0 group-hover:scale-150 transition-transform duration-500" />
                   </div>
                </div>
              </motion.a>
              
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-white/40 uppercase font-mono text-[10px] tracking-[0.3em]">
                 <div className="flex items-center gap-2 text-gradient"><CheckCircle2 size={16} className="text-fuchsia-500" /> Sem taxas ocultas</div>
                 <div className="flex items-center gap-2 text-gradient"><CheckCircle2 size={16} className="text-fuchsia-500" /> Modelo Assinatura</div>
                 <div className="flex items-center gap-2 text-gradient"><CheckCircle2 size={16} className="text-fuchsia-500" /> ROI Garantido</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-20 border-b border-white/5 relative">
             <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
             <div className="col-span-1 md:col-span-2">
                <span className="font-display font-black text-3xl tracking-tighter text-gradient mb-6 block">DUNO</span>
                <p className="text-white/40 max-w-sm font-light leading-relaxed">
                   Estrategistas digitais focados em alta conversão. Não vendemos sites, entregamos máquinas de faturamento direto para negócios ambiciosos.
                </p>
             </div>
             
             <div>
                <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Navegação</h4>
                <ul className="space-y-4 text-white/40 text-sm font-light">
                   {['Projetos', 'Processo', 'Vantagens', 'Planos'].map(item => (
                      <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a></li>
                   ))}
                </ul>
             </div>

             <div>
                <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6 opacity-80">Comunicação</h4>
                <ul className="space-y-5 text-white/50 text-sm font-light">
                   <li>
                      <a href="mailto:contato@duno.com.br" className="flex items-center gap-3 hover:text-white transition-all group">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-fuchsia-500/20 transition-all shadow-inner">
                            <Mail size={16} className="text-fuchsia-500" />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-white/30 group-hover:text-fuchsia-400 opacity-0 group-hover:opacity-100 h-0 group-hover:h-3 transition-all duration-300">E-mail Direto</p>
                            contato@duno.com.br
                         </div>
                      </a>
                   </li>
                   <li>
                      <a href="https://wa.me/seunumerosaqui" className="flex items-center gap-3 hover:text-white transition-all group">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-all shadow-inner">
                            <MessageSquare size={16} className="text-green-500" />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-white/30 group-hover:text-green-400 opacity-0 group-hover:opacity-100 h-0 group-hover:h-3 transition-all duration-300">WhatsApp 24h</p>
                            +55 11 9XXXX-XXXX
                         </div>
                      </a>
                   </li>
                   <li>
                      <a href="#contato" className="flex items-center gap-3 hover:text-white transition-all group">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-fuchsia-500/20 transition-all shadow-inner">
                            <Sparkles size={16} className="text-fuchsia-500" />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-white/30 group-hover:text-fuchsia-400 opacity-0 group-hover:opacity-100 h-0 group-hover:h-3 transition-all duration-300">Consultoria</p>
                            Fale com um Especialista
                         </div>
                      </a>
                   </li>
                </ul>
             </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8 order-2 md:order-1">
               <a href="#" className="text-white/20 hover:text-white transition-colors"><Linkedin size={20} /></a>
               <a href="#" className="text-white/20 hover:text-white transition-colors"><Github size={20} /></a>
               <a href="#" className="text-white/20 hover:text-white transition-colors"><ExternalLink size={20} /></a>
            </div>
            
            <div className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] order-1 md:order-2 text-center">
              © 2024 DUNO NEXUS • MÁQUINAS DE CONVERSÃO • CNPJ 00.000.000/0001-00
            </div>
            
            <div className="text-white/20 text-[10px] uppercase font-mono tracking-[0.2em] order-3 flex items-center gap-4">
              Design by <span className="text-white">Studio Duno</span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all ml-4"
              >
                <ChevronRight className="-rotate-90" size={14} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
