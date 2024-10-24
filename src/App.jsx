import React, { useState } from 'react'
import { Loader2, Sparkles, MessageCircle, Globe } from 'lucide-react'

function App() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const req = await fetch('https://prompt-enchance-back.vercel.app/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      })
      const data = await req.json()
      setPrompt(data.enchancePrompt)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <div className="flex justify-center mb-6">
          <a href="https://cordix-community.com/"><img 
            src="/logo.png" 
            alt="BalanceTaBlague Logo" 
            className="w-24 h-24 object-contain"
          /></a>
        </div>
        <h1 className="text-4xl font-extrabold mb-6 text-center text-white">
          Bienvenue sur{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
            BalanceTaBlague
          </span>
        </h1>
        <div className="mb-6 relative">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 border border-purple-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-800 bg-white bg-opacity-80 placeholder-gray-500 resize-none transition duration-300 ease-in-out"
            placeholder="Entre ton prompt ici..." 
            rows={prompt.length > 500 ? 20 : Math.min(20, Math.max(3, Math.ceil(prompt.length / 25)))}
            disabled={isLoading}
          />
          <div className="absolute top-2 right-2 text-xs text-gray-400">
            {prompt.length}/500
          </div>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles className="mr-2" size={20} />
                Générer
              </>
            )}
          </button>
        </div>
      </div>
      <footer className="mt-8 text-center text-white text-sm opacity-70">
        <div className="mb-2">
          © 2024 BalanceTaBlague. Tous droits réservés.
        </div>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://discord.gg/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-pink-300 transition duration-300"
          >
            <MessageCircle size={24} />
            <span className="sr-only">Rejoignez notre Discord</span>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            <Globe size={24} />
            <span className="sr-only">Visitez notre site web</span>
          </a>
        </div>
      </footer>
    </main>
  )
}

export default App