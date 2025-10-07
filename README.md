# ☕ Poyraz Kafe - Online Menü Sistemi

Modern, mobil öncelikli online menü ve admin panel sistemi.

## 🎨 Özellikler

### Müşteri Sitesi (/)
- ✅ Responsive tasarım (mobil, tablet, desktop)
- ✅ Kategori bazlı filtreleme
- ✅ Next.js Image ile optimize edilmiş görseller
- ✅ Ürün detay modal
- ✅ Lazy loading
- ✅ Smooth animasyonlar

### Admin Panel (/admin)
- ✅ Güvenli login (admin / poyraz2025)
- ✅ Kategori yönetimi (CRUD)
- ✅ Ürün yönetimi (CRUD)
- ✅ Resim upload sistemi
- ✅ JSON export/import
- ✅ Sıralama (drag & drop benzeri)
- ✅ Stok durumu yönetimi

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

```
poyraz-kafe/
├── public/
│   ├── images/products/    # Ürün resimleri
│   └── data/menu.json      # Menü verisi
├── src/
│   ├── app/
│   │   ├── page.jsx        # Ana sayfa
│   │   ├── admin/          # Admin panel
│   │   └── api/            # API routes
│   └── components/
│       ├── admin/          # Admin components
│       ├── customer/       # Müşteri components
│       └── shared/         # Paylaşılan components
```

## 🔐 Admin Panel Erişimi

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Kullanıcı Adı:** admin
- **Şifre:** poyraz2025

## 📦 Deployment (Vercel)

```bash
# GitHub'a push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [your-repo-url]
git push -u origin main
```

1. [Vercel Dashboard](https://vercel.com/dashboard) → New Project
2. GitHub repo'yu import et
3. Deploy butonuna tıkla
4. ✅ Hazır! Otomatik CDN + Image optimization

## 🛠️ Teknolojiler

- **Framework:** Next.js 14+
- **Frontend:** React 18+
- **Styling:** Tailwind CSS
- **Image Optimization:** Next.js Image Component
- **Deployment:** Vercel

## 📝 Veri Yönetimi

Tüm menü verisi `public/data/menu.json` dosyasında JSON formatında saklanır.

### Kategori Ekleme
1. Admin panele giriş yap
2. "Yeni Kategori" butonuna tıkla
3. Form doldur ve kaydet
4. "Kaydet" butonuna basarak JSON'a yaz

### Ürün Ekleme
1. "Yeni Ürün" butonuna tıkla
2. Ürün bilgilerini gir
3. Resim yükle (otomatik `/images/products/` klasörüne kaydedilir)
4. "Kaydet" butonuna basarak JSON'a yaz

## 🎯 Önemli Notlar

- Değişiklikler localStorage'da tutulur, **mutlaka "Kaydet" butonuna basın!**
- Resimler public klasörüne kaydedilir (vercel'de otomatik optimize edilir)
- JSON export/import ile yedekleme yapabilirsiniz
- Production'da daha güvenli auth sistemi kullanılması önerilir (NextAuth.js)

## 📄 Lisans

MIT

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilir!

---

**🎉 Poyraz Kafe ile lezzetli bir deneyim!**
