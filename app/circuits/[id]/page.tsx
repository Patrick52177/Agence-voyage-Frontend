'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa'; // icônes hamburger
/* =====================
   TYPES
===================== */
interface CircuitApi {
  id: number;
  title: string;
  description: string;
  duration: string;
  destination: string;
  image: string;
  theme: string;
  bestPeriod?: string;
  travelerType?: string;
  itinerary?: string | null;
  included?: string | null;
  notIncluded?: string | null;
}

interface Circuit {
  id: number;
  title: string;
  description: string;
  duration: string;
  destination: string;
  image: string;
  theme: string;
  bestPeriod?: string;
  travelerType?: string;
  itinerary: string[];
  included: string[];
  notIncluded: string[];
}

/* =====================
   UTILS
===================== */
const textToArray = (value?: string | null): string[] => {
  if (!value) return [];
  return value
    .split('\n')
    .map(v => v.trim())
    .filter(Boolean);
};

/* =====================
   PAGE
===================== */
export default function CircuitDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [circuit, setCircuit] = useState<Circuit | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeFilter, setThemeFilter] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  useEffect(() => {
    const fetchCircuit = async () => {
      try {
        const res = await fetch(`http://localhost:3000/circuits/${id}`);
        if (!res.ok) throw new Error('Erreur API');

        const data: CircuitApi = await res.json();

        const normalizedCircuit: Circuit = {
          id: data.id,
          title: data.title,
          description: data.description,
          duration: data.duration,
          destination: data.destination,
          image: data.image,
          theme: data.theme,
          bestPeriod: data.bestPeriod,
          travelerType: data.travelerType,
          itinerary: textToArray(data.itinerary),
          included: textToArray(data.included),
          notIncluded: textToArray(data.notIncluded),
        };

        setCircuit(normalizedCircuit);
      } catch (error) {
        console.error(error);
        setCircuit(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCircuit();
  }, [id]);

  if (loading) return <p className="text-center pt-40 text-lg">Chargement...</p>;
  if (!circuit) return <p className="text-center pt-40 text-lg">Circuit introuvable</p>;

  return (
    <div className="min-h-screen bg-page text-variable">
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
            style={{ filter: 'drop-shadow(0 0 2px rgba(5, 165, 177, 0.6))' }} // ⚡ ajoute contraste si logo clair
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
             <button className="hover:text-blue-500 transition" onClick={() => router.push('/Blog')}>
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

      {/* ===== HERO IMAGE ===== */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center hero-zoom"
          style={{ backgroundImage: `url(${circuit.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{circuit.title}</h1>
            <p className="text-white/90 text-lg md:text-xl">
              {circuit.destination} • {circuit.duration}
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="-mt-24 relative z-20 max-w-6xl mx-auto px-4 pb-24">
        <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 animate-fadeIn">

          {/* ===== INFOS CLÉS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10 text-center">
            <div className="info-box">
              <p className="info-label">Destination</p>
              <p className="info-value">{circuit.destination}</p>
            </div>
            <div className="info-box">
              <p className="info-label">Durée</p>
              <p className="info-value">{circuit.duration}</p>
            </div>
            <div className="info-box">
              <p className="info-label">Thème</p>
              <p className="info-price">{circuit.theme}</p>
            </div>
            <div className="info-box">
              <p className="info-label">Meilleure période</p>
              <p className="info-value">{circuit.bestPeriod || '—'}</p>
            </div>
            <div className="info-box">
              <p className="info-label">Type de voyageurs</p>
              <p className="info-value">{circuit.travelerType || '—'}</p>
            </div>
          </div>

          {/* ===== DESCRIPTION ===== */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Présentation générale</h2>
            <p className="text-lg leading-relaxed opacity-90">{circuit.description}</p>
          </div>

          {/* ===== ITINÉRAIRE ===== */}
          {circuit.itinerary.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">Itinéraire jour par jour</h2>
              <ul className="list-disc list-inside space-y-2 max-w-3xl mx-auto">
                {circuit.itinerary.map((day, i) => (
                  <li key={i}>{day}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ===== INCLUS / NON INCLUS ===== */}
          <section className="mb-12 grid md:grid-cols-2 gap-6">
            {circuit.included.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Inclus</h3>
                <ul className="list-disc list-inside space-y-1">
                  {circuit.included.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {circuit.notIncluded.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Non inclus</h3>
                <ul className="list-disc list-inside space-y-1">
                  {circuit.notIncluded.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ===== CTA ===== */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="btn-primary w-full md:w-auto" onClick={() => router.push('/test-leads')}>
              Demander un devis
            </button>
            <a
              href="https://wa.me/261XXXXXXXXX"
              target="_blank"
              className="btn-secondary w-full md:w-auto text-center"
            >
              Discuter sur WhatsApp
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
