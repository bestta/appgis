# Aplikasi Informasi Perumahan

Aplikasi web berbasis Next.js untuk menampilkan informasi perumahan di Jakarta dengan integrasi Google Maps.

## Fitur

- Peta interaktif dengan marker lokasi perumahan
- Daftar perumahan dengan informasi harga dan deskripsi
- Desain responsif menggunakan Tailwind CSS

## Persiapan

1. Dapatkan Google Maps API Key dari Google Cloud Console.
2. Buat file `.env.local` di root proyek dan tambahkan:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
3. Pastikan API key sudah aktif dan Google Maps JavaScript API diaktifkan pada proyek Google Cloud.
4. Jalankan kembali server setelah menambahkan `.env.local`.

## Instalasi dan Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Teknologi

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- @react-google-maps/api
