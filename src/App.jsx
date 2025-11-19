import { useState } from 'react'
import SearchForm from './components/SearchForm'
import LeadTable from './components/LeadTable'

function App() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSearch = async ({ niche, area, limit }) => {
    setLoading(true)
    setParams({ niche, area, limit })
    setLeads([])
    try {
      const res = await fetch(`${baseUrl}/api/leads/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, area, limit }),
      })
      if (!res.ok) throw new Error(`Search failed: ${res.status}`)
      const data = await res.json()
      setLeads(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!params) return
    const q = new URLSearchParams(params).toString()
    const url = `${baseUrl}/api/leads/export?${q}`
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="relative max-w-6xl mx-auto p-6 sm:p-10 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Lead Generator</h1>
          <p className="text-blue-200">Find fresh, real business contacts by niche and area</p>
        </header>

        <SearchForm onSearch={handleSearch} />

        <div className="flex items-center gap-3">
          <button
            disabled={!params || loading}
            onClick={handleDownload}
            className="inline-flex items-center gap-2 bg-emerald-600 disabled:opacity-50 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Download CSV
          </button>
          {loading && <span className="text-blue-200 animate-pulse">Gathering leads...</span>}
        </div>

        <LeadTable leads={leads} />

        <footer className="text-center text-blue-300/70 text-sm pt-6">
          Results are sourced from OpenStreetMap and public websites. Each search avoids repeating previously shown leads for the same niche and area.
        </footer>
      </div>
    </div>
  )
}

export default App
