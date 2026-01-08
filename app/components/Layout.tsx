'use client';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Navbar sticky */}
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => scrollToSection('hero')}>MadaBlue</h1>
          <div className="flex gap-4">
            <button className="hover:text-blue-600 transition" onClick={() => scrollToSection('hero')}>Accueil</button>
            <button className="hover:text-blue-600 transition" onClick={() => scrollToSection('circuits')}>Circuits</button>
            <button className="hover:text-blue-600 transition" onClick={() => scrollToSection('leads')}>Demande de devis</button>
            <button className="hover:text-blue-600 transition" onClick={() => scrollToSection('contact')}>Contact</button>
          </div>
        </div>
      </nav>

      {/* Contenu de la page */}
      <div className="pt-20">{children}</div>
    </div>
  );
}
