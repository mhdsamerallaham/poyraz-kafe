'use client'

export default function CategoryList({ categories, activeCategory, onCategoryClick }) {
  return (
    <div className="sticky top-0 z-20 border-b border-white/20 py-4">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCategoryClick(null)}
            className={`relative px-8 py-3.5 rounded-full font-light text-lg tracking-wide whitespace-nowrap transition-all duration-300 ${
              activeCategory === null
                ? 'bg-charcoal text-pearl'
                : 'bg-transparent text-charcoal/60 hover:text-charcoal hover:bg-sand-100'
            }`}
          >
            Tümü
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`relative px-8 py-3.5 rounded-full font-light text-lg tracking-wide whitespace-nowrap transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-charcoal text-pearl'
                  : 'bg-transparent text-charcoal/60 hover:text-charcoal hover:bg-sand-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
