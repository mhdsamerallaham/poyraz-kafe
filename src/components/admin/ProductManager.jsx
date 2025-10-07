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
    <form onSubmit={onSubmit} className="p-6 bg-sage-50 rounded-2xl border-2 border-sage-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
            Ürün Adı
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light"
            required
          />
        </div>
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
            Kategori
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light bg-white"
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
          <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">Fiyat (₺)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">Sıra</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light"
            min="1"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">Açıklama</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light"
          rows="3"
          required
        />
      </div>
      <div className="mb-6">
        <ImageUploader
          currentImage={formData.image}
          onUpload={(imagePath) => setFormData({ ...formData, image: imagePath })}
        />
      </div>
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.available}
            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
            className="w-5 h-5 rounded border-charcoal/20 text-sage-600 focus:ring-sage-400"
          />
          <span className="text-charcoal/70 font-light text-sm tracking-wide">Stokta mevcut</span>
        </label>
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
          onClick={onCancel}
          className="bg-charcoal/10 text-charcoal px-6 py-3 rounded-xl hover:bg-charcoal/20 font-light tracking-wide transition-all"
        >
          İptal
        </button>
      </div>
    </form>
  )

  return (
    <div className="bg-white rounded-2xl soft-shadow minimal-border p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight">Ürün Yönetimi</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-sage-600 text-white px-5 py-2.5 rounded-full hover:bg-sage-700 transition-all font-light text-sm tracking-wide w-full sm:w-auto"
          >
            + Yeni Ürün
          </button>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-charcoal/70 font-light text-sm mb-2 tracking-wide">
          Kategoriye Göre Filtrele
        </label>
        <select
          value={filterCategory || ''}
          onChange={(e) => setFilterCategory(e.target.value || null)}
          className="w-full md:w-64 px-4 py-3 border border-charcoal/10 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none font-light bg-white"
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

      <div className="space-y-3">
        {sortedProducts.map((product, index) => {
          const category = categories.find((c) => c.id === product.categoryId)
          return (
            <div key={product.id}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-sand-50 rounded-2xl hover:bg-sand-100 transition-all gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-sand-100 flex-shrink-0">
                    {product.image ? (
                      product.image.startsWith('http') ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl opacity-20">
                        🍽️
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-light text-lg text-charcoal tracking-tight mb-1">{product.name}</h3>
                    <p className="text-sm text-charcoal/60 font-light mb-2 line-clamp-2">{product.description}</p>
                    <p className="text-xs text-charcoal/40 font-light">
                      {category?.icon} {category?.name} | {product.price} ₺ | Sıra: {product.order}
                    </p>
                    {!product.available && (
                      <span className="inline-block mt-1 text-xs text-red-600 font-light bg-red-50 px-2 py-1 rounded-full">
                        Stokta Yok
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <button
                    onClick={() => moveUp(index, sortedProducts)}
                    disabled={index === 0}
                    className="px-4 py-2 bg-charcoal/80 text-white rounded-lg hover:bg-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-sm flex-1 md:flex-none"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(index, sortedProducts)}
                    disabled={index === sortedProducts.length - 1}
                    className="px-4 py-2 bg-charcoal/80 text-white rounded-lg hover:bg-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-all font-light text-sm flex-1 md:flex-none"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-sand-600 text-white rounded-lg hover:bg-sand-700 transition-all font-light text-sm flex-1 md:flex-none"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-light text-sm flex-1 md:flex-none"
                  >
                    Sil
                  </button>
                </div>
              </div>

              {/* Edit form appears right below the product being edited */}
              {editingId === product.id && (
                <div className="mt-3">
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
        <p className="text-center text-charcoal/40 py-12 font-light">
          {filterCategory ? 'Bu kategoride ürün yok.' : 'Henüz ürün eklenmemiş.'}
        </p>
      )}
    </div>
  )
}
