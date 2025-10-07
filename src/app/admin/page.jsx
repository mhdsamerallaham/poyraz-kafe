'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminLogin from '@/components/admin/AdminLogin'
import CategoryManager from '@/components/admin/CategoryManager'
import ProductManager from '@/components/admin/ProductManager'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuData, setMenuData] = useState({ categories: [], products: [] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)

    fetch('/data/menu.json')
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading menu:', error)
        setLoading(false)
      })
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    setIsLoggedIn(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      })

      const data = await response.json()
      if (data.success) {
        alert('Menü başarıyla kaydedildi!')
      } else {
        alert('Kaydetme hatası!')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Kaydetme sırasında hata oluştu!')
    } finally {
      setSaving(false)
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(menuData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `menu-backup-${Date.now()}.json`
    link.click()
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result)
        setMenuData(imported)
        alert('JSON başarıyla yüklendi!')
      } catch (error) {
        alert('Geçersiz JSON dosyası!')
      }
    }
    reader.readAsText(file)
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl">
        <p className="text-xl text-charcoal/60">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
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
        {/* Light overlay for minimal aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/60 via-pearl/50 to-pearl/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with logo */}
        <header className="bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-20 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-16">
                <Image
                  src="/images/logo.png"
                  alt="Poyraz Kafe"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-light text-charcoal tracking-tight">
                  Admin Panel
                </h1>
                <p className="text-sm text-charcoal/50 font-light">Menü Yönetim Sistemi</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-sage-600 text-white px-5 py-2.5 rounded-full hover:bg-sage-700 transition-all duration-200 disabled:opacity-50 font-light text-sm tracking-wide"
              >
                {saving ? 'Kaydediliyor...' : '💾 Kaydet'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2.5 rounded-full hover:bg-red-600 transition-all duration-200 font-light text-sm tracking-wide"
              >
                🚪 Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <CategoryManager
            categories={menuData.categories}
            onUpdate={(updated) =>
              setMenuData({ ...menuData, categories: updated })
            }
          />

          <ProductManager
            products={menuData.products}
            categories={menuData.categories}
            onUpdate={(updated) =>
              setMenuData({ ...menuData, products: updated })
            }
          />
        </div>
      </main>

        <footer className="bg-white/50 backdrop-blur-lg border-t border-white/20 mt-16 py-6">
          <div className="max-w-7xl mx-auto px-6 text-center text-charcoal/40">
            <p className="text-xs font-light tracking-wide">
              © 2025 Poyraz Kafe Admin Panel
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
