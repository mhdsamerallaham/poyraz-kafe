'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <header className="relative border-b border-white/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-center">
          {/* Logo */}
          <div className="relative w-96 h-48">
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
