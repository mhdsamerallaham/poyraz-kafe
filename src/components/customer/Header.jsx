'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="relative border-b border-white/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 md:py-8">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/">
            <button className="text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-2 backdrop-blur-sm bg-white/30 px-4 py-2 rounded-xl">
              <span className="text-lg">←</span>
              <span className="font-light">Ana Sayfa</span>
            </button>
          </Link>
          <Link href="/hakkimizda">
            <button className="text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-2 backdrop-blur-sm bg-white/30 px-4 py-2 rounded-xl">
              <span className="font-light">Hakkımızda</span>
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className="relative w-full max-w-2xl h-56 md:h-72">
            <Image
              src="/images/logo.png"
              alt="Poyraz Kafe"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  )
}
