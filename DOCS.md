# 🍣 Dokumentasi Proyek: Website Restoran Jepang (Japanese Dining)
### *Saraya Japanese Dining (沙羅屋 - SARAYA)*

Dokumentasi spesifikasi teknis, arsitektur sistem, tipografi Jepang, sistem multi-bahasa (**i18n**), dan katalog menu autentik untuk website restoran Jepang modern berbasis **TypeScript** dan **Node.js**.

---

## 📌 1. Ikhtisar & Konsep Restoran (Concept & Brand Identity)

- **Nama Restoran**: **Saraya Japanese Dining (沙羅屋)**
- **Filosofi & Nuansa**: *Wabi-Sabi* bertemu *Modern Elegance*. Menggabungkan kesederhanaan estetika Jepang dengan kenyamanan fungsional web modern.
- **Makna Nama**: **沙羅 (Sara)** melambangkan bunga pohon Sala yang sakral, abadi, dan menenangkan, dipadukan dengan **屋 (Ya)** yang berarti kedai / paviliun hidangan otentik.
- **Palet Warna Desain**:
  - **Sumi Black (炭色 / Charcoal Dark)**: `#121214` (Latar belakang elegan / dark mode luxury)
  - **Vermilion Torii Red (朱色 / Red Accent)**: `#C82333` / `#B22222` (Aksen tombol, promo, badge)
  - **Matcha & Bamboo (竹・抹茶 / Soft Warm)**: `#EAE6DF` / `#F4EFE6` (Latar kartu & teks lembut)
  - **Kogane Gold (黄金 / Premium Accent)**: `#D4AF37` (Aksen bintang ulasan, label Chef's Special)

---

## ⛩️ 2. Tipografi & Font Bahasa Jepang (Typography Strategy)

Untuk menampilkan teks Kanji (漢字), Hiragana (平仮名), Katakana (片仮名), dan alfabet Latin secara elegan dan tajam:

### Kombinasi Font:
1. **Header / Judul Autentik**: **`Noto Serif JP`** atau **`Shippori Mincho`**
   - Memberikan kesan kaligrafi kuas tradisional Jepang yang mewah dan premium.
2. **Body Text / UI & Angka**: **`Noto Sans JP`** + **`Plus Jakarta Sans`**
   - Keterbacaan (*readability*) tinggi di layar desktop maupun smartphone.

### Implementasi di Next.js (`next/font/google`):
```typescript
import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google';

export const serifJP = Noto_Serif_JP({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif-jp',
});

export const sansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans-jp',
});
```

---

## 🌐 3. Sistem Multi-Bahasa (i18n - Internationalization)

Website dirancang mendukung **3 Bahasa** dengan pemilih bahasa (*Language Dropdown*) di pojok kanan Navbar:
1. 🇯🇵 **日本語 (Japanese / JA)** - Untuk pelanggan ekspatriat atau penutur asli Jepang.
2. 🇮🇩 **Bahasa Indonesia (ID)** - Untuk pelanggan lokal Indonesia.
3. 🇬🇧 **English (EN)** - Untuk turis dan ekspatriat internasional.

### Arsitektur i18n yang Digunakan:
- Menggunakan pustaka **`next-intl`** (standar emas untuk Next.js App Router) atau **`i18next`**.
- Format file terjemahan berbasis JSON terpisah:
  - `src/messages/id.json`
  - `src/messages/en.json`
  - `src/messages/ja.json`

### Contoh Struktur Data Bahasa (`messages`):
```json
// messages/ja.json
{
  "navigation": {
    "home": "ホーム",
    "menu": "お品書き",
    "reservation": "ご予約",
    "about": "当店について",
    "cart": "注文リスト"
  },
  "hero": {
    "subtitle": "本格和食の極み",
    "title": "四季を味わう、心温まる日本の味",
    "viewMenu": "お品書きを見る",
    "bookTable": "お席を予約する"
  }
}
```

```json
// messages/id.json
{
  "navigation": {
    "home": "Beranda",
    "menu": "Menu Makanan",
    "reservation": "Reservasi Meja",
    "about": "Tentang Kami",
    "cart": "Keranjang"
  },
  "hero": {
    "subtitle": "Kelezatan Otentik Negeri Sakura",
    "title": "Sentuhan Tradisi Jepang di Setiap Suapan",
    "viewMenu": "Lihat Menu",
    "bookTable": "Reservasi Meja"
  }
}
```

---

## 🍱 4. Spesifikasi Katalog Menu Jepang (Japanese Menu Catalog)

Setiap item menu memiliki atribut:
- **Nama dalam 3 format**: Tulisan Asli Jepang (Kanji/Kana), Nama Romaji, dan Terjemahan Indonesia/Inggris.
- **Badge Status**: `Chef's Choice`, `Halal Certified / No Pork`, `Spicy Level`, `Seasonal`.

### Kategori Menu:

| Kategori (JP / ID) | Contoh Menu | Deskripsi Singkat |
| :--- | :--- | :--- |
| **寿司・刺身**<br>(Sushi & Sashimi) | • **Salmon Aburi Roll**<br>• **Maguro Sashimi (まぐろ)**<br>• **Dragon Roll Unagi** | Irisan ikan segar kualitas sashimi grade dengan sushi rice beraroma cuka beras otentik. |
| **ラーメン・うどん**<br>(Ramen & Udon) | • **Tori Paitan Ramen (鶏白湯)**<br>• **Spicy Miso Ramen (辛味噌)**<br>• **Ebi Tempura Udon (天ぷらうどん)** | Kuah kaldu ayam kental gurih (*rich broth*), mie kenyal buatan sendiri (*handmade*), tamago, dan nori. |
| **丼物・定食**<br>(Donburi & Set Meal) | • **Gyudon Onsen Egg (牛丼)**<br>• **Chicken Katsu Curry (カツカレー)**<br>• **Unajyu Premium (鰻重)** | Nasi mangkuk khas Jepang dengan irisan daging sapi empuk, saus kari rempah khas Tokyo, atau belut panggang manis. |
| **一品料理**<br>(Appetizers / Izakaya) | • **Pan-seared Gyoza (焼き餃子)**<br>• **Truffle Chawanmushi (茶碗蒸し)**<br>• **Spicy Edamame (枝豆)** | Kudapan pendamping khas kedai makan Jepang yang renyah dan gurih. |
| **甘味・お飲み物**<br>(Desserts & Drinks) | • **Uji Matcha Parfait (宇治抹茶)**<br>• **Daifuku Ichigo Mochi (大福)**<br>• **Genmaicha / Ocha (Cold/Hot)** | Minuman teh hijau panggang otentik Shizuoka dan es krim matcha Kyoto dengan mochi kenyal. |

---

## 🪑 5. Sistem Reservasi Meja Khas Jepang (Japanese Seating Types)

Formulir reservasi memungkinkan pelanggan memilih tipe area duduk khas Jepang:
1. **Tatami / Zashiki Room (座敷)**: Area lesehan tradisional beralas tikar tatami dengan suasana privat.
2. **Sushi Counter Bar (カウンター席)**: Tempat duduk di depan meja koki untuk melihat langsung proses pembuatan sushi/ramen.
3. **Table Dining (テーブル席)**: Meja makan modern santai untuk rombongan keluarga atau teman.
4. **Private VIP Room / Koshitsu (個室)**: Ruang tertutup untuk rapat bisnis atau perayaan khusus.

---

## 💻 6. Perintah CLI untuk Memulai Proyek

Sesuai aturan kerja, jalankan perintah CLI berikut di terminal Anda untuk menginisialisasi proyek dengan dukungan TypeScript, Tailwind, dan **i18n**:

### Langkah 1: Inisialisasi Next.js Fullstack (TypeScript & Tailwind)
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
*(Tekan **Enter** atau pilih **Yes** pada semua pertanyaan prompt default)*

### Langkah 2: Instalasi Ikon, Animasi & State Management
```bash
npm install lucide-react clsx tailwind-merge zustand
```

### Langkah 3: Instalasi Pustaka Multi-Bahasa (i18n)
```bash
npm install next-intl
```

### Langkah 4: Instalasi Prisma ORM (Database Menu & Reservasi)
```bash
npm install @prisma/client
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite
```

---

## 🚀 7. Rencana Tindak Lanjut (Next Steps)

1. [x] **Dokumentasi Lengkap**: Konsep visual Jepang, sistem font Jepang, rancangan multi-bahasa i18n, katalog menu, dan seating area.
2. [ ] **Eksekusi CLI**: Anda menjalankan perintah inisialisasi di atas di terminal.
3. [ ] **Setup i18n & Font**: Menyiapkan konfigurasi font `Noto Serif JP` & `next-intl` dengan file terjemahan (JA, ID, EN).
4. [ ] **Komponen UI Beranda**:
   - Header & Navbar dengan Dropdown Pilihan Bahasa 🇯🇵/🇮🇩/🇬🇧 dan ikon keranjang.
   - Hero Section bernuansa Jepang modern (*Zen aesthetics*).
   - Menu Showcase interaktif dengan filter kategori & badge (Halal/Chef's Choice).
   - Form Reservasi Meja (dengan pilihan Tatami, Counter Bar, dan Private Room).
