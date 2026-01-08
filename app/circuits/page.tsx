'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa'; // icônes hamburger

interface Circuit {
  id: number;
  title: string;
  description: string;
  duration: string;
  destination: string;
  image: string;
  region: string;
  theme: string;
}

export default function CircuitsPage() {
  const router = useRouter();
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(false);
  const [regionFilter, setRegionFilter] = useState('');
  const [themeFilter, setThemeFilter] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const fetchCircuits = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (regionFilter) params.append('region', regionFilter);
      if (themeFilter) params.append('theme', themeFilter);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/circuits?${params.toString()}`);
      if (!res.ok) throw new Error('Erreur API');

      const data = await res.json();
      setCircuits(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setCircuits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCircuits();
  }, []);

  const regions = ['Nord', 'Sud', 'Est', 'Ouest'];
  const themes = ['Nature', 'Plage', 'Lune de miel', 'Aventure'];

  return (
    <div className="bg-page text-foreground font-sans min-h-screen px-4 md:px-8 pt-28">
  <nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow z-50">
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
            style={{ filter: 'drop-shadow(0 0 2px rgba(9, 31, 9, 0.6))' }} // ⚡ ajoute contraste si logo clair
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
      <a
            href="https://wa.me/261XXXXXXXXX"
            target="_blank"
             rel="noopener noreferrer"
              className="whatsapp-float"
         >
  <img src="/icons/whatsapp.svg" alt="WhatsApp" />
</a>


      <h2 className="text-3xl font-bold text-center mb-10 animate-fadeIn">
        Tous nos circuits
      </h2>

      {/* ===== FILTRES ===== */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 animate-fadeIn">
        <select
          className="p-3 rounded-lg border border-gray-300"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option className='text-black' value="">Toutes les régions</option>
          {regions.map(r => (
            <option className='text-black' key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          className="p-3 rounded-lg border border-gray-300"
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value)}
        >
          <option className='text-black' value="">Tous les thèmes</option>
          {themes.map(t => (
            <option className='text-black' key={t} value={t}>{t}</option>
          ))}
        </select>

        <button className="btn-primary" onClick={fetchCircuits}>
          Rechercher
        </button>
      </div>

      {/* ===== LISTE ===== */}
      {loading ? (
        <p className="text-center text-lg">Chargement...</p>
      ) : circuits.length === 0 ? (
        <p className="text-center text-lg">Aucun circuit disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {circuits.map(c => (
            <div
              key={c.id}
              className="card-hover p-6 rounded-2xl shadow-lg cursor-pointer animate-fadeIn"
              onClick={() => router.push(`/circuits/${c.id}`)}
            >
              <div className="relative w-full pb-[56.25%] mb-4 rounded-xl overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-1">{c.title}</h3>
              <p className="text-gray-600 mb-1">{c.duration} • {c.destination}</p>
              <p className="text-sm font-medium text-primary">{c.theme}</p>
              <p className="opacity-80 line-clamp-3">{c.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
