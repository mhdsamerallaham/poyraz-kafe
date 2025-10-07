'use client'

import { useState } from 'react'

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
    <div className="bg-white rounded-2xl soft-shadow minimal-border p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight">Kategori Yönetimi</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-sage-600 text-white px-5 py-2.5 rounded-full hover:bg-sage-700 transition-all font-light text-sm tracking-wide w-full sm:w-auto"
          >
            + Yeni Kategori
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-sand-50 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
                Kategori Adı
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light"
                required
              />
            </div>
            <div>
              <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
                Emoji Icon
              </label>
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light bg-white"
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
              <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">Sıra</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light"
                min="1"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="bg-sage-600 text-white px-6 py-3 rounded-xl hover:bg-sage-700 font-light tracking-wide transition-all"
            >
              {editingId ? 'Güncelle' : 'Ekle'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false)
                setEditingId(null)
                setFormData({ name: '', icon: '', order: 1 })
              }}
              className="bg-charcoal/10 text-charcoal px-6 py-3 rounded-xl hover:bg-charcoal/20 font-light tracking-wide transition-all"
            >
              İptal
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {sortedCategories.map((category, index) => (
          <div key={category.id}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-sand-50 rounded-2xl hover:bg-sand-100 transition-all gap-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-4xl">{category.icon}</span>
                <div>
                  <h3 className="font-light text-lg md:text-xl text-charcoal tracking-tight">{category.name}</h3>
                  <p className="text-sm text-charcoal/40 font-light">Sıra: {category.order}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="px-4 py-2 bg-charcoal/80 text-white rounded-lg hover:bg-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-sm flex-1 sm:flex-none"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === sortedCategories.length - 1}
                  className="px-4 py-2 bg-charcoal/80 text-white rounded-lg hover:bg-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-sm flex-1 sm:flex-none"
                >
                  ↓
                </button>
                <button
                  onClick={() => handleEdit(category)}
                  className="px-4 py-2 bg-sand-600 text-white rounded-lg hover:bg-sand-700 transition-all font-light text-sm flex-1 sm:flex-none"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-light text-sm flex-1 sm:flex-none"
                >
                  Sil
                </button>
              </div>
            </div>

            {/* Edit form appears right below the category being edited */}
            {editingId === category.id && (
              <form onSubmit={handleSubmit} className="mt-3 p-6 bg-sage-50 rounded-2xl border-2 border-sage-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  <div>
                    <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
                      Kategori Adı
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
                      Emoji Icon
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light bg-white"
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
                    <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">Sıra</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({ ...formData, order: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="bg-sage-600 text-white px-6 py-3 rounded-xl hover:bg-sage-700 font-light tracking-wide transition-all"
                  >
                    Güncelle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null)
                      setFormData({ name: '', icon: '', order: 1 })
                    }}
                    className="bg-charcoal/10 text-charcoal px-6 py-3 rounded-xl hover:bg-charcoal/20 font-light tracking-wide transition-all"
                  >
                    İptal
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
