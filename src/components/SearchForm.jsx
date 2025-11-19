import { useState } from 'react'

export default function SearchForm({ onSearch, initial = { niche: '', areas: '', limit: 10, require_email: false, require_website: false, require_phone: false, global_dedupe: false } }) {
  const [niche, setNiche] = useState(initial.niche)
  const [areas, setAreas] = useState(initial.areas) // comma-separated areas
  const [limit, setLimit] = useState(initial.limit)
  const [requireEmail, setRequireEmail] = useState(initial.require_email)
  const [requireWebsite, setRequireWebsite] = useState(initial.require_website)
  const [requirePhone, setRequirePhone] = useState(initial.require_phone)
  const [globalDedupe, setGlobalDedupe] = useState(initial.global_dedupe)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!niche || !areas) return
    onSearch({
      niche: niche.trim(),
      areas: areas.split(',').map(a => a.trim()).filter(Boolean),
      limit: Number(limit) || 10,
      require_email: !!requireEmail,
      require_website: !!requireWebsite,
      require_phone: !!requirePhone,
      global_dedupe: !!globalDedupe,
    })
  }

  const applyPreset = (pNiche, pArea) => {
    setNiche(pNiche)
    setAreas(pArea)
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
          <label className="block text-sm text-blue-200 mb-1">Areas</label>
          <input
            type="text"
            value={areas}
            onChange={(e) => setAreas(e.target.value)}
            placeholder="Comma-separated, e.g., Austin, TX, Dallas, TX"
            className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-blue-300/70 mt-1">Enter one or more areas separated by commas. We'll search each and combine results.</p>
        </div>
        <div className="col-span-1 sm:col-span-1">
          <label className="block text-sm text-blue-200 mb-1">Max leads</label>
          <input
            type="number"
            min={1}
            max={200}
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full rounded-lg bg-slate-900/60 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/60">
          <span className="block text-sm text-blue-200 mb-2">Filters</span>
          <div className="flex flex-wrap gap-3 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={requireEmail} onChange={(e) => setRequireEmail(e.target.checked)} />
              <span>Must have email</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={requireWebsite} onChange={(e) => setRequireWebsite(e.target.checked)} />
              <span>Must have website</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={requirePhone} onChange={(e) => setRequirePhone(e.target.checked)} />
              <span>Must have phone</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={globalDedupe} onChange={(e) => setGlobalDedupe(e.target.checked)} />
              <span>Global dedupe</span>
            </label>
          </div>
        </div>
        <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/60">
          <span className="block text-sm text-blue-200 mb-2">Presets</span>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => applyPreset('plumbers', 'Austin, TX')} className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-blue-100">Plumbers / Austin</button>
            <button type="button" onClick={() => applyPreset('dentists', 'Dallas, TX')} className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-blue-100">Dentists / Dallas</button>
            <button type="button" onClick={() => applyPreset('cafes', 'Berlin, Germany')} className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-blue-100">Cafes / Berlin</button>
          </div>
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
