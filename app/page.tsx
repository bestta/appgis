'use client';

import { useMemo, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '520px'
};

const center = {
  lat: -6.2,
  lng: 106.816666
};

const housings = [
  {
    id: 1,
    name: 'Perumahan Grand Cibubur',
    lat: -6.35,
    lng: 106.88,
    price: 800000000,
    address: 'Jl. Alternatif Cibubur No. 20, Bekasi',
    description: 'Perumahan modern dengan fasilitas lengkap dan akses tol.'
  },
  {
    id: 2,
    name: 'Cluster Taman Anggrek',
    lat: -6.25,
    lng: 106.85,
    price: 600000000,
    address: 'Jl. Raya Bogor Km 23, Jakarta Timur',
    description: 'Cluster hijau dengan taman indah dan area bermain keluarga.'
  },
  {
    id: 3,
    name: 'Apartemen Sudirman Park',
    lat: -6.2,
    lng: 106.82,
    price: 1200000000,
    address: 'Jl. Jend. Sudirman No. 55, Jakarta Pusat',
    description: 'Apartemen premium di pusat kota dekat pusat bisnis.'
  },
  {
    id: 4,
    name: 'Perumahan Belleza',
    lat: -6.308,
    lng: 106.958,
    price: 950000000,
    address: 'Jl. Raya Kalimalang No. 8, Bekasi',
    description: 'Perumahan keluarga dengan fasilitas olahraga dan keamanan 24 jam.'
  },
  {
    id: 5,
    name: 'Cluster Citra Garden',
    lat: -6.333,
    lng: 106.75,
    price: 700000000,
    address: 'Jl. Boulevard Raya No. 15, Jakarta Barat',
    description: 'Cluster nyaman dengan akses mudah ke pusat perbelanjaan.'
  },
  {
    id: 6,
    name: 'Residence Pantai Mutiara',
    lat: -6.122,
    lng: 106.78,
    price: 1600000000,
    address: 'Jl. Pantai Indah Kapuk No. 12, Jakarta Utara',
    description: 'Hunian mewah di tepi laut dengan fasilitas resort.'
  },
  {
    id: 7,
    name: 'Perumahan Alam Sutera',
    lat: -6.252,
    lng: 106.64,
    price: 1050000000,
    address: 'Jl. Alam Sutera Boulevard No. 1, Tangerang',
    description: 'Komunitas eksklusif dengan kawasan hijau yang luas.'
  },
  {
    id: 8,
    name: 'Cluster Mutiara Gading',
    lat: -6.217,
    lng: 106.95,
    price: 680000000,
    address: 'Jl. Bukit Gading Raya No. 10, Jakarta Utara',
    description: 'Cluster strategis dekat fasilitas pendidikan dan belanja.'
  }
];

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000000);
  const [radius, setRadius] = useState(15);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const filteredHousings = useMemo(
    () => housings.filter((housing) => {
      const matchesName = housing.name.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = housing.price >= minPrice && housing.price <= maxPrice;
      const distance = getDistanceKm(center.lat, center.lng, housing.lat, housing.lng);
      const matchesRadius = radius === 0 || distance <= radius;
      return matchesName && matchesPrice && matchesRadius;
    }),
    [query, minPrice, maxPrice, radius]
  );

  const totalListings = filteredHousings.length;
  const averagePrice = totalListings > 0
    ? Math.round(filteredHousings.reduce((sum, item) => sum + item.price, 0) / totalListings)
    : 0;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_40%),linear-gradient(180deg,_#0f172a_0%,_#0f172a_55%,_#f8fafc_55%)] pb-20 pt-10 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <p className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Platform Perumahan</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Jelajahi Perumahan Terbaik di Jakarta</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300">
                Cari perumahan, lihat harga, dan temukan lokasi strategis dengan pengalaman antarmuka yang cepat dan mudah.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-900/80 p-4 text-white shadow-lg shadow-slate-900/20 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Daftar</p>
                  <p className="mt-3 text-2xl font-semibold">{housings.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4 text-white shadow-lg shadow-slate-900/20 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Radius</p>
                  <p className="mt-3 text-2xl font-semibold">{radius === 0 ? 'Tanpa batas' : `${radius} km`}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4 text-white shadow-lg shadow-slate-900/20 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Harga rata-rata</p>
                  <p className="mt-3 text-2xl font-semibold">Rp {averagePrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-white">Mulai pencarian Anda</h2>
              <p className="mt-3 text-slate-300">Gunakan filter di samping untuk menemukan perumahan sesuai kebutuhan.</p>
              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl bg-slate-950/80 p-4 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Tip</p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">Coba gunakan kata kunci seperti <span className="font-semibold">Sudirman</span> atau <span className="font-semibold">Pantai</span> untuk hasil lebih cepat.</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Perhatian</p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">Setiap perumahan memiliki harga dan tipe yang berbeda-beda berdasarkan geografi & demografi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="-mt-16 px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.45fr_0.95fr]">
            <section className="overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-300/10 ring-1 ring-slate-200/40">
              <div className="border-b border-slate-200/70 bg-slate-50 px-6 py-5 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Peta Lokasi</h2>
                    <p className="mt-1 text-sm text-slate-500">Marker menunjukkan lokasi perumahan yang sesuai filter.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200/70">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    {filteredHousings.length} hasil
                  </div>
                </div>
              </div>
              <div className="relative">
                {googleMapsApiKey ? (
                  <LoadScript googleMapsApiKey={googleMapsApiKey}>
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                      {filteredHousings.map((housing) => (
                        <Marker
                          key={housing.id}
                          position={{ lat: housing.lat, lng: housing.lng }}
                          title={housing.name}
                          onClick={() => setActiveMarker(housing.id)}
                        >
                          {activeMarker === housing.id && (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                              <div className="max-w-xs">
                                <h3 className="font-semibold text-slate-900">{housing.name}</h3>
                                <p className="text-sm text-slate-600">{housing.address}</p>
                                <p className="mt-2 text-sm text-slate-600">{housing.description}</p>
                                <p className="mt-3 font-semibold text-emerald-600">Rp {housing.price.toLocaleString()}</p>
                              </div>
                            </InfoWindow>
                          )}
                        </Marker>
                      ))}
                    </GoogleMap>
                  </LoadScript>
                ) : (
                  <div className="flex min-h-[520px] items-center justify-center px-6 py-16 text-center">
                    <div className="max-w-md rounded-3xl border border-red-200 bg-red-50 p-8 text-red-800 shadow-sm">
                      <h3 className="text-xl font-semibold">API Key tidak ditemukan</h3>
                      <p className="mt-3 text-sm text-red-700">Tambahkan <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> di file <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">.env.local</code> lalu restart server.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <aside className="space-y-6 rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-300/10 ring-1 ring-slate-200/40">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Cari dan Filter</h2>
                    <p className="mt-1 text-sm text-slate-500">Menemukan perumahan yang paling cocok jadi lebih cepat.</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">Dinamis</span>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <label htmlFor="search" className="text-sm font-medium text-slate-700">Cari nama perumahan</label>
                  <input
                    id="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Contoh: Grand Cibubur, Pantai Mutiara"
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">Filter Harga</p>
                  <p className="text-sm text-slate-500">Tentukan rentang</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="rounded-3xl bg-white p-3 shadow-sm">
                    <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Min</span>
                    <select
                      value={minPrice}
                      onChange={(event) => setMinPrice(Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                    >
                      <option value={0}>Semua</option>
                      <option value={500000000}>Rp 500 juta</option>
                      <option value={700000000}>Rp 700 juta</option>
                      <option value={1000000000}>Rp 1 miliar</option>
                    </select>
                  </label>
                  <label className="rounded-3xl bg-white p-3 shadow-sm">
                    <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Max</span>
                    <select
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(Number(event.target.value))}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
                    >
                      <option value={2000000000}>Semua</option>
                      <option value={800000000}>Rp 800 juta</option>
                      <option value={1000000000}>Rp 1 miliar</option>
                      <option value={1500000000}>Rp 1.5 miliar</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-800">Filter Radius</p>
                <select
                  value={radius}
                  onChange={(event) => setRadius(Number(event.target.value))}
                  className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm"
                >
                  <option value={0}>Tanpa batas</option>
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={15}>15 km</option>
                  <option value={20}>20 km</option>
                </select>
              </div>

              <div className="space-y-4">
                {filteredHousings.length > 0 ? (
                  filteredHousings.map((housing) => (
                    <button
                      key={housing.id}
                      type="button"
                      onClick={() => setActiveMarker(housing.id)}
                      className={`w-full rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white ${activeMarker === housing.id ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-white'}`}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{housing.name}</h3>
                          <p className="text-sm text-slate-500">{housing.address}</p>
                        </div>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Rp {housing.price.toLocaleString()}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{housing.description}</p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
                    Tidak ada perumahan yang cocok dengan filter saat ini.
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
