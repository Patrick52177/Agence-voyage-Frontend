'use client';
import { articles } from './article';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa'; // icônes hamburger

export default function BlogPage() {
    const router = useRouter();
 
      const [loading, setLoading] = useState(false);
      const [regionFilter, setRegionFilter] = useState('');
      const [themeFilter, setThemeFilter] = useState('');
        const [mobileOpen, setMobileOpen] = useState(false);
    
      const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
    
  
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


        <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Infos Voyage / Blog</h1>

        {articles.map(article => (
          <article key={article.id} className="mb-8 border-b pb-4">
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-2">{article.summary}</p>
            <p className="text-gray-600 whitespace-pre-line">{article.content}</p>
          </article>
        ))}
      </main>
    </div>
  );
}
