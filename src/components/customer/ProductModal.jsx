'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ProductModal({ product, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    setTimeout(() => setIsVisible(true), 10)

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  if (!product) return null

  return (
    <div
      className={`fixed inset-0 bg-coffee-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-gradient-to-br from-cream to-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-0 rotate-1'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-80 md:h-[32rem] w-full bg-gradient-to-br from-latte/50 to-coffee-100/50 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-coffee-200/20 blur-3xl"></div>
              <div className="relative text-9xl opacity-30">🍽️</div>
            </div>
          )}

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/80 via-coffee-900/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-coffee-500/10"></div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl hover:bg-white hover:scale-110 hover:rotate-90 transition-all duration-300 group z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-coffee-700 group-hover:text-coffee-900 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {!product.available && (
            <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl backdrop-blur-sm z-10">
              Stokta Yok
            </div>
          )}

          {/* Product name overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-3">
              {product.name}
            </h2>
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-mint to-transparent rounded-full"></div>
              <div className="h-1 w-8 bg-mint/50 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 overflow-y-auto max-h-[calc(90vh-32rem)]">
          {/* Description */}
          <p className="text-coffee-700 text-lg md:text-xl mb-10 leading-relaxed">
            {product.description}
          </p>

          {/* Price and CTA section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t-2 border-coffee-100">
            <div>
              <p className="text-coffee-500 text-sm font-medium mb-2">Fiyat</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-7xl font-black bg-gradient-to-r from-coffee-600 via-coffee-700 to-coffee-800 bg-clip-text text-transparent">
                  {product.price}
                </span>
                <span className="text-3xl font-bold text-coffee-400">₺</span>
              </div>
            </div>

            {product.available && (
              <button className="group bg-gradient-to-r from-coffee-600 via-coffee-700 to-coffee-800 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-coffee-600/50 transition-all duration-300 hover:scale-105 flex items-center gap-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Sipariş Ver</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
          </div>

          {/* Additional info */}
          <div className="mt-8 p-6 bg-mint/10 rounded-2xl border border-mint/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-mint/30 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">ℹ️</span>
              </div>
              <div>
                <h4 className="font-bold text-coffee-800 mb-1">Bilgi</h4>
                <p className="text-coffee-600 text-sm leading-relaxed">
                  Tüm ürünlerimiz taze malzemelerle günlük olarak hazırlanmaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
