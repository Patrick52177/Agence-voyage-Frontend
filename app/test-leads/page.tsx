'use client';
import { useState } from 'react';

export default function LeadsForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('http://localhost:3000/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      setStatus('success');
      setMessage('Votre demande a été envoyée avec succès !');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center">
      
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-800 dark:text-white animate-fadeIn">
        Demander un devis
      </h1>

      <form
        className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col gap-4 animate-fadeIn"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Pays"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition"
          required
        />
        <textarea
          name="message"
          placeholder="Votre message ou détails du voyage"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition resize-none"
          rows={5}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition transform hover:scale-105"
        >
          Envoyer
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-semibold ${
              status === 'success' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
