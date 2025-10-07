'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageUploader from './ImageUploader'

export default function ProductManager({ products, categories, onUpdate }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filterCategory, setFilterCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: '',
    image: '',
    available: true,
    order: 1,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      const updated = products.map((prod) =>
        prod.id === editingId ? { ...prod, ...formData } : prod
      )
      onUpdate(updated)
      setEditingId(null)
    } else {
      const newProduct = {
        id: `prod-${Date.now()}`,
        ...formData,
      }
      onUpdate([...products, newProduct])
      setIsAdding(false)
    }

    setFormData({
      name: '',
      description: '',
      price: 0,
      categoryId: '',
      image: '',
      available: true,
      order: 1,
    })
  }

  const handleDelete = (id) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      onUpdate(products.filter((prod) => prod.id !== id))
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setFormData({ ...product })
    setIsAdding(false)
  }

  const moveUp = (index, filtered) => {
    if (index === 0) return
    const newProducts = [...filtered]
    ;[newProducts[index - 1], newProducts[index]] = [
      newProducts[index],
      newProducts[index - 1],
    ]
    newProducts.forEach((prod, i) => {
      prod.order = i + 1
    })

    const otherProducts = products.filter(
      (p) => !filtered.find((f) => f.id === p.id)
    )
    onUpdate([...otherProducts, ...newProducts])
  }

  const moveDown = (index, filtered) => {
    if (index === filtered.length - 1) return
    const newProducts = [...filtered]
    ;[newProducts[index], newProducts[index + 1]] = [
      newProducts[index + 1],
      newProducts[index],
    ]
    newProducts.forEach((prod, i) => {
      prod.order = i + 1
    })

    const otherProducts = products.filter(
      (p) => !filtered.find((f) => f.id === p.id)
    )
    onUpdate([...otherProducts, ...newProducts])
  }

  const filteredProducts = filterCategory
    ? products.filter((p) => p.categoryId === filterCategory)
    : products

  const sortedProducts = [...filteredProducts].sort((a, b) => a.order - b.order)

  const ProductForm = ({ onSubmit, onCancel }) => (
    <form onSubmit={onSubmit} className="p-8 bg-gradient-to-br from-sand-50 to-sage-50 rounded-2xl border border-sand-200/50 shadow-lg">
      <h3 className="text-xl font-light text-charcoal mb-6 tracking-tight">
        {editingId ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
            Ürün Adı
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">
            Kategori
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
            required
          >
            <option value="">Seçiniz...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Fiyat (₺)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Sıra</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
            min="1"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-charcoal/70 font-light text-sm mb-3 tracking-wide">Açıklama</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-5 py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm"
          rows="3"
          required
          autoComplete="off"
        />
      </div>
      <div className="mb-6">
        <ImageUploader
          currentImage={formData.image}
          onUpload={(imagePath) => setFormData({ ...formData, image: imagePath })}
        />
      </div>
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer p-4 bg-white rounded-xl border border-charcoal/10 hover:border-sand-500/30 transition-all">
          <input
            type="checkbox"
            checked={formData.available}
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            className="w-5 h-5 rounded border-charcoal/20 text-sand-600 focus:ring-sand-400"
          />
          <span className="text-charcoal/70 font-light text-sm tracking-wide">Stokta mevcut</span>
        </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="bg-gradient-to-r from-sand-600 to-sand-700 text-white px-8 py-3 rounded-xl hover:from-sand-700 hover:to-sand-800 font-light tracking-wide transition-all shadow-lg shadow-sand-600/20"
        >
          {editingId ? 'Güncelle' : 'Ekle'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white text-charcoal px-8 py-3 rounded-xl hover:bg-charcoal/5 font-light tracking-wide transition-all border border-charcoal/20"
        >
          İptal
        </button>
      </div>
    </form>
  )

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-sand-200/30 p-4 md:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight mb-1">Ürün Yönetimi</h2>
          <p className="text-xs md:text-sm text-charcoal/50 font-light tracking-wide">Menü ürünlerini düzenleyin</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-sand-600 to-sand-700 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl hover:from-sand-700 hover:to-sand-800 transition-all duration-300 font-light text-xs md:text-sm tracking-wide shadow-lg shadow-sand-600/20 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <span className="text-base md:text-lg">➕</span>
            Yeni Ürün
          </button>
        )}
      </div>

      <div className="mb-6 md:mb-8">
        <label className="block text-charcoal/70 font-light text-xs md:text-sm mb-2 md:mb-3 tracking-wide">
          Kategoriye Göre Filtrele
        </label>
        <select
          value={filterCategory || ''}
          onChange={(e) => setFilterCategory(e.target.value || null)}
          className="w-full md:w-80 px-4 md:px-5 py-3 md:py-3.5 border border-charcoal/20 rounded-xl focus:ring-2 focus:ring-sand-500 focus:border-transparent outline-none font-light bg-white shadow-sm text-sm"
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      {isAdding && (
        <div className="mb-8">
          <ProductForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsAdding(false)
              setFormData({
                name: '',
                description: '',
                price: 0,
                categoryId: '',
                image: '',
                available: true,
                order: 1,
              })
            }}
          />
        </div>
      )}

      {/* Professional Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        {sortedProducts.map((product, index) => {
          const category = categories.find((c) => c.id === product.categoryId)
          return (
            <div key={product.id} className="bg-white rounded-xl md:rounded-2xl border border-charcoal/10 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-5 mb-3 md:mb-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden bg-sand-100 flex-shrink-0 shadow-sm">
                    {product.image ? (
                      product.image.startsWith('http') ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 80px, 96px"
                        />
                      ) : (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl md:text-4xl opacity-20">
                        🍽️
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-light text-base md:text-xl text-charcoal tracking-tight mb-1 md:mb-2">{product.name}</h3>
                    <p className="text-xs md:text-sm text-charcoal/60 font-light mb-2 md:mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                      <span className="text-xs md:text-sm text-charcoal/50 font-light bg-sage-50 px-2 md:px-3 py-1 rounded-full">
                        {category?.icon} {category?.name}
                      </span>
                      <span className="text-base md:text-lg font-light text-charcoal">{product.price} ₺</span>
                      <span className="text-xs text-charcoal/40 font-light">Sıra: {product.order}</span>
                    </div>
                    {!product.available && (
                      <span className="inline-block mt-2 text-xs text-red-600 font-light bg-red-50 px-2 md:px-3 py-1 rounded-full">
                        ⚠️ Stokta Yok
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-3 md:pt-4 border-t border-charcoal/5">
                  <button
                    onClick={() => moveUp(index, sortedProducts)}
                    disabled={index === 0}
                    className="px-3 md:px-4 py-2 bg-gradient-to-r from-charcoal/80 to-charcoal/90 text-white rounded-lg hover:from-charcoal hover:to-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-xs md:text-sm shadow-sm"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(index, sortedProducts)}
                    disabled={index === sortedProducts.length - 1}
                    className="px-3 md:px-4 py-2 bg-gradient-to-r from-charcoal/80 to-charcoal/90 text-white rounded-lg hover:from-charcoal hover:to-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-xs md:text-sm shadow-sm"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 px-4 md:px-5 py-2 bg-gradient-to-r from-sand-600 to-sand-700 text-white rounded-lg hover:from-sand-700 hover:to-sand-800 transition-all font-light text-xs md:text-sm shadow-sm"
                  >
                    ✏️ Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 md:px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-light text-xs md:text-sm shadow-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Edit form appears right below the product being edited */}
              {editingId === product.id && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <ProductForm
                    onSubmit={handleSubmit}
                    onCancel={() => {
                      setEditingId(null)
                      setFormData({
                        name: '',
                        description: '',
                        price: 0,
                        categoryId: '',
                        image: '',
                        available: true,
                        order: 1,
                      })
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {sortedProducts.length === 0 && (
        <p className="text-center text-charcoal/40 py-8 md:py-12 font-light text-sm">
          {filterCategory ? 'Bu kategoride ürün yok.' : 'Henüz ürün eklenmemiş.'}
        </p>
      )}
    </div>
  )
}
