'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-pearl/80 via-pearl/70 to-pearl/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Back Button */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/30 border-b border-sand-200/30">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <button className="text-charcoal/70 hover:text-charcoal transition-colors flex items-center gap-2">
                <span className="text-xl">←</span>
                <span className="font-light">Ana Sayfa</span>
              </button>
            </Link>
            <Link href="/menu">
              <button className="text-charcoal/70 hover:text-charcoal transition-colors font-light">
                Menü
              </button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
          {/* Hero Section */}
          <section className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mb-6 tracking-tight">
              Hakkımızda
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/70 font-light tracking-wide leading-relaxed">
              Rüzgârın serinliği, kahvenin sıcaklığıyla buluştu.
            </p>
            <p className="text-base md:text-lg text-charcoal/60 font-light mt-4 tracking-wide">
              Poyraz Kafesi, dost sohbetlerinin, sakin sabahların ve lezzetli anların buluşma noktası.
            </p>
          </section>

          {/* Story Section */}
          <section className="mb-16 md:mb-20 bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-sand-200/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🏝️</span>
              <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight">Hikâyemiz</h2>
            </div>
            <div className="space-y-4 text-charcoal/70 font-light leading-relaxed">
              <p className="text-base md:text-lg">
                Poyraz Kafesi, deniz esintisinin huzurunu kahve kokusuyla birleştirme fikrinden doğdu.
              </p>
              <p className="text-base md:text-lg">
                2018'de açıldığımız günden bu yana, her fincanda doğallığı, sadeliği ve samimiyeti sunmayı amaçlıyoruz.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mb-16 md:mb-20 bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-sage-200/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">☕</span>
              <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight">Misyon & Vizyon</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-light text-charcoal mb-3 tracking-wide">Misyonumuz</h3>
                <p className="text-base md:text-lg text-charcoal/70 font-light leading-relaxed">
                  Her misafirimize özenle hazırlanmış bir fincan kahveyle huzur dolu bir an yaşatmak.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-light text-charcoal mb-3 tracking-wide">Vizyonumuz</h3>
                <p className="text-base md:text-lg text-charcoal/70 font-light leading-relaxed">
                  Kaliteli kahve ve sıcak atmosferiyle şehrin en sevilen buluşma noktası olmak.
                </p>
              </div>
            </div>
          </section>

          {/* What We Offer */}
          <section className="mb-16 md:mb-20 bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-sand-200/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🍰</span>
              <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight">Ne Sunuyoruz</h2>
            </div>
            <ul className="space-y-4 text-charcoal/70 font-light text-base md:text-lg">
              <li className="flex items-start gap-3">
                <span className="text-2xl">☕</span>
                <span className="leading-relaxed">Özenle seçilmiş kahve çekirdekleri</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🍳</span>
                <span className="leading-relaxed">Taze hazırlanmış kahvaltılar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🍰</span>
                <span className="leading-relaxed">El yapımı tatlılar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🌬️</span>
                <span className="leading-relaxed">Sıcak bir ortam & deniz esintili konsept</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🌐</span>
                <span className="leading-relaxed">Online menü ve dijital kolaylık</span>
              </li>
            </ul>
          </section>

          {/* Values Section */}
          <section className="mb-16 md:mb-20 bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-sage-200/30">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">👩‍🍳</span>
              <h2 className="text-2xl md:text-3xl font-light text-charcoal tracking-tight">Değerlerimiz</h2>
            </div>
            <div className="space-y-4 text-charcoal/70 font-light leading-relaxed">
              <p className="text-base md:text-lg">
                Poyraz'ın arkasında, kahveye tutkuyla bağlı bir ekip var.
              </p>
              <p className="text-base md:text-lg">
                Her fincan, emeğimizin ve sevgimizin bir yansımasıdır.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <Link href="/menu">
              <button className="bg-gradient-to-r from-sand-600 to-sand-700 text-white px-12 py-4 rounded-2xl hover:from-sand-700 hover:to-sand-800 hover:scale-105 transition-all duration-300 font-light text-lg tracking-wide shadow-2xl">
                Menümüzü İnceleyin
              </button>
            </Link>
          </section>
        </main>
      </div>
    </div>
  )
}
