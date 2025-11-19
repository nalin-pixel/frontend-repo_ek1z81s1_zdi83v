import { useState } from 'react'

export default function SearchForm({ onSearch, initial = { niche: '', area: '', limit: 10 } }) {
  const [niche, setNiche] = useState(initial.niche)
  const [area, setArea] = useState(initial.area)
  const [limit, setLimit] = useState(initial.limit)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!niche || !area) return
    onSearch({ niche: niche.trim(), area: area.trim(), limit: Number(limit) || 10 })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 sm:p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="col-span-1 sm:col-span-1">
          <label className="block text-sm text-blue-200 mb-1">Niche</label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., plumbers, dentists, cafes"
            className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-1">
          <label className="block text-sm text-blue-200 mb-1">Area</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="e.g., Austin, TX or Berlin, Germany"
            className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-1">
          <label className="block text-sm text-blue-200 mb-1">No. of leads</label>
          <input
            type="number"
            min={1}
            max={100}
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button type="submit" className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
          Search Leads
        </button>
      </div>
    </form>
  )
}
