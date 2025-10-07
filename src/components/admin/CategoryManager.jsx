'use client'

import React, { useState } from 'react'

const FOOD_ICONS = [
  { emoji: '☕', label: 'Kahve' },
  { emoji: '🥤', label: 'İçecek' },
  { emoji: '🍳', label: 'Kahvaltı' },
  { emoji: '🍰', label: 'Tatlı' },
  { emoji: '🍔', label: 'Hamburger' },
  { emoji: '🥗', label: 'Salata' },
  { emoji: '🍕', label: 'Pizza' },
  { emoji: '🍝', label: 'Makarna' },
  { emoji: '🍜', label: 'Çorba' },
  { emoji: '🍲', label: 'Yemek' },
  { emoji: '🥘', label: 'Güveç' },
  { emoji: '🍛', label: 'Pilav' },
  { emoji: '🍱', label: 'Bento' },
  { emoji: '🍣', label: 'Suşi' },
  { emoji: '🍤', label: 'Karides' },
  { emoji: '🥙', label: 'Dürüm' },
  { emoji: '🌮', label: 'Taco' },
  { emoji: '🌯', label: 'Burrito' },
  { emoji: '🥪', label: 'Sandviç' },
  { emoji: '🍞', label: 'Ekmek' },
  { emoji: '🥐', label: 'Kruvasan' },
  { emoji: '🥖', label: 'Baget' },
  { emoji: '🧀', label: 'Peynir' },
  { emoji: '🥓', label: 'Bacon' },
  { emoji: '🥞', label: 'Pankek' },
  { emoji: '🧇', label: 'Waffle' },
  { emoji: '🍖', label: 'Et' },
  { emoji: '🍗', label: 'Tavuk' },
  { emoji: '🥩', label: 'Biftek' },
  { emoji: '🍟', label: 'Patates' },
  { emoji: '🍿', label: 'Mısır' },
  { emoji: '🥟', label: 'Mantı' },
  { emoji: '🍦', label: 'Dondurma' },
  { emoji: '🍧', label: 'Buzlu Dondurma' },
  { emoji: '🍨', label: 'Dondurma Kasesi' },
  { emoji: '🍩', label: 'Donut' },
  { emoji: '🍪', label: 'Kurabiye' },
  { emoji: '🎂', label: 'Pasta' },
  { emoji: '🧁', label: 'Cupcake' },
  { emoji: '🍮', label: 'Puding' },
  { emoji: '🍯', label: 'Bal' },
  { emoji: '🥛', label: 'Süt' },
  { emoji: '🍵', label: 'Çay' },
  { emoji: '🧃', label: 'Meyve Suyu' },
  { emoji: '🧋', label: 'Bubble Tea' },
  { emoji: '🍹', label: 'Kokteyl' },
  { emoji: '🍺', label: 'Bira' },
  { emoji: '🍷', label: 'Şarap' },
  { emoji: '🥂', label: 'Şampanya' },
  { emoji: '🍇', label: 'Üzüm' },
  { emoji: '🍈', label: 'Kavun' },
  { emoji: '🍉', label: 'Karpuz' },
  { emoji: '🍊', label: 'Portakal' },
  { emoji: '🍋', label: 'Limon' },
  { emoji: '🍌', label: 'Muz' },
  { emoji: '🍍', label: 'Ananas' },
  { emoji: '🥭', label: 'Mango' },
  { emoji: '🍎', label: 'Elma' },
  { emoji: '🍏', label: 'Yeşil Elma' },
  { emoji: '🍐', label: 'Armut' },
  { emoji: '🍑', label: 'Şeftali' },
  { emoji: '🍒', label: 'Kiraz' },
  { emoji: '🍓', label: 'Çilek' },
  { emoji: '🥝', label: 'Kivi' },
  { emoji: '🍅', label: 'Domates' },
  { emoji: '🥑', label: 'Avokado' },
  { emoji: '🥕', label: 'Havuç' },
  { emoji: '🌽', label: 'Mısır' },
  { emoji: '🥒', label: 'Salatalık' },
  { emoji: '🥬', label: 'Yeşillik' },
  { emoji: '🥦', label: 'Brokoli' },
  { emoji: '🍄', label: 'Mantar' },
]

export default function CategoryManager({ categories, onUpdate }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ name: '', icon: '', order: 1 })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      const updated = categories.map((cat) =>
        cat.id === editingId ? { ...cat, ...formData } : cat
      )
      onUpdate(updated)
      setEditingId(null)
    } else {
      const newCategory = {
        id: `cat-${Date.now()}`,
        ...formData,
      }
      onUpdate([...categories, newCategory])
      setIsAdding(false)
    }

    setFormData({ name: '', icon: '', order: 1 })
  }

  const handleDelete = (id) => {
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      onUpdate(categories.filter((cat) => cat.id !== id))
    }
  }

  const handleEdit = (category) => {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      icon: category.icon,
      order: category.order,
    })
    setIsAdding(false)
  }

  const moveUp = (index) => {
    if (index === 0) return
    const newCategories = [...categories]
    ;[newCategories[index - 1], newCategories[index]] = [
      newCategories[index],
      newCategories[index - 1],
    ]
    newCategories.forEach((cat, i) => {
      cat.order = i + 1
    })
    onUpdate(newCategories)
  }

  const moveDown = (index) => {
    if (index === categories.length - 1) return
    const newCategories = [...categories]
    ;[newCategories[index], newCategories[index + 1]] = [
      newCategories[index + 1],
      newCategories[index],
    ]
    newCategories.forEach((cat, i) => {
      cat.order = i + 1
    })
    onUpdate(newCategories)
  }

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-sage-200/30 p-4 md:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight mb-1">Kategori Yönetimi</h2>
          <p className="text-xs md:text-sm text-charcoal/50 font-light tracking-wide">Menü kategorilerini düzenleyin</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-sage-600 to-sage-700 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl hover:from-sage-700 hover:to-sage-800 transition-all duration-300 font-light text-xs md:text-sm tracking-wide shadow-lg shadow-sage-600/20 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="text-base md:text-lg">➕</span>
            Yeni Kategori
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-8 p-8 bg-gradient-to-br from-sage-50 to-sand-50 rounded-2xl border border-sage-200/50 shadow-lg">
          <h3 className="text-xl font-light text-charcoal mb-6 tracking-tight">Yeni Kategori Ekle</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
                Kategori Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
                Emoji Icon
              </label>
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
                required
              >
                <option value="">Seçiniz...</option>
                {FOOD_ICONS.map((item, index) => (
                  <option key={index} value={item.emoji}>
                    {item.emoji} {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Sıra</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
                min="1"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-sage-600 to-sage-700 text-white px-8 py-3 rounded-xl hover:from-sage-700 hover:to-sage-800 font-light tracking-wide transition-all shadow-lg shadow-sage-600/20"
            >
              Ekle
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false)
                setFormData({ name: '', icon: '', order: 1 })
              }}
              className="bg-white text-charcoal px-8 py-3 rounded-xl hover:bg-charcoal/5 font-light tracking-wide transition-all border border-charcoal/20"
            >
              İptal
            </button>
          </div>
        </form>
      )}

      {/* Professional Table Layout - Desktop */}
      <div className="hidden md:block bg-white rounded-2xl border border-charcoal/10 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-sage-50 to-sand-50 border-b border-charcoal/10">
              <th className="px-6 py-4 text-left text-sm font-light text-charcoal/70 tracking-wide w-20">Icon</th>
              <th className="px-6 py-4 text-left text-sm font-light text-charcoal/70 tracking-wide">Kategori Adı</th>
              <th className="px-6 py-4 text-left text-sm font-light text-charcoal/70 tracking-wide w-24">Sıra</th>
              <th className="px-6 py-4 text-right text-sm font-light text-charcoal/70 tracking-wide w-80">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category, index) => (
              <React.Fragment key={category.id}>
                <tr className="border-b border-charcoal/5 hover:bg-sage-50/30 transition-all">
                  <td className="px-6 py-4">
                    <span className="text-3xl">{category.icon}</span>
                  </td>
                  <td className="px-6 py-4">
                    <h3 className="font-light text-lg text-charcoal tracking-tight">{category.name}</h3>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-charcoal/60 font-light">{category.order}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="px-4 py-2 bg-gradient-to-r from-charcoal/80 to-charcoal/90 text-white rounded-lg hover:from-charcoal hover:to-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-sm shadow-sm"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === sortedCategories.length - 1}
                        className="px-4 py-2 bg-gradient-to-r from-charcoal/80 to-charcoal/90 text-white rounded-lg hover:from-charcoal hover:to-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-sm shadow-sm"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleEdit(category)}
                        className="px-5 py-2 bg-gradient-to-r from-sand-600 to-sand-700 text-white rounded-lg hover:from-sand-700 hover:to-sand-800 transition-all font-light text-sm shadow-sm"
                      >
                        ✏️ Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-light text-sm shadow-sm"
                      >
                        🗑️ Sil
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Edit form appears right below the category being edited */}
                {editingId === category.id && (
                  <tr>
                    <td colSpan="4" className="px-6 py-6 bg-gradient-to-br from-sage-50 to-sand-50">
                      <form onSubmit={handleSubmit}>
                        <h3 className="text-xl font-light text-charcoal mb-6 tracking-tight">Kategori Düzenle</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div>
                            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
                              Kategori Adı
                            </label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
                              Emoji Icon
                            </label>
                            <select
                              value={formData.icon}
                              onChange={(e) =>
                                setFormData({ ...formData, icon: e.target.value })
                              }
                              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
                              required
                            >
                              <option value="">Seçiniz...</option>
                              {FOOD_ICONS.map((item, idx) => (
                                <option key={idx} value={item.emoji}>
                                  {item.emoji} {item.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Sıra</label>
                            <input
                              type="number"
                              value={formData.order}
                              onChange={(e) =>
                                setFormData({ ...formData, order: parseInt(e.target.value) })
                              }
                              className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
                              min="1"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-sage-600 to-sage-700 text-white px-8 py-3 rounded-xl hover:from-sage-700 hover:to-sage-800 font-light tracking-wide transition-all shadow-lg shadow-sage-600/20"
                          >
                            Güncelle
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(null)
                              setFormData({ name: '', icon: '', order: 1 })
                            }}
                            className="bg-white text-charcoal px-8 py-3 rounded-xl hover:bg-charcoal/5 font-light tracking-wide transition-all border border-charcoal/20"
                          >
                            İptal
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {sortedCategories.map((category, index) => (
          <div key={category.id} className="bg-white rounded-xl border border-charcoal/10 overflow-hidden shadow-sm">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{category.icon}</span>
                <div className="flex-1">
                  <h3 className="font-light text-base text-charcoal tracking-tight">{category.name}</h3>
                  <p className="text-xs text-charcoal/50 font-light">Sıra: {category.order}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="px-3 py-2 bg-gradient-to-r from-charcoal/80 to-charcoal/90 text-white rounded-lg hover:from-charcoal hover:to-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-xs shadow-sm"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === sortedCategories.length - 1}
                  className="px-3 py-2 bg-gradient-to-r from-charcoal/80 to-charcoal/90 text-white rounded-lg hover:from-charcoal hover:to-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-xs shadow-sm"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-sand-600 to-sand-700 text-white rounded-lg hover:from-sand-700 hover:to-sand-800 transition-all font-light text-xs shadow-sm"
                >
                  ✏️ Düzenle
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-light text-xs shadow-sm"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Edit form appears right below the category being edited */}
            {editingId === category.id && (
              <div className="px-4 pb-4 bg-gradient-to-br from-sage-50 to-sand-50">
                <form onSubmit={handleSubmit}>
                  <h3 className="text-lg font-light text-charcoal mb-4 tracking-tight">Kategori Düzenle</h3>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-charcoal/70 font-light text-xs mb-2 tracking-wide">
                        Kategori Adı
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal/70 font-light text-xs mb-2 tracking-wide">
                        Emoji Icon
                      </label>
                      <select
                        value={formData.icon}
                        onChange={(e) =>
                          setFormData({ ...formData, icon: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                        required
                      >
                        <option value="">Seçiniz...</option>
                        {FOOD_ICONS.map((item, idx) => (
                          <option key={idx} value={item.emoji}>
                            {item.emoji} {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-charcoal/70 font-light text-xs mb-2 tracking-wide">Sıra</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) =>
                          setFormData({ ...formData, order: parseInt(e.target.value) })
                        }
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-sage-600 to-sage-700 text-white px-6 py-3 rounded-xl hover:from-sage-700 hover:to-sage-800 font-light tracking-wide transition-all shadow-lg shadow-sage-600/20 text-sm"
                    >
                      Güncelle
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setFormData({ name: '', icon: '', order: 1 })
                      }}
                      className="bg-white text-charcoal px-6 py-3 rounded-xl hover:bg-charcoal/5 font-light tracking-wide transition-all border border-charcoal/20 text-sm"
                    >
                      İptal
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
