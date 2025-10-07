'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative bg-pearl">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/coffee-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/70 via-pearl/60 to-pearl/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-3 md:mb-4 w-full max-w-xl">
          <img
            src="/images/logo.png"
            alt="Poyraz Cafe Logo"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Link href="/menu">
            <button className="w-full bg-white/90 backdrop-blur-sm text-charcoal px-12 py-6 rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 font-light text-xl tracking-wide shadow-2xl border border-sand-200/50">
              <span className="block text-3xl mb-2">☕</span>
              Menü
            </button>
          </Link>

          <Link href="/hakkimizda">
            <button className="w-full bg-white/90 backdrop-blur-sm text-charcoal px-12 py-6 rounded-2xl hover:bg-white hover:scale-105 transition-all duration-300 font-light text-xl tracking-wide shadow-2xl border border-sage-200/50">
              <span className="block text-3xl mb-2">🌿</span>
              Hakkımızda
            </button>
          </Link>
        </div>

        {/* Tagline */}
        <div className="mt-12 text-center">
          <p className="text-charcoal/60 font-light text-sm md:text-base tracking-wide">
            Rüzgârın serinliği, kahvenin sıcaklığıyla buluştu
          </p>
        </div>
      </div>
    </div>
  )
}
