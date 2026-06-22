export interface BusinessProfile {
  name: string;
  description: string;
  industry: string;
  targetAudience: string;
  valueProposition: string;
  scale: string; // 'local', 'national', 'global'
}

export interface SwotData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface TowsStrategy {
  id: string;
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  factors: string[]; // e.g. ["S1", "O2"]
}

export interface TowsData {
  so: TowsStrategy[];
  wo: TowsStrategy[];
  st: TowsStrategy[];
  wt: TowsStrategy[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  timeframe: "immediate" | "midterm" | "longterm";
  kpi: string;
}

export interface FinancialData {
  rawMaterials: number; // Biaya Bahan Baku
  labor: number;        // Tenaga Kerja Langsung
  overhead: number;     // Biaya Overhead
  producedUnits: number;// Jumlah unit diproduksi
  sellingPrice: number; // Harga jual per unit
  salesVolume: number;  // Volume penjualan bulanan
  fixedCosts: number;   // Biaya Tetap Bulanan
}

export interface FinancialResult {
  hppPerUnit: number;
  markupMargin: number;
  grossRevenue: number;
  grossProfit: number;
  netProfit: number;
  bepUnits: number;
  bepCurrency: number;
}

// 1. Curated SWOT Suggestion Pool by Industry in Bahasa Indonesia
export const INDUSTRY_SWOT_SUGGESTIONS: Record<string, SwotData> = {
  tech: {
    strengths: [
      "Perangkat lunak/algoritma milik sendiri dengan perlindungan hak kekayaan intelektual (HAKI)",
      "Infrastruktur skalabel dengan biaya pengiriman marginal yang sangat rendah",
      "Pendapatan berulang bulanan (MRR) yang tinggi melalui model langganan SaaS",
      "Pendiri teknis yang kuat dengan kecepatan pengembangan fitur yang cepat",
      "Budaya pengembangan gesit (agile) yang memungkinkan pivot produk dengan cepat"
    ],
    weaknesses: [
      "Biaya akuisisi pelanggan (CAC) yang tinggi dibanding nilai hidup pelanggan (LTV) awal",
      "Ketergantungan yang tinggi pada penyedia cloud pihak ketiga (AWS/GCP/Azure)",
      "Utang teknis (technical debt) akibat pengembangan MVP yang terlalu terburu-buru",
      "Rasio pengguna berhenti berlangganan (churn rate) yang tinggi pada fase awal uji coba",
      "Kekurangan staf di departemen pelayanan dan dukungan pelanggan (Customer Success)"
    ],
    opportunities: [
      "Integrasi dengan alat-alat produktivitas kerja populer (Slack, Teams, Salesforce)",
      "Pasar internasional yang luas dengan hanya membutuhkan lokalisasi minor",
      "Implementasi chatbot AI untuk memotong volume tiket keluhan pelanggan",
      "Ekspansi produk ke segmen klien tingkat menengah (mid-market) dan korporat (enterprise)",
      "Membuka ekosistem API agar pengembang pihak ketiga dapat berintegrasi"
    ],
    threats: [
      "Rendahnya hambatan masuk bagi kompetitor peniru yang memanfaatkan teknologi open-source",
      "Ancaman keamanan siber yang dinamis dan risiko kebocoran data sensitif pengguna",
      "Regulasi privasi data yang semakin ketat (GDPR, UU Pelindungan Data Pribadi / UU PDP)",
      "Pembajakan talenta pengembang oleh perusahaan teknologi raksasa dengan pendanaan besar",
      "Risiko ketergantungan platform (misalnya perubahan kebijakan Apple atau Google API)"
    ]
  },
  retail: {
    strengths: [
      "Desain produk yang unik dengan kemitraan produsen eksklusif",
      "Nilai rata-rata pesanan (AOV) dan margin laba kotor yang tinggi",
      "Komunitas merek yang loyal dan kehadiran media sosial yang kuat secara organik",
      "Sistem pemenuhan pesanan (fulfillment) yang efisien dengan tingkat pengembalian rendah",
      "Kehadiran omnichannel yang terintegrasi (toko online dan gerai pop-up fisik)"
    ],
    weaknesses: [
      "Ketergantungan yang sangat tinggi pada iklan berbayar (Meta/Google Ads) untuk mendatangkan penjualan",
      "Kerentanan rantai pasok karena ketergantungan pada satu produsen luar negeri",
      "Biaya penyimpanan inventaris yang tinggi menyerap modal kerja operasional",
      "Rasio pembelian berulang pelanggan yang rendah (kebanyakan hanya pembeli satu kali)",
      "Kemasan produk yang kurang kokoh menyebabkan risiko kerusakan selama pengiriman"
    ],
    opportunities: [
      "Peluncuran program langganan produk habis pakai bulanan (replenishment program)",
      "Bekerja sama dengan influencer mikro untuk kampanye penjualan afiliasi",
      "Melakukan ekspansi ke lini produk pelengkap/aksesori",
      "Mengganti kemasan menjadi ramah lingkungan untuk menarik konsumen peduli lingkungan",
      "Membuka saluran grosir B2B untuk menyuplai toko-toko butik lokal"
    ],
    threats: [
      "Biaya iklan digital yang terus meningkat yang menekan margin keuntungan bersih",
      "Gangguan logistik pengiriman global yang menyebabkan kekosongan stok di musim ramai",
      "Persaingan harga yang agresif dari raksasa marketplace (Shopee, Tokopedia, Temu)",
      "Penurunan daya beli masyarakat akibat inflasi ekonomi",
      "Kenaikan tarif bea masuk atau pajak impor bahan baku"
    ]
  },
  food: {
    strengths: [
      "Lokasi fisik yang sangat strategis dengan lalu lintas pejalan kaki yang padat",
      "Menu makanan khas (signature) yang terdiferensiasi dengan resep rahasia sendiri",
      "Reputasi lokal yang kuat dan basis pelanggan tetap yang besar",
      "Tim dapur berpengalaman dengan tingkat keluar-masuk karyawan (turnover) yang rendah",
      "Tata letak dapur yang efisien meminimalkan waktu penyajian makanan"
    ],
    weaknesses: [
      "Kapasitas tempat duduk fisik terbatas yang membatasi pendapatan saat jam sibuk",
      "Tingkat pembusukan bahan baku segar yang tinggi jika penjualan melambat",
      "Ketergantungan pada aplikasi pengiriman pihak ketiga dengan komisi tinggi (20-30%)",
      "Kualitas bahan baku musiman dari pemasok lokal yang tidak konsisten",
      "Kurangnya manual pelatihan staf yang terstruktur sehingga layanan kurang konsisten"
    ],
    opportunities: [
      "Membuat aplikasi loyalitas dengan program poin dan hadiah personal",
      "Ekspansi ke layanan katering acara privat dan makan siang kantor",
      "Menjual produk kemasan bermerek (saus, biji kopi, merchandise) secara online",
      "Pemasangan mesin pemesanan mandiri (self-order kiosk) untuk memotong biaya kasir",
      "Mengembangkan menu brunch akhir pekan atau menu musiman khusus"
    ],
    threats: [
      "Kenaikan harga bahan pangan (inflasi) yang menekan margin keuntungan kotor",
      "Kelangkaan tenaga kerja kuliner terampil di daerah setempat",
      "Kompetitor sejenis yang membuka gerai dalam radius sangat dekat",
      "Perubahan regulasi kebersihan makanan atau tata ruang wilayah",
      "Ulasan negatif yang viral di media sosial memengaruhi kunjungan akhir pekan"
    ]
  },
  services: {
    strengths: [
      "Model konsultasi personal dengan tingkat kepuasan klien yang luar biasa",
      "Portofolio studi kasus yang kuat dengan referensi klien terkemuka",
      "Metodologi kerja eksklusif yang menjamin pencapaian hasil kerja",
      "Biaya operasional overhead yang sangat rendah (bekerja penuh secara remote)",
      "Personal branding pendiri sebagai pemimpin opini terpercaya di industrinya"
    ],
    weaknesses: [
      "Pendapatan terikat langsung pada waktu kerja pendiri (sulit ditingkatkan skalanya)",
      "Siklus penjualan yang panjang untuk kontrak bernilai tinggi (3-6 bulan)",
      "Arus kas yang tidak konsisten akibat pembayaran berbasis proyek dibandingkan langganan",
      "Kurangnya dokumentasi orientasi karyawan baru untuk mempercepat delegasi tugas",
      "Kesulitan membuktikan laba atas investasi (ROI) kepada klien yang sensitif harga"
    ],
    opportunities: [
      "Mengubah layanan konsultasi menjadi produk paket bulanan berbiaya tetap (retainer)",
      "Meluncurkan kursus online atau komunitas premium untuk menangkap pasar beranggaran rendah",
      "Bermitra dengan agensi pelengkap untuk program rujukan (referral) klien timbal balik",
      "Memanfaatkan alat kecerdasan buatan (AI) untuk mempercepat pengerjaan deliverables",
      "Memperluas tim dengan merekrut kontraktor spesialis daripada karyawan tetap"
    ],
    threats: [
      "Pemotongan anggaran jasa profesional oleh klien akibat perlambatan ekonomi makro",
      "Alat perangkat lunak mandiri (DIY) yang membuat klien dapat mengerjakan sendiri tugas Anda",
      "Persaingan harga dari pasar tenaga kerja lepas (freelancer) luar negeri",
      "Kehilangan karyawan kunci yang berpotensi membawa hubungan klien pergi bersama mereka",
      "Risiko hukum akibat keterlambatan pengiriman proyek atau wanprestasi kontrak"
    ]
  },
  health: {
    strengths: [
      "Praktisi/pelatih bersertifikat dengan spesialisasi tinggi",
      "Fasilitas lengkap dengan peralatan olahraga/kesehatan yang unik dan modern",
      "Pendekatan program kesehatan yang sangat personal dan komprehensif bagi klien",
      "Tingkat rujukan (referral) pelanggan baru yang sangat tinggi dari anggota aktif",
      "Integrasi data perangkat pelacak kesehatan (wearables) dalam program latihan"
    ],
    weaknesses: [
      "Biaya sewa tempat yang sangat tinggi di kawasan premium",
      "Tingkat kunjungan yang sepi di jam kerja reguler (tengah hari kerja)",
      "Margin keuntungan per sesi individu lebih kecil dibanding kelas berkelompok",
      "Sistem pemesanan jadwal masih manual sehingga rentan terjadi kesalahan jadwal",
      "Kelelahan fisik (burnout) praktisi karena jadwal sesi yang terlalu padat"
    ],
    opportunities: [
      "Membuat aplikasi panduan latihan dan nutrisi digital untuk klien jarak jauh",
      "Kemitraan dengan program kesehatan karyawan kantor (corporate wellness)",
      "Menyelenggarakan lokakarya akhir pekan atau retret kesehatan eksklusif",
      "Ekspansi bisnis ke penjualan suplemen premium atau pakaian olahraga bermerek",
      "Menyediakan sistem keanggotaan hibrida (latihan di tempat + streaming langsung)"
    ],
    threats: [
      "Perubahan kebijakan klaim asuransi kesehatan yang membatasi tanggungan",
      "Munculnya jaringan gym murah di sekitar yang menawarkan paket latihan generik",
      "Regulasi perizinan praktik kesehatan yang semakin ketat",
      "Tuntutan hukum cedera anggota selama sesi latihan",
      "Penurunan kunjungan musiman (seperti saat libur akhir tahun atau hari raya)"
    ]
  },
  creator: {
    strengths: [
      "Audiens khusus (niche) yang sangat aktif dengan tingkat kepercayaan tinggi pada kreator",
      "Jalur distribusi konten yang beragam (YouTube, Newsletter, Podcast, Instagram)",
      "Biaya produksi konten yang rendah dengan peralatan berkualitas tinggi yang terjangkau",
      "Katalog konten abadi (evergreen) yang terus mendatangkan pendapatan iklan pasif",
      "Hubungan langsung yang kuat dengan sponsor merek premium di ceruk pasar tersebut"
    ],
    weaknesses: [
      "Ketergantungan pada figur tunggal: produksi konten langsung berhenti jika kreator sakit",
      "Ketergantungan yang berlebihan pada algoritma platform pihak ketiga (YouTube/Instagram)",
      "Sistem kerja sama sponsor bersifat ad-hoc menyebabkan pendapatan bulanan tidak stabil",
      "Kurangnya kepemilikan saluran audiens secara mandiri (terlalu bergantung pada media sosial)",
      "Keterbatasan waktu kreator untuk mengembangkan produk digital milik sendiri"
    ],
    opportunities: [
      "Mendirikan komunitas berbayar untuk akses eksklusif (Patreon, Discord premium)",
      "Meluncurkan produk digital sendiri (seperti e-book, templat desain, aset siap pakai)",
      "Membuat kursus edukatif terstruktur bagi pemula di bidang keahlian Anda",
      "Merekrut editor video untuk melipatgandakan kecepatan produksi konten",
      "Melisensikan materi edukasi konten untuk pelatihan internal korporat"
    ],
    threats: [
      "Kelelahan mental (burnout) akibat tekanan konsistensi mengunggah konten",
      "Perubahan mendadak algoritma platform yang memotong jangkauan konten semalam",
      "Risiko pembatasan monetisasi karena pelanggaran standar komunitas platform",
      "Banjir konten generik buatan AI yang merusak nilai keunikan konten buatan manusia",
      "Pemotongan anggaran promosi merek sponsor akibat inflasi pasar"
    ]
  },
  general: {
    strengths: [
      "Proposisi nilai inti bisnis yang jelas dan fokus",
      "Struktur biaya operasional yang ramping dan mudah beradaptasi",
      "Komitmen tinggi pada pelayanan pelanggan personal",
      "Tim pendiri yang termotivasi dengan keahlian yang saling melengkapi",
      "Model bisnis fleksibel dengan modal awal yang relatif kecil"
    ],
    weaknesses: [
      "Anggaran pemasaran yang sangat terbatas dibanding kompetitor besar",
      "Kurangnya kesadaran merek (brand awareness) di wilayah target pasar awal",
      "Operasional internal masih manual menimbulkan hambatan saat order naik",
      "Ketergantungan yang tinggi pada beberapa pemasok kunci saja",
      "Kurangnya data laporan keuangan historis untuk memandu proyeksi anggaran"
    ],
    opportunities: [
      "Mengintegrasikan toko online untuk memperluas jangkauan pembeli",
      "Bekerja sama dengan bisnis lokal non-kompetitor untuk promosi silang",
      "Otomatisasi alur kerja administrasi menggunakan perangkat lunak ramah biaya",
      "Membuat sistem loyalitas pelanggan sederhana untuk mendorong pembelian berulang",
      "Mengumpulkan testimoni pelanggan secara agresif untuk membangun kepercayaan pasar"
    ],
    threats: [
      "Kenaikan tidak terduga pada biaya sewa tempat atau tarif utilitas operasional",
      "Kompetitor baru bermodal besar yang meniru model bisnis Anda di area yang sama",
      "Perlambatan ekonomi yang menurunkan anggaran belanja non-pokok konsumen",
      "Perubahan peraturan pemerintah yang memicu biaya kepatuhan operasional baru",
      "Pergeseran selera konsumen yang membuat produk utama Anda kehilangan daya tarik"
    ]
  }
};

// 2. Curated TOWS Strategies in Bahasa Indonesia
export const INDUSTRY_TOWS_TEMPLATES: Record<string, TowsData> = {
  tech: {
    so: [
      {
        id: "tech_so_1",
        title: "Penetrasi Integrasi Korporat",
        description: "Manfaatkan algoritma terlindung HAKI (Kekuatan) untuk membangun integrasi mendalam dengan aplikasi bisnis populer seperti Salesforce dan Slack (Peluang), menyasar klien korporat.",
        impact: "High",
        factors: ["S1", "O1"]
      },
      {
        id: "tech_so_2",
        title: "Layanan Pelanggan Otomatis AI",
        description: "Gunakan keahlian tim teknis internal (Kekuatan) untuk menerapkan chatbot bantuan bertenaga AI, mengurangi tiket bantuan dan meningkatkan efisiensi (Peluang).",
        impact: "Medium",
        factors: ["S4", "O3"]
      }
    ],
    wo: [
      {
        id: "tech_wo_1",
        title: "Kemitraan Ekosistem API Terbuka",
        description: "Atasi biaya akuisisi pelanggan (CAC) yang tinggi (Kelemahan) dengan merilis API ekosistem terbuka (Peluang), mendorong pengembang luar mereferensikan pengguna baru secara organik.",
        impact: "High",
        factors: ["W1", "O5"]
      },
      {
        id: "tech_wo_2",
        title: "Lokalisasi Sistem untuk Ekspansi",
        description: "Manfaatkan peluang ekspansi ke pasar luar negeri (Peluang) untuk merapikan utang teknis (Kelemahan) melalui refaktor kode saat proses lokalisasi.",
        impact: "Medium",
        factors: ["W3", "O2"]
      }
    ],
    st: [
      {
        id: "tech_st_1",
        title: "Paket SaaS Terintegrasi HAKI",
        description: "Bungkus produk ke dalam paket bundling multi-fitur yang dilindungi paten/HAKI (Kekuatan) untuk membendung ancaman dari peniru teknologi open-source (Ancaman).",
        impact: "High",
        factors: ["S1", "T1"]
      },
      {
        id: "tech_st_2",
        title: "Upgrade Kepatuhan Keamanan Siber",
        description: "Maksimalkan kecepatan pengembangan gesit tim (Kekuatan) untuk menerapkan enkripsi data terbaru guna mematuhi regulasi privasi UU PDP (Ancaman).",
        impact: "High",
        factors: ["S5", "T3"]
      }
    ],
    wt: [
      {
        id: "tech_wt_1",
        title: "Diversifikasi Multi-Cloud",
        description: "Kurangi ketergantungan pada satu penyedia cloud (Kelemahan) dengan menerapkan arsitektur multi-cloud untuk menghindari gangguan server akibat serangan siber (Ancaman).",
        impact: "High",
        factors: ["W2", "T2"]
      },
      {
        id: "tech_wt_2",
        title: "Sistem Panduan Mandiri Pengguna",
        description: "Atasi keterbatasan tim Customer Success (Kelemahan) dengan menyediakan dokumentasi mandiri yang interaktif, menekan churn sebelum kompetitor meniru fitur (Ancaman).",
        impact: "Medium",
        factors: ["W5", "T1"]
      }
    ]
  },
  retail: {
    so: [
      {
        id: "retail_so_1",
        title: "Afiliasi Influencer Mikro",
        description: "Gunakan modal komunitas merek yang loyal (Kekuatan) untuk bermitra dengan influencer mikro dalam kampanye penjualan afiliasi (Peluang) demi menaikkan nilai pesanan.",
        impact: "High",
        factors: ["S3", "O2"]
      },
      {
        id: "retail_so_2",
        title: "Peluncuran Lini Ramah Lingkungan",
        description: "Manfaatkan margin kotor produk yang tinggi (Kekuatan) untuk mendanai transisi kemasan ramah lingkungan (Peluang) sebagai nilai tambah promosi produk premium.",
        impact: "Medium",
        factors: ["S2", "O4"]
      }
    ],
    wo: [
      {
        id: "retail_wo_1",
        title: "Program Langganan Berulang",
        description: "Kurangi ketergantungan pada iklan berbayar (Kelemahan) dengan membuat program langganan pemenuhan otomatis bulanan (Peluang) untuk mengunci pendapatan tetap.",
        impact: "High",
        factors: ["W1", "O1"]
      },
      {
        id: "retail_wo_2",
        title: "Saluran Penjualan Grosir B2B",
        description: "Atasi kerentanan pasokan tunggal impor (Kelemahan) dengan menjual produk secara grosir ke toko lokal (Peluang) yang bersedia menyimpan stok cadangan bersama.",
        impact: "High",
        factors: ["W2", "O5"]
      }
    ],
    st: [
      {
        id: "retail_st_1",
        title: "Proteksi Nilai Desain Eksklusif",
        description: "Bendung persaingan harga agresif dari Shopee/Temu (Ancaman) dengan merilis produk berdesain eksklusif yang diproduksi secara mandiri (Kekuatan).",
        impact: "High",
        factors: ["S1", "T3"]
      },
      {
        id: "retail_st_2",
        title: "Efisiensi Logistik Terintegrasi",
        description: "Gunakan keunggulan pemenuhan pesanan yang efisien (Kekuatan) untuk menekan biaya kirim, menyerap kenaikan biaya bahan baku akibat tarif bea impor (Ancaman).",
        impact: "Medium",
        factors: ["S4", "T5"]
      }
    ],
    wt: [
      {
        id: "retail_wt_1",
        title: "Pencarian Produsen Cadangan Lokal",
        description: "Beralih secara bertahap dari satu produsen luar negeri (Kelemahan) ke produsen lokal cadangan untuk menghindari risiko keterlambatan pengapalan logistik global (Ancaman).",
        impact: "High",
        factors: ["W2", "T2"]
      },
      {
        id: "retail_wt_2",
        title: "Fokus Retensi Dibanding Akuisisi",
        description: "Ganti pengeluaran iklan berbayar yang membengkak (Kelemahan) menjadi program loyalitas guna mengamankan pembeli berulang dari ancaman kenaikan tarif iklan (Ancaman).",
        impact: "High",
        factors: ["W1", "T1"]
      }
    ]
  },
  food: {
    so: [
      {
        id: "food_so_1",
        title: "Aplikasi Loyalitas Lalu Lintas Padat",
        description: "Manfaatkan lokasi gerai fisik yang ramai (Kekuatan) untuk mendaftarkan pelanggan secara langsung ke aplikasi kartu loyalitas poin digital (Peluang).",
        impact: "High",
        factors: ["S1", "O1"]
      },
      {
        id: "food_so_2",
        title: "Penjualan Saus/Bumbu Kemasan Online",
        description: "Kemasi resep khas dapur (Kekuatan) ke dalam kemasan botol ritel untuk dipasarkan melalui toko online (Peluang) guna menambah aliran pendapatan baru.",
        impact: "Medium",
        factors: ["S2", "O3"]
      }
    ],
    wo: [
      {
        id: "food_wo_1",
        title: "Layanan Katering di Jam Senggang",
        description: "Atasi keterbatasan tempat duduk gerai (Kelemahan) dengan memanfaatkan jam operasional senggang untuk memproduksi makanan katering kantor/pesta (Peluang).",
        impact: "High",
        factors: ["W1", "O2"]
      },
      {
        id: "food_wo_2",
        title: "Sistem Pemesanan Mandiri Kasir",
        description: "Tekan komisi tinggi aplikasi ojek online (Kelemahan) dengan mengarahkan pelanggan menggunakan sistem ambil sendiri menggunakan kios mandiri (Peluang).",
        impact: "High",
        factors: ["W3", "O4"]
      }
    ],
    st: [
      {
        id: "food_st_1",
        title: "Branding Reputasi Rasa Otentik",
        description: "Pertahankan basis pelanggan dari ancaman gerai kompetitor baru di dekat lokasi (Ancaman) dengan gencar mempromosikan resep signature otentik (Kekuatan).",
        impact: "High",
        factors: ["S2", "T3"]
      },
      {
        id: "food_st_2",
        title: "Menu Substitusi Fleksibel",
        description: "Gunakan efisiensi dapur (Kekuatan) untuk merancang menu yang mudah disesuaikan ketika terjadi inflasi bahan baku segar di pasaran (Ancaman).",
        impact: "Medium",
        factors: ["S5", "T1"]
      }
    ],
    wt: [
      {
        id: "food_wt_1",
        title: "Standardisasi Operasional Servis (SOP)",
        description: "Rancang manual orientasi staf (Kelemahan) untuk menekan kelalaian pelayanan, menjaga ulasan restoran agar tidak jatuh di Google Maps (Ancaman).",
        impact: "High",
        factors: ["W5", "T5"]
      },
      {
        id: "food_wt_2",
        title: "Pengendalian Ketersediaan Bahan Baku",
        description: "Atasi masalah pembusukan bahan pangan (Kelemahan) dengan negosiasi kontrak harga tetap jangka panjang guna menghindari gejolak harga pangan (Ancaman).",
        impact: "Medium",
        factors: ["W2", "T1"]
      }
    ]
  },
  services: {
    so: [
      {
        id: "services_so_1",
        title: "Standardisasi Paket Jasa Retainer",
        description: "Gunakan tingkat kepuasan klien yang tinggi (Kekuatan) sebagai modal meluncurkan paket jasa konsultasi bulanan (Peluang) untuk menstabilkan arus kas.",
        impact: "High",
        factors: ["S1", "O1"]
      },
      {
        id: "services_so_2",
        title: "Layanan Berbantuan AI Efisiensi Tinggi",
        description: "Gunakan kekuatan nama personal pendiri (Kekuatan) untuk merilis studi kasus pengerjaan proyek super cepat dengan otomatisasi AI (Peluang).",
        impact: "Medium",
        factors: ["S5", "O4"]
      }
    ],
    wo: [
      {
        id: "services_wo_1",
        title: "Akademi Delegasi Kontraktor Jasa",
        description: "Atasi kendala batasan jam kerja pendiri (Kelemahan) dengan melatih kontraktor khusus menggunakan dokumentasi metodologi resmi (Peluang) untuk melayani klien baru.",
        impact: "High",
        factors: ["W1", "O5"]
      },
      {
        id: "services_wo_2",
        title: "Kemitraan Rujukan Agensi Mitra",
        description: "Perpendek proses negosiasi proposal penjualan yang lama (Kelemahan) dengan menjalin program bagi hasil rujukan bersama agensi non-pesaing (Peluang).",
        impact: "Medium",
        factors: ["W2", "O3"]
      }
    ],
    st: [
      {
        id: "services_st_1",
        title: "Lisensi Metodologi Internal Klien",
        description: "Cegah risiko klien membawa pengerjaan secara mandiri/in-house (Ancaman) dengan melisensikan kerangka kerja eksklusif Anda ke sistem mereka (Kekuatan).",
        impact: "High",
        factors: ["S3", "T2"]
      },
      {
        id: "services_st_2",
        title: "Promosi Portofolio Berorientasi Hasil (ROI)",
        description: "Hadapi pengurangan anggaran eksternal korporat (Ancaman) dengan menampilkan studi kasus yang berfokus pada penghematan biaya riil oleh agensi Anda (Kekuatan).",
        impact: "High",
        factors: ["S2", "T1"]
      }
    ],
    wt: [
      {
        id: "services_wt_1",
        title: "Kontrak Hukum Standardisasi Klien",
        description: "Susun dokumentasi alur kerja dan penugasan tim (Kelemahan) agar pekerjaan klien tidak berantakan jika ada anggota tim senior yang mendadak keluar (Ancaman).",
        impact: "High",
        factors: ["W4", "T4"]
      },
      {
        id: "services_wt_2",
        title: "Struktur Pembayaran Berbasis Milestones",
        description: "Selesaikan kelemahan pembuktian ROI jasa (Kelemahan) dengan membagi tagihan per kemajuan proyek untuk menghindari sengketa hukum wanprestasi (Ancaman).",
        impact: "Medium",
        factors: ["W5", "T5"]
      }
    ]
  },
  health: {
    so: [
      {
        id: "health_so_1",
        title: "Kemitraan Olahraga Korporat",
        description: "Manfaatkan kompetensi pelatih berlisensi (Kekuatan) untuk menyusun program kebugaran grup kantor (Peluang) dengan skema kontrak tahunan berkelanjutan.",
        impact: "High",
        factors: ["S1", "O2"]
      },
      {
        id: "health_so_2",
        title: "Aplikasi Pendamping Latihan Digital",
        description: "Gunakan keahlian program personalisasi klien (Kekuatan) untuk merilis modul latihan mandiri jarak jauh secara online (Peluang).",
        impact: "Medium",
        factors: ["S3", "O1"]
      }
    ],
    wo: [
      {
        id: "health_wo_1",
        title: "Pemanfaatan Kelas Jam Senggang",
        description: "Maksimalkan jam sepi tengah hari studio (Kelemahan) dengan menggelar program diskon latihan untuk warga lansia atau komunitas khusus (Peluang).",
        impact: "Medium",
        factors: ["W2", "O3"]
      },
      {
        id: "health_wo_2",
        title: "Penerapan Portal Reservasi Online",
        description: "Ganti pencatatan jadwal latihan manual yang rawan salah (Kelemahan) dengan menerapkan portal reservasi digital mandiri (Peluang).",
        impact: "High",
        factors: ["W4", "O5"]
      }
    ],
    st: [
      {
        id: "health_st_1",
        title: "Fokus Nilai Layanan Premium",
        description: "Hadapi ancaman kompetisi dari jaringan gym berbiaya murah (Ancaman) dengan mengedukasi calon pelanggan tentang keunggulan hasil dari pelatih pribadi (Kekuatan).",
        impact: "High",
        factors: ["S4", "T2"]
      },
      {
        id: "health_st_2",
        title: "Pengawasan Risiko Menggunakan Wearables",
        description: "Integrasikan sensor data wearables (Kekuatan) untuk memantau keselamatan latihan, meminimalkan tuntutan hukum akibat cedera latihan (Ancaman).",
        impact: "High",
        factors: ["S5", "T4"]
      }
    ],
    wt: [
      {
        id: "health_wt_1",
        title: "Sistem Jam Kerja Terjadwal Staf",
        description: "Selesaikan masalah keletihan praktisi (Kelemahan) dengan menyusun sistem rotasi jadwal, menekan risiko kelalaian operasional cedera kelas (Ancaman).",
        impact: "High",
        factors: ["W5", "T4"]
      },
      {
        id: "health_wt_2",
        title: "Substitusi Kapasitas Sewa Fisik",
        description: "Atasi biaya sewa gedung premium yang tinggi (Kelemahan) dengan memindahkan 30% kuota member ke kelas virtual hibrida untuk menghindari sepi musiman (Ancaman).",
        impact: "Medium",
        factors: ["W1", "T5"]
      }
    ]
  },
  creator: {
    so: [
      {
        id: "creator_so_1",
        title: "Peluncuran Produk Templat Digital",
        description: "Gunakan tingkat kepercayaan pemirsa yang tinggi (Kekuatan) untuk menjual produk siap pakai buatan sendiri (Peluang) seperti e-book atau templat desain.",
        impact: "High",
        factors: ["S1", "O2"]
      },
      {
        id: "creator_so_2",
        title: "Lisensi Modul Konten Korporat",
        description: "Manfaatkan portofolio konten abadi (Kekuatan) untuk dikemas ulang dan dilisensikan sebagai materi e-learning korporasi (Peluang).",
        impact: "Medium",
        factors: ["S2", "O5"]
      }
    ],
    wo: [
      {
        id: "creator_wo_1",
        title: "Komunitas Langganan Berbayar",
        description: "Atasi ketidakstabilan pendapatan sponsor merek (Kelemahan) dengan merilis sistem keanggotaan komunitas berbayar eksklusif (Peluang).",
        impact: "High",
        factors: ["W3", "O1"]
      },
      {
        id: "creator_wo_2",
        title: "Pendelegasian Proses Edit Video",
        description: "Atasi batasan waktu kerja kreator (Kelemahan) dengan merekrut editor eksternal terpercaya (Peluang) untuk melipatgandakan kecepatan unggah konten.",
        impact: "High",
        factors: ["W5", "O4"]
      }
    ],
    st: [
      {
        id: "creator_st_1",
        title: "Kontrak Sponsor Berkelanjutan",
        description: "Hadapi ancaman pemotongan promosi sponsor (Ancaman) dengan membuktikan tingginya data konversi pemirsa setia Anda secara periodik (Kekuatan).",
        impact: "High",
        factors: ["S5", "T5"]
      },
      {
        id: "creator_st_2",
        title: "Konten Pengalaman Manusia Otentik",
        description: "Lawan banjir spam konten buatan AI (Ancaman) dengan membuat video berbasis pengalaman nyata di lapangan yang tepercaya (Kekuatan).",
        impact: "High",
        factors: ["S1", "T4"]
      }
    ],
    wt: [
      {
        id: "creator_wt_1",
        title: "Migrasi ke Newsletter Mandiri",
        description: "Ganti ketergantungan pada algoritma media sosial (Kelemahan) dengan mengarahkan pengikut mendaftar ke daftar email newsletter mandiri guna menghindari burnout platform (Ancaman).",
        impact: "High",
        factors: ["W2", "T2"]
      },
      {
        id: "creator_wt_2",
        title: "Manajemen Platform Konten Cadangan",
        description: "Atasi masalah figur tunggal (Kelemahan) dengan membangun cadangan akun media sosial lain guna melindungi dari risiko pembatasan akun mendadak (Ancaman).",
        impact: "Medium",
        factors: ["W1", "T3"]
      }
    ]
  },
  general: {
    so: [
      {
        id: "general_so_1",
        title: "Ekspansi Saluran Digital",
        description: "Gunakan kejelasan proposisi nilai bisnis (Kekuatan) untuk meluncurkan toko e-commerce (Peluang) guna memperluas area distribusi.",
        impact: "High",
        factors: ["S1", "O1"]
      },
      {
        id: "general_so_2",
        title: "Aliansi Strategis Lokal",
        description: "Optimalkan kelincahan tim pendiri (Kekuatan) untuk mengadakan acara kolaborasi promosi silang bersama pelaku usaha lokal non-pesaing (Peluang).",
        impact: "Medium",
        factors: ["S4", "O2"]
      }
    ],
    wo: [
      {
        id: "general_wo_1",
        title: "Otomatisasi Administrasi Bisnis",
        description: "Atasi masalah proses pengerjaan manual yang menghambat skala (Kelemahan) dengan memanfaatkan program ERP/CRM siap pakai terjangkau (Peluang).",
        impact: "High",
        factors: ["W3", "O3"]
      },
      {
        id: "general_wo_2",
        title: "Koleksi Bukti Sosial Kepercayaan",
        description: "Atasi kendala merek baru yang belum dikenal (Kelemahan) dengan memberikan voucer loyalitas kepada pembeli yang mengisi survei ulasan (Peluang).",
        impact: "Medium",
        factors: ["W2", "O5"]
      }
    ],
    st: [
      {
        id: "general_st_1",
        title: "Efisiensi Struktur Biaya Ramping",
        description: "Hadapi tantangan kompetitor baru berkekuatan modal besar (Ancaman) dengan mempertahankan operasional yang hemat dan lincah (Kekuatan).",
        impact: "High",
        factors: ["S2", "T2"]
      },
      {
        id: "general_st_2",
        title: "Fokus Hubungan Pelanggan Loyal",
        description: "Tangkal penurunan daya beli masyarakat (Ancaman) dengan membina hubungan baik dengan pelanggan lama melalui promosi eksklusif (Kekuatan).",
        impact: "High",
        factors: ["S3", "T3"]
      }
    ],
    wt: [
      {
        id: "general_wt_1",
        title: "Kemitraan Pemasok Cadangan",
        description: "Kurangi ketergantungan pada pemasok tunggal bahan baku (Kelemahan) dengan mengontrak pemasok lokal alternatif untuk memitigasi regulasi kepatuhan baru (Ancaman).",
        impact: "High",
        factors: ["W4", "T4"]
      },
      {
        id: "general_wt_2",
        title: "Alokasi Iklan Tepat Sasaran",
        description: "Atasi keterbatasan modal promosi (Kelemahan) dengan hanya menyasar pangsa pasar lokal spesifik, menjaga produk dari pergeseran minat pembeli (Ancaman).",
        impact: "Medium",
        factors: ["W1", "T5"]
      }
    ]
  }
};

// 3. Dynamic Local Fallback Generators in Bahasa Indonesia
export function generateLocalSwotSuggestions(profile: BusinessProfile): SwotData {
  const ind = profile.industry in INDUSTRY_SWOT_SUGGESTIONS ? profile.industry : "general";
  return INDUSTRY_SWOT_SUGGESTIONS[ind];
}

export function generateLocalTowsData(profile: BusinessProfile, swot: SwotData): TowsData {
  const ind = profile.industry in INDUSTRY_TOWS_TEMPLATES ? profile.industry : "general";
  const baseTows = INDUSTRY_TOWS_TEMPLATES[ind];

  const dynamicSO: TowsStrategy[] = [];
  const dynamicWO: TowsStrategy[] = [];
  
  if (swot.strengths.length > 0 && swot.opportunities.length > 0) {
    const s = swot.strengths[0];
    const o = swot.opportunities[0];
    dynamicSO.push({
      id: "dyn_so_1",
      title: "Strategi Akselerasi Pertumbuhan",
      description: `Manfaatkan peluang dari "${o}" dengan mengandalkan kekuatan internal Anda dalam hal "${s}".`,
      impact: "High",
      factors: ["S1", "O1"]
    });
  }

  if (swot.weaknesses.length > 0 && swot.opportunities.length > 0) {
    const w = swot.weaknesses[0];
    const o = swot.opportunities[0];
    dynamicWO.push({
      id: "dyn_wo_1",
      title: "Rencana Optimalisasi Proses",
      description: `Minimalkan hambatan dari "${w}" dengan memanfaatkan peluang strategis dari "${o}".`,
      impact: "Medium",
      factors: ["W1", "O1"]
    });
  }

  return {
    so: [...dynamicSO, ...baseTows.so],
    wo: [...dynamicWO, ...baseTows.wo],
    st: baseTows.st,
    wt: baseTows.wt
  };
}

export function generateLocalRoadmap(profile: BusinessProfile, tows: TowsData): RoadmapItem[] {
  const allStrategies = [...tows.so, ...tows.wo, ...tows.st, ...tows.wt];
  const roadmap: RoadmapItem[] = [];
  
  const immediateStrats = allStrategies.filter(s => s.impact === "High").slice(0, 3);
  immediateStrats.forEach((s, idx) => {
    roadmap.push({
      id: `rm_imm_${idx}`,
      title: `Memulai: ${s.title}`,
      description: `Jalankan segera: ${s.description}`,
      timeframe: "immediate",
      kpi: `Peluncuran awal rencana aksi operasional, target selesai pada minggu ke-6.`
    });
  });

  if (roadmap.length === 0) {
    roadmap.push({
      id: "rm_imm_default",
      title: "Audit Operasional Awal",
      description: "Lakukan audit proses internal tim, siapkan jalur umpan balik, dan selaraskan alat pendukung.",
      timeframe: "immediate",
      kpi: "Laporan audit lengkap ditandatangani oleh pendiri dalam 30 hari pertama."
    });
  }

  const midtermStrats = allStrategies.filter(s => s.impact === "Medium").slice(0, 2);
  midtermStrats.forEach((s, idx) => {
    roadmap.push({
      id: `rm_mid_${idx}`,
      title: `Mengembangkan: ${s.title}`,
      description: `Integrasikan dan perluas: ${s.description}`,
      timeframe: "midterm",
      kpi: `Ukur efisiensi kerja atau tingkat adopsi sistem baru pada bulan ke-5.`
    });
  });

  if (midtermStrats.length === 0) {
    roadmap.push({
      id: "rm_mid_default",
      title: "Survei Kepuasan Pelanggan bulanan",
      description: "Terapkan survei NPS dan kumpulkan studi kasus kepuasan produk.",
      timeframe: "midterm",
      kpi: "Kumpulkan minimal 25 hasil kuesioner dari klien aktif."
    });
  }

  roadmap.push({
    id: "rm_long_1",
    title: "Ekspansi Pasar & Skala Bisnis",
    description: "Luncurkan kampanye pemasaran sekunder, jajaki kemitraan strategis, dan evaluasi jalur distribusi nasional.",
    timeframe: "longterm",
    kpi: "Tingkatkan volume transaksi penjualan bersih sebesar 25% tahun-ke-tahun."
  });

  return roadmap;
}

// 4. Financial Calculation Helpers
export function calculateFinancials(data: FinancialData): FinancialResult {
  const totalProductionCost = data.rawMaterials + data.labor + data.overhead;
  const hppPerUnit = data.producedUnits > 0 ? totalProductionCost / data.producedUnits : 0;
  
  const markupMargin = hppPerUnit > 0 ? ((data.sellingPrice - hppPerUnit) / hppPerUnit) * 100 : 0;
  
  const grossRevenue = data.sellingPrice * data.salesVolume;
  const grossProfit = (data.sellingPrice - hppPerUnit) * data.salesVolume;
  const netProfit = grossProfit - data.fixedCosts;
  
  const contributionMargin = data.sellingPrice - hppPerUnit;
  const bepUnits = contributionMargin > 0 ? Math.ceil(data.fixedCosts / contributionMargin) : 0;
  const bepCurrency = bepUnits * data.sellingPrice;
  
  return {
    hppPerUnit,
    markupMargin,
    grossRevenue,
    grossProfit,
    netProfit,
    bepUnits,
    bepCurrency
  };
}

export function analyzeFinancialsLocal(data: FinancialData, result: FinancialResult): string[] {
  const insights: string[] = [];
  
  if (result.markupMargin <= 0) {
    insights.push("Harga jual Anda di bawah HPP. Anda mengalami kerugian untuk setiap unit yang terjual. Segera naikkan harga jual atau kurangi biaya produksi.");
  } else if (result.markupMargin < 15) {
    insights.push("Margin keuntungan kotor Anda sangat tipis (di bawah 15%). Ini sangat berisiko jika terjadi kenaikan harga bahan baku yang mendadak.");
  } else if (result.markupMargin >= 50) {
    insights.push("Margin keuntungan kotor Anda sangat baik (di atas 50%). Pastikan harga jual Anda tetap kompetitif di pasar agar tidak kehilangan pelanggan.");
  } else {
    insights.push("Margin keuntungan kotor Anda berada di tingkat yang sehat (15% - 50%).");
  }
  
  if (result.netProfit < 0) {
    insights.push("Proyeksi laba bersih bulanan Anda negatif. Hasil penjualan bersih bulanan Anda belum cukup untuk menutupi biaya operasional tetap bulanan.");
  } else {
    insights.push(`Proyeksi laba bersih operasional bulanan Anda diperkirakan sebesar Rp ${Math.round(result.netProfit).toLocaleString("id-ID")}, nilai ini cukup untuk menutup biaya tak terduga.`);
  }
  
  if (result.bepUnits > data.salesVolume) {
    insights.push(`Titik impas (BEP) Anda (${result.bepUnits} unit) lebih besar dari perkiraan volume penjualan bulanan (${data.salesVolume} unit). Anda harus memotong biaya tetap atau menaikkan volume penjualan agar tidak merugi.`);
  } else {
    const bepPercentage = (result.bepUnits / data.salesVolume) * 100;
    insights.push(`Anda mencapai titik impas (BEP) setelah menjual ${result.bepUnits} unit, setara dengan ${bepPercentage.toFixed(0)}% dari target volume penjualan bulanan Anda.`);
  }
  
  return insights;
}

// 5. Live Gemini API Integrations (Translated to respond in Bahasa Indonesia)
export async function generateSwotWithGemini(profile: BusinessProfile, apiKey: string): Promise<SwotData> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const prompt = `
    Anda adalah Hestia, seorang konsultan dan analis bisnis profesional. Analisis profil bisnis berikut dan hasilkan Matriks SWOT (Kekuatan/Strengths, Kelemahan/Weaknesses, Peluang/Opportunities, Ancaman/Threats) dalam Bahasa Indonesia.
    
    Nama Bisnis: ${profile.name}
    Deskripsi: ${profile.description}
    Industri: ${profile.industry}
    Target Audiens: ${profile.targetAudience}
    Proposisi Nilai: ${profile.valueProposition}
    Skala Bisnis: ${profile.scale}
    
    Tuliskan masing-masing tepat 5 poin yang sangat spesifik, realistis, dan dapat dijalankan untuk tiap kategori dalam Bahasa Indonesia.
    
    Kembalikan output Anda hanya berupa objek JSON mentah dengan struktur berikut:
    {
      "strengths": ["string"],
      "weaknesses": ["string"],
      "opportunities": ["string"],
      "threats": ["string"]
    }
    Pastikan respons Anda valid JSON tanpa membungkusnya dalam kode blok markdown (seperti \`\`\`json).
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error dari API Gemini: ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Respons kosong diterima dari API Gemini.");
  }

  return JSON.parse(text.trim()) as SwotData;
}

export async function generateTowsWithGemini(profile: BusinessProfile, swot: SwotData, apiKey: string): Promise<TowsData> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const prompt = `
    Anda adalah Hestia, analis bisnis profesional. Buat analisis strategi TOWS dalam Bahasa Indonesia untuk bisnis berikut:
    Nama Bisnis: ${profile.name}
    Deskripsi: ${profile.description}
    Industri: ${profile.industry}
    
    Matriks SWOT saat ini:
    - Kekuatan (Strengths): ${JSON.stringify(swot.strengths)}
    - Kelemahan (Weaknesses): ${JSON.stringify(swot.weaknesses)}
    - Peluang (Opportunities): ${JSON.stringify(swot.opportunities)}
    - Ancaman (Threats): ${JSON.stringify(swot.threats)}
    
    Buat masing-masing 2 langkah strategi untuk tiap kuadran TOWS dalam Bahasa Indonesia:
    - so: Strategi Kekuatan-Peluang (Maxi-Maxi)
    - wo: Strategi Kelemahan-Peluang (Mini-Maxi)
    - st: Strategi Kekuatan-Ancaman (Maxi-Mini)
    - wt: Strategi Kelemahan-Ancaman (Mini-Mini)
    
    Setiap strategi harus memiliki:
    - Judul yang menarik dan profesional.
    - Deskripsi langkah pengerjaan yang operasional.
    - Tingkat dampak ("High", "Medium", atau "Low").
    - Faktor SWOT terkait (misalnya ["S1", "O2"] atau ["W2", "T1"]).
    
    Kembalikan output Anda hanya berupa objek JSON dengan struktur berikut:
    {
      "so": [{ "id": "string", "title": "string", "description": "string", "impact": "High"|"Medium"|"Low", "factors": ["string"] }],
      "wo": [{ "id": "string", "title": "string", "description": "string", "impact": "High"|"Medium"|"Low", "factors": ["string"] }],
      "st": [{ "id": "string", "title": "string", "description": "string", "impact": "High"|"Medium"|"Low", "factors": ["string"] }],
      "wt": [{ "id": "string", "title": "string", "description": "string", "impact": "High"|"Medium"|"Low", "factors": ["string"] }]
    }
    Pastikan respons Anda valid JSON tanpa membungkusnya dalam kode blok markdown.
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error dari API Gemini: ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Respons kosong diterima dari API Gemini.");
  }

  return JSON.parse(text.trim()) as TowsData;
}

export async function generateRoadmapWithGemini(profile: BusinessProfile, tows: TowsData, apiKey: string): Promise<RoadmapItem[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const allStrategies = [
    ...tows.so.map(s => `[SO - ${s.title}] ${s.description}`),
    ...tows.wo.map(s => `[WO - ${s.title}] ${s.description}`),
    ...tows.st.map(s => `[ST - ${s.title}] ${s.description}`),
    ...tows.wt.map(s => `[WT - ${s.title}] ${s.description}`)
  ].join("\n");

  const prompt = `
    Anda adalah Hestia, seorang analis manajemen strategi. Buat rencana peta jalan (roadmap) 12-bulan dalam Bahasa Indonesia untuk bisnis berikut:
    Nama Bisnis: ${profile.name}
    Deskripsi: ${profile.description}
    
    Daftar strategi TOWS pilihan yang akan dijalankan:
    ${allStrategies}
    
    Buat rencana aksi terstruktur berisi 6-8 item milestones yang dibagi ke dalam 3 fase waktu:
    - "immediate" (Fase Segera, Bulan 0-3)
    - "midterm" (Fase Menengah, Bulan 3-6)
    - "longterm" (Fase Panjang, Bulan 6-12)
    
    Setiap item harus memiliki judul, deskripsi tindakan operasional, penanda fase waktu, dan sebuah metrik keberhasilan KPI (Key Performance Indicator) yang terukur.
    
    Kembalikan output Anda hanya berupa array objek JSON dengan struktur berikut:
    [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "timeframe": "immediate" | "midterm" | "longterm",
        "kpi": "string"
      }
    ]
    Pastikan respons Anda valid JSON tanpa membungkusnya dalam kode blok markdown.
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error dari API Gemini: ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Respons kosong diterima dari API Gemini.");
  }

  return JSON.parse(text.trim()) as RoadmapItem[];
}

export async function analyzeFinancialsWithGemini(profile: BusinessProfile, data: FinancialData, result: FinancialResult, apiKey: string): Promise<string[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const prompt = `
    Anda adalah Hestia, penasihat keuangan bisnis profesional. Analisis data keuangan dari bisnis berikut dalam Bahasa Indonesia:
    Nama Bisnis: ${profile.name}
    Industri: ${profile.industry}
    
    Data Keuangan:
    - Biaya Bahan Baku: Rp ${data.rawMaterials}
    - Tenaga Kerja Langsung: Rp ${data.labor}
    - Biaya Overhead: Rp ${data.overhead}
    - Unit Diproduksi: ${data.producedUnits} unit
    - Harga Jual per Unit: Rp ${data.sellingPrice}
    - Volume Penjualan Bulanan: ${data.salesVolume} unit
    - Biaya Tetap Bulanan: Rp ${data.fixedCosts}
    
    Hasil Kalkulator:
    - HPP per Unit: Rp ${result.hppPerUnit}
    - Margin Keuntungan Kotor: ${result.markupMargin.toFixed(1)}%
    - Pendapatan Kotor Bulanan: Rp ${result.grossRevenue}
    - Laba Kotor Bulanan: Rp ${result.grossProfit}
    - Laba Bersih Bulanan: Rp ${result.netProfit}
    - Titik Impas (BEP): ${result.bepUnits} unit (setara Rp ${result.bepCurrency})
    
    Berikan analisis terperinci berisi 3-4 poin rekomendasi kritis mengenai margin harga, struktur biaya produksi, kelayakan BEP, serta langkah mitigasi finansial dalam Bahasa Indonesia.
    
    Kembalikan output Anda hanya berupa array string JSON:
    ["rekomendasi 1", "rekomendasi 2", "rekomendasi 3"]
    Pastikan respons Anda valid JSON tanpa membungkusnya dalam kode blok markdown.
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error dari API Gemini: ${response.status}: ${errorText}`);
  }

  const resJson = await response.json();
  const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Respons kosong diterima dari API Gemini.");
  }

  return JSON.parse(text.trim()) as string[];
}
