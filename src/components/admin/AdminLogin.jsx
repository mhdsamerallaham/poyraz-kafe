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
    <div className="min-h-screen bg-pearl flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl soft-shadow minimal-border p-12 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="relative w-48 h-24 mx-auto mb-6">
            <Image
              src="/images/logo.png"
              alt="Poyraz Kafe"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-3xl font-light text-charcoal tracking-tight mb-2">Admin Panel</h2>
          <p className="text-charcoal/50 text-sm font-light tracking-wide">Menü Yönetim Sistemi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light transition-all"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-5 py-3 rounded-xl text-sm font-light">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-charcoal text-white py-3.5 rounded-xl font-light hover:bg-charcoal/90 transition-all tracking-wide"
          >
            Giriş Yap
          </button>
        </form>

        <p className="text-xs text-charcoal/30 text-center mt-8 font-light tracking-wide">
          Varsayılan: admin / poyraz2025
        </p>
      </div>
    </div>
  )
}
