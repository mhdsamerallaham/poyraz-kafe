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

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Kaydetme başarısız')
      }

      if (data.success) {
        alert('✅ Menü başarıyla kaydedildi!')
        // Reload to get fresh data
        window.location.reload()
      } else {
        alert('⚠️ Kaydetme hatası! Lütfen tekrar deneyin.')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert(`❌ Kaydetme sırasında hata oluştu!\n\n${error.message}`)
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
    <div className="min-h-screen relative bg-pearl">
      {/* Fixed background image - using CSS for better mobile support */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/coffee-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Light overlay for minimal aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/60 via-pearl/50 to-pearl/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Professional Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-sage-200/30 sticky top-0 z-20 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto">
                <div className="relative w-32 h-16 md:w-40 md:h-20">
                  <Image
                    src="/images/logo.png"
                    alt="Poyraz Kafe"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="border-l border-charcoal/10 pl-3 md:pl-6">
                  <h1 className="text-xl md:text-3xl font-light text-charcoal tracking-tight">
                    Yönetim Paneli
                  </h1>
                  <p className="text-xs md:text-sm text-charcoal/50 font-light tracking-wide mt-0.5">
                    Menü & Kategori Yönetimi
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-gradient-to-r from-sage-600 to-sage-700 text-white px-4 md:px-8 py-2.5 md:py-3 rounded-xl hover:from-sage-700 hover:to-sage-800 transition-all duration-300 disabled:opacity-50 font-light text-xs md:text-sm tracking-wide shadow-lg shadow-sage-600/20 flex items-center gap-2 flex-1 md:flex-none justify-center"
                >
                  <span className="text-base md:text-lg">{saving ? '⏳' : '💾'}</span>
                  <span className="hidden sm:inline">{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
                  <span className="sm:hidden">{saving ? 'Kaydet...' : 'Kaydet'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-white/70 backdrop-blur-sm text-charcoal px-4 md:px-6 py-2.5 md:py-3 rounded-xl hover:bg-white transition-all duration-300 font-light text-xs md:text-sm tracking-wide border border-charcoal/10 flex items-center gap-2"
                >
                  <span className="text-base md:text-lg">🚪</span>
                  <span className="hidden sm:inline">Çıkış</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Stats */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-sage-200/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-light text-charcoal/60 tracking-wide mb-1">Toplam Kategori</p>
                  <p className="text-3xl md:text-4xl font-light text-charcoal">{menuData.categories.length}</p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-sage-500 to-sage-600 rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-lg shadow-sage-500/20">
                  📋
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-sand-200/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-light text-charcoal/60 tracking-wide mb-1">Toplam Ürün</p>
                  <p className="text-3xl md:text-4xl font-light text-charcoal">{menuData.products.length}</p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-sand-500 to-sand-600 rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-lg shadow-sand-500/20">
                  🍽️
                </div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-clay/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-light text-charcoal/60 tracking-wide mb-1">Aktif Ürün</p>
                  <p className="text-3xl md:text-4xl font-light text-charcoal">
                    {menuData.products.filter(p => p.available).length}
                  </p>
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-lg shadow-green-500/20">
                  ✅
                </div>
              </div>
            </div>
          </div>

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
        </div>

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
