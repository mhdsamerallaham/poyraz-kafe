'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/customer/Header'
import CategoryList from '@/components/customer/CategoryList'
import ProductCard from '@/components/customer/ProductCard'
import Footer from '@/components/shared/Footer'

export default function Home() {
  const [menuData, setMenuData] = useState({ categories: [], products: [] })
  const [activeCategory, setActiveCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

  const filteredProducts = activeCategory
    ? menuData.products.filter((p) => p.categoryId === activeCategory)
    : menuData.products

  const sortedProducts = [...filteredProducts].sort((a, b) => a.order - b.order)
  const sortedCategories = [...menuData.categories].sort((a, b) => a.order - b.order)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pearl">
        <div className="text-center">
          <div className="text-6xl mb-4">☕</div>
          <p className="text-xl text-charcoal/60">Menü yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col relative">
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
        <Header />
        <CategoryList
          categories={sortedCategories}
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />
        <main className="flex-grow max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 w-full">
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-4 lg:gap-6 auto-rows-[280px]">
            {sortedProducts.map((product, index) => {
              // Bento grid pattern - different sizes for visual interest
              const patterns = [
                'col-span-12 md:col-span-6 lg:col-span-4 row-span-1', // normal
                'col-span-12 md:col-span-6 lg:col-span-8 row-span-1', // wide
                'col-span-12 md:col-span-6 lg:col-span-4 row-span-2', // tall
                'col-span-12 md:col-span-6 lg:col-span-4 row-span-1', // normal
                'col-span-12 md:col-span-12 lg:col-span-8 row-span-1', // extra wide
                'col-span-12 md:col-span-6 lg:col-span-4 row-span-1', // normal
              ]

              const gridClass = patterns[index % patterns.length]

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  gridClass={gridClass}
                />
              )
            })}
          </div>
          {sortedProducts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-xl text-charcoal/40">
                Bu kategoride ürün bulunmuyor.
              </p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  )
}
