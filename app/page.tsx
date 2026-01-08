'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Map, Leaf, Headset } from 'lucide-react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface Circuit {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: number;
  destination: string;
  image: string;
}


export default function Home() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [themeFilter, setThemeFilter] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  /* ===== HERO IMAGES ===== */
  const heroImages = [
    '/hero/hero1.jpg',
    '/hero/hero2.jpg',
    '/hero/hero3.jpg',
  ];

  /* ===== TEXTES DYNAMIQUES ===== */
  const heroTexts = [
    'Voyages authentiques à Madagascar',
    'Explorez le Nord, Sud et Est',
    'Des circuits conçus par des experts locaux',
  ];



  // Changer l'image toutes les 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
      setTypedText('');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter dynamique
  useEffect(() => {
    let i = 0;
    const text = heroTexts[currentText];
    const timer = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(timer);
    }, 80);
    return () => clearInterval(timer);
  }, [currentText]);

  /* ===== CIRCUITS ===== */
  const [circuits, setCircuits] = useState<Circuit[]>([]);
    const [loading, setLoading] = useState(true);
  
    // Fetch API NestJS
    useEffect(() => { 
        console.log(
    'API URL =',
    process.env.NEXT_PUBLIC_API_URL
  );
      const fetchCircuits = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/circuits`);
          const data = await res.json();
          setCircuits(data);
        } catch (err) {
          console.error('Erreur fetch circuits:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchCircuits();
    }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-variable text-variable font-sans">
<nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-800/50 backdrop-blur shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* LOGO */}
        <div
          className="flex items-center cursor-pointer max-w-[150px]"
          onClick={() => router.push('/')}
        >
          <img
            src="/logo.png"
            alt="MadaBlue Logo"
            className="h-16 sm:h-18 w-auto mr-2"
            style={{ filter: 'drop-shadow(0 0 2px rgba(2, 1, 10, 1))' }} // ⚡ ajoute contraste si logo clair
          />
          <span className="text-xl font-bold hidden sm:inline-block text-white-900">Voyage à Madagascar</span>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex gap-6 items-center text-white-900">
       <button className="hover:text-blue-500 transition" onClick={() => router.push('/')}>
            Accueil
          </button>
          <button className="hover:text-blue-500 transition" onClick={() => router.push('/circuits')}>
            Circuits
          </button>
          <button className="hover:text-blue-500 transition" onClick={() => router.push('/voyage-sur-mesure')}>
            Voyage sur Mesure
          </button>
          <button className="hover:text-blue-500 transition" onClick={() => router.push('/test-leads')}>
            Contact
          </button>
             <button className="hover:text-blue-500 transition" onClick={() => router.push('/blog')}>
            Blog
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white-900">
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {mobileOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur flex flex-col gap-4 p-4 text-white-900">
          <button className="hover:text-blue-500 transition text-left" onClick={() => { router.push('/'); setMobileOpen(false); }}>
            Accueil
          </button>
          <button className="hover:text-blue-500 transition text-left" onClick={() => { router.push('/circuits'); setMobileOpen(false); }}>
            Circuits
          </button>
          <button className="hover:text-blue-500 transition text-left" onClick={() => { router.push('/voyage-sur-mesure'); setMobileOpen(false); }}>
            Voyage sur Mesure
          </button>
          <button className="hover:text-blue-500 transition text-left" onClick={() => { router.push('/test-leads'); setMobileOpen(false); }}>
            Contact
          </button>
          <button className="hover:text-blue-500 transition text-left" onClick={() => { router.push('/blog'); setMobileOpen(false); }}>
            Blog
          </button>
        </div>
      )}
    </nav>

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="relative h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Images */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 hero-zoom`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentImage ? 1 : 0,
            }}
          ></div>
        ))}

        {/* Overlay dynamique */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/25 to-black/50 animate-overlay"></div>

        {/* Contenu */}
        <div className="relative z-10 text-center px-4 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-90 mb-4">
            {typedText}
            <span className="blinking-cursor">|</span>
          </h1>
          <p className="text-xl md:text-2xl text-dark/90 mb-8">
            Conçus par des experts locaux
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition"
              onClick={() => router.push('/test-leads')}
            >
              Créer mon voyage
            </button>
            <button
              className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition"
              onClick={() => router.push('/circuits')}
            >
              Découvrir nos circuits
            </button>
          </div>
        </div>
      </section>
<section className="pt-8 pb-10 max-w-7xl mx-auto px-4">
  <h2 className="text-3xl font-bold text-center mb-12 animate-fadeIn">
    Pourquoi nous choisir
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {[
      {
        title: 'Expertise locale',
        desc: 'Guides et partenaires malgaches',
        icon: Compass,
      },
      {
        title: 'Voyages sur mesure',
        desc: 'Circuits adaptés à vos envies',
        icon: Map,
      },
      {
        title: 'Tourisme responsable',
        desc: 'Respect des communautés et de la nature',
        icon: Leaf,
      },
      {
        title: 'Assistance 24/7',
        desc: 'Présents avant, pendant et après',
        icon: Headset,
      },
    ].map((item, i) => {
      const Icon = item.icon;
      return (
        <div
          key={i}
          className="
            animate-fadeIn
            rounded-2xl
            p-6
            text-center
            bg-white/60 dark:bg-slate-900/40
            border border-white/20
            backdrop-blur
            hover:-translate-y-1
            transition
          "
        >
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon size={28} className="text-primary" />
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">
            {item.title}
          </h3>
          <p className="text-sm opacity-80">
            {item.desc}
          </p>
        </div>
      );
    })}
  </div>
</section>

      {/* ===== CIRCUITS ===== */}
       <main id="circuits" className="pt-4 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center animate-fadeIn">Circuits à la une</h2>

        {loading ? (
          <p className="text-center text-lg">Chargement des circuits...</p>
        ) : circuits.length === 0 ? (
          <p className="text-center text-lg">Aucun circuit disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {circuits.slice(0,3).map(c => (
              <div
                key={c.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg card-hover cursor-pointer animate-fadeIn"
                onClick={() => router.push(`/circuits/${c.id}`)}
              >
                <div className="relative w-full pb-[56.25%] mb-4 rounded-xl overflow-hidden">
                 {c.image ? (
                              <img
                                src={c.image}
                                 alt={c.title}
                                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                     ) : (
                               <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                               <span className="text-gray-400">Pas d'image</span>
                               </div>
                                 )}
                             </div>

                <h3 className="text-2xl font-semibold mb-1">{c.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{c.duration} • {c.destination}</p>
                <p className="mb-2">{c.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
 
         {/* ===== Whatsapp ===== */}
      <a
            href="https://wa.me/261XXXXXXXXX"
            target="_blank"
             rel="noopener noreferrer"
              className="whatsapp-float"
         >
  <img src="/icons/whatsapp.svg" alt="WhatsApp" />
</a>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white py-10 px-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

    {/* Logo + Nom */}
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="MadaBlue Logo" className="h-12 w-auto" />
      
    </div>

      <div className="mt-8 text-center text-sm text-gray-400">
    © 2026 MadaBlue – Patrick Ralalanirina
      <h3>contact info</h3>
        <p> <i className="fas fa-phone"></i> +261 34 20 323 56</p>
        <p> <i className="fas fa-envelope"></i> patrickralalanirina521@gmail.com</p>
        <p> <i className="fas fa-map-marked-alt"></i>III S 353 A Madera Namontana</p>
        
  </div>
    {/* Réseaux sociaux */}
    <div className="flex gap-4">
      <a href="https://wa.me/261XXXXXXXXX" target="_blank" className="hover:text-green-400 transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 2.1.63 4.05 1.7 5.65L2 22l4.4-1.68C8.95 21.37 10.9 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.5 15h-1v-2h1v2zm0-4h-1V7h1v6z"/>
        </svg>
      </a>
      <a href="https://www.instagram.com/patrick.ralnir/" target="_blank" className="hover:text-pink-400 transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.25 2.43.415a4.92 4.92 0 0 1 1.77 1.02 4.92 4.92 0 0 1 1.02 1.77c.165.46.36 1.26.415 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.25 1.97-.415 2.43a4.92 4.92 0 0 1-1.02 1.77 4.92 4.92 0 0 1-1.77 1.02c-.46.165-1.26.36-2.43.415-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.25-2.43-.415a4.92 4.92 0 0 1-1.77-1.02 4.92 4.92 0 0 1-1.02-1.77c-.165-.46-.36-1.26-.415-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.25-1.97.415-2.43a4.92 4.92 0 0 1 1.02-1.77 4.92 4.92 0 0 1 1.77-1.02c.46-.165 1.26-.36 2.43-.415C8.416 2.212 8.8 2.2 12 2.2zM12 0C8.736 0 8.332.012 7.052.07 5.77.127 4.828.322 4.042.573 3.215.833 2.51 1.23 1.9 1.84.933 2.807.437 4.03.074 5.043-.05 5.33-.1 5.62-.1 12s.05 6.67.174 6.957c.363 1.013.859 2.236 1.826 3.203a7.97 7.97 0 0 0 3.203 1.826c.287.124.577.174 6.957.174s6.67-.05 6.957-.174a7.97 7.97 0 0 0 3.203-1.826c.967-.967 1.463-2.19 1.826-3.203.124-.287.174-.577.174-6.957s-.05-6.67-.174-6.957a7.97 7.97 0 0 0-1.826-3.203 7.97 7.97 0 0 0-3.203-1.826C18.67.05 18.38 0 12 0z"/>
        </svg>
      </a>
      <a href="https://web.facebook.com/Patrick.ralalanirina" target="_blank" className="hover:text-blue-600 transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
        </svg>
      </a>
    </div>

  </div>

  {/* Copyright */}

</footer>

    </div>
  );
}
