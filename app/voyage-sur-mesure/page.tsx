'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '@/utils/countries';

export default function VoyageSurMesurePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    country: 'Madagascar',
    countryCode: 'MG',
    phone: '+261',
    message: '',
    // 👇 champs BACKEND obligatoires
    startDate: 'NON DEFINI',
    duration: 'NON DEFINI',
    budget: 'NON DEFINI',
    theme: 'SUR MESURE',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
 const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find(c => c.code === e.target.value);
    if (!selected) return;

    setForm(prev => ({
      ...prev,
      country: selected.name,
      countryCode: selected.code,
      phone: selected.dial,
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  // ✅ payload PROPRE (backend only)
  const payload = {
    fullName: form.fullName,
    email: form.email,
    phone: form.phone,
    country: form.country,
    message: form.message,
    startDate: form.startDate,
    duration: form.duration,
    budget: form.budget,
    theme: form.theme,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message?.[0] || 'Erreur lors de l’envoi');
    }

    setSuccess('Votre demande a été envoyée avec succès ✅');
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-page pt-28">

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
      {/* HERO */}
      <section className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h1 className="text-4xl font-bold mb-3">Voyage sur mesure à Madagascar</h1>
        <p className="opacity-80">
          Un expert local vous répond sous 24h
        </p>
      </section>

      {/* FORM */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 bg-card rounded-3xl shadow-xl overflow-hidden">

        <form onSubmit={handleSubmit} className="p-8 space-y-5">

          <input
            name="fullName"
            placeholder="Nom complet"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Adresse email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <div className="flex gap-2 items-center">
            <select
  value={form.countryCode}
  onChange={handleCountryChange}
  className="p-3 bg-blue border rounded-lg"
>
  {countries.map(c => (
    <option key={c.code} value={c.code} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
      {c.name}
    </option>
  ))}
</select>

            <ReactCountryFlag
              svg
              countryCode={form.countryCode}
              style={{ width: '2em', height: '2em' }}
            />
          </div>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <textarea
            name="message"
            placeholder="Dates, budget, nombre de personnes, envies..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-lg"
            required
          />

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Envoi...' : 'Recevoir mon itinéraire personnalisé'}
          </button>
        </form>

        {/* IMAGE */}
        <div
          className="hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('/images/madagascar.jpg')" }}
        >
          <div className="h-full w-full bg-black/40 flex items-center justify-center">
            <p className="text-white text-xl font-semibold text-center">
              🌍 Expertise locale • Voyage sur mesure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
