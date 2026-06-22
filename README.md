# Hestia — Perancang Bisnis & SWOT AI

Hestia adalah aplikasi web perancangan bisnis taktis terintegrasi yang dirancang untuk memandu wirausahawan merumuskan ide usaha, menganalisis SWOT, memformulasikan strategi TOWS, menghitung Harga Pokok Penjualan (HPP), memproyeksikan Break-Even Point (BEP), hingga menyusun peta jalan rencana aksi (roadmap) 12-bulan operasional.

Seluruh antarmuka dikembangkan dengan Bahasa Indonesia yang baku dan mengadopsi estetika desain akademis **Anthropic** (restrained, parchment canvas, terracotta accents).

---

## 🚀 Teknologi Utama

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (Light theme lock)
- **Animasi**: Motion / Framer Motion (Transisi mikro 120ms yang halus)
- **Ikon**: Phosphor Icons (Gaya minimalis premium)
- **Mesin AI**: Google Gemini API Hybrid (Kombinasi Heuristik Lokal & Live API)

---

## 🛠️ Cara Memulai & Instalasi

### 1. Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org) di sistem Anda (versi 18.x atau lebih baru direkomendasikan).

### 2. Instalasi Dependensi
Buka terminal pada direktori proyek dan jalankan perintah:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
Jalankan server lokal dengan perintah:
```bash
npm run dev
```
Setelah server aktif, buka peramban Anda dan akses alamat:
**[http://localhost:3000](http://localhost:3000)**

---

## 📖 Panduan Penggunaan Langkah demi Langkah

Hestia memandu Anda menyusun perencanaan bisnis terstruktur melalui 5 langkah sistematis:

### Langkah 1: Profil Bisnis (Brief Usaha)
1. Isi **Nama Bisnis** atau merek Anda.
2. Pilih **Kategori Industri** yang sesuai (Teknologi/SaaS, Ritel/E-commerce, Kuliner/F&B, Jasa Profesional, Kesehatan/Wellness, Kreator Konten, atau Bisnis Umum). Pilihan ini memengaruhi saran otomatis yang disiapkan oleh sistem.
3. Tulis **Deskripsi Ide Bisnis**, rincikan apa yang Anda jual dan cara operasionalnya.
4. Tentukan **Target Audiens** (siapa pembeli ideal Anda) dan **Proposisi Nilai Utama** (mengapa produk Anda lebih unggul dibanding kompetitor).
5. Pilih **Skala Target Operasional** (Lokal, Nasional, atau Global).
6. Klik **Lanjutkan ke Matriks SWOT**. Sistem akan secara otomatis menyiapkan saran poin SWOT awal berdasarkan profil Anda.

### Langkah 2: Papan Matriks SWOT
1. Anda akan melihat 4 kuadran: **Kekuatan (Strengths)**, **Kelemahan (Weaknesses)**, **Peluang (Opportunities)**, dan **Ancaman (Threats)**.
2. Ulas poin-poin yang digenerasikan secara otomatis oleh AI.
3. Anda dapat menghapus poin yang kurang relevan dengan mengeklik tombol silang (`X`) pada setiap kartu.
4. Anda dapat menambahkan faktor kustom secara mandiri melalui input bar di bagian bawah masing-masing kuadran.
5. Klik **Lanjutkan ke TOWS**.

### Langkah 3: Formulasi Strategi TOWS
1. Metode TOWS mengawinkan faktor internal (S/W) dan eksternal (O/T) untuk merumuskan aksi nyata:
   - **Opsi SO (Kekuatan-Peluang)**: Bagaimana memanfaatkan kekuatan Anda untuk merebut peluang pasar.
   - **Opsi WO (Kelemahan-Peluang)**: Bagaimana mengatasi kelemahan internal dengan memanfaatkan peluang luar.
   - **Opsi ST (Kekuatan-Ancaman)**: Bagaimana menggunakan kekuatan untuk meredam ancaman luar.
   - **Opsi WT (Kelemahan-Ancaman)**: Cara meminimalkan kelemahan untuk menghindari risiko ancaman eksternal.
2. Tinjau rekomendasi taktik yang disiapkan. Anda dapat menghapus atau menambahkan strategi kustom Anda sendiri dengan mengisi Form di bawah kuadran aktif.
3. Klik **Kalkulasi Keuangan & HPP**.

### Langkah 4: Kalkulator Keuangan & HPP
1. **Bagian 1 (Komponen HPP)**: Input biaya variabel produksi Anda, meliputi:
   - **Biaya Bahan Baku** per batch produksi.
   - **Tenaga Kerja Langsung** per batch produksi.
   - **Biaya Overhead Pabrik** (kemasan, listrik produksi, pengiriman bahan) per batch.
   - **Volume Produksi** (berapa unit produk yang dihasilkan dari biaya di atas).
   *Sistem akan otomatis menghitung HPP per Unit produk.*
2. **Bagian 2 (Harga Jual & Penjualan)**:
   - Input **Harga Jual per Unit** produk yang ditawarkan ke konsumen.
   - Input **Estimasi Penjualan bulanan** dalam jumlah unit.
3. **Bagian 3 (Fixed Cost)**:
   - Input **Biaya Tetap Bulanan** (sewa tempat, gaji karyawan tetap, biaya internet rutin, iklan bulanan tetap).
4. **Hasil Analisis Proyeksi**:
   - Di sisi kanan, sistem akan menampilkan HPP per unit, persentase margin keuntungan kotor, laba kotor, laba bersih bulanan, serta volume titik impas (**BEP Unit** dan **BEP Rupiah**).
5. **AI Financial Analyst**: Klik tombol **Jalankan Analisis AI** untuk menampilkan evaluasi dan saran perbaikan kelayakan angka keuangan Anda (lokal maupun didukung live Gemini).
6. Klik **Buat Peta Jalan Aksi**.

### Langkah 5: Peta Jalan Aksi (Roadmap) & Ekspor PDF
1. Sistem akan otomatis mendistribusikan opsi strategi TOWS Anda ke dalam timeline 12-bulan operasional yang dibagi menjadi 3 fase:
   - **Fase 1: Tindakan Jangka Pendek (0-3 Bulan)**
   - **Fase 2: Tindakan Jangka Menengah (3-6 Bulan)**
   - **Fase 3: Tindakan Jangka Panjang (6-12 Bulan)**
2. Anda dapat menambahkan tugas kustom Anda sendiri pada fase tertentu lengkap dengan metrik **KPI (Key Performance Indicator)** yang terukur.
3. **Ekspor Hasil Perencanaan**:
   - **Salin Laporan**: Menyalin naskah laporan rencana bisnis lengkap dalam format Markdown ke clipboard Anda.
   - **Ekspor JSON**: Mengunduh seluruh data input rencana bisnis sebagai file `.json` cadangan.
   - **Ekspor PDF / Cetak**: Menampilkan dialog cetak sistem browser. Format telah dirancang secara khusus untuk menghasilkan cetakan PDF A4 yang rapi, bersih, dan profesional (menyembunyikan tombol navigasi, menu input, dan header otomatis).

---

## 🔑 Mengonfigurasi Kunci API Gemini (Opsional)

Secara default, Hestia menggunakan basis data aturan lokal (*heuristic rules*) yang sangat cepat dan relevan untuk memberikan saran bisnis. Jika Anda ingin mendapatkan analisis SWOT, TOWS, dan keuangan yang dinamis dan tak terbatas langsung dari kecerdasan buatan:
1. Klik tombol **Mode Lokal** di pojok kanan atas Header halaman.
2. Masukkan **Kunci API Gemini (Gemini API Key)** Anda (didapatkan gratis dari Google AI Studio).
3. Klik **Simpan Konfigurasi**.
4. Status pada header akan berubah menjadi **Mode AI Aktif**, dan tombol regenerasi rekomendasi dinamis akan aktif di setiap tahapan.
*Kunci API Anda sepenuhnya aman karena disimpan secara lokal di dalam browser Anda (`localStorage`) dan komunikasi API dikirimkan langsung dari peramban Anda ke server Google.*

---

## ⚖️ Lisensi
Aplikasi ini dikembangkan untuk kebutuhan perancangan strategi bisnis mikro, menengah (UMKM), maupun rintisan (SaaS/Startup).
Hestia dibuat dengan komitmen akses legibilitas tinggi, bebas dari manipulasi pola UI (*anti-slop*), dan menjamin kenyamanan membaca dokumen bisnis.
