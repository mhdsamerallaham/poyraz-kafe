'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (username === 'admin' && password === 'poyraz2025') {
      localStorage.setItem('adminLoggedIn', 'true')
      onLogin()
    } else {
      setError('Kullanıcı adı veya şifre hatalı!')
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Fixed background image */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/coffee-hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/70 via-pearl/60 to-pearl/70"></div>
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl border border-sage-200/30 p-12 w-full max-w-md shadow-2xl">
        <div className="text-center mb-10">
          <div className="relative w-56 h-28 mx-auto mb-8">
            <Image
              src="/images/logo.png"
              alt="Poyraz Kafe"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-4xl font-light text-charcoal tracking-tight mb-2">Yönetim Paneli</h2>
          <p className="text-charcoal/50 text-sm font-light tracking-wide">Giriş yapın ve menüyü yönetin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light transition-all bg-white shadow-sm"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light transition-all bg-white shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-sm font-light flex items-center gap-3">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sage-600 to-sage-700 text-white py-4 rounded-xl font-light hover:from-sage-700 hover:to-sage-800 transition-all tracking-wide shadow-lg shadow-sage-600/30"
          >
            🔐 Giriş Yap
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-charcoal/10">
          <p className="text-xs text-charcoal/40 text-center font-light tracking-wide">
            Varsayılan: <span className="text-charcoal/60">admin / poyraz2025</span>
          </p>
        </div>
      </div>
    </div>
  )
}
