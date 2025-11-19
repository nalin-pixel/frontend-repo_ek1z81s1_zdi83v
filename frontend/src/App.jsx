import { useState } from "react";
import SearchForm from "./components/SearchForm";
import LeadTable from "./components/LeadTable";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [leads, setLeads] = useState([]);
  const [query, setQuery] = useState({ niche: "", area: "", limit: 20 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSearch({ niche, area, limit }) {
    setError("");
    setLoading(true);
    setQuery({ niche, area, limit });
    try {
      const res = await fetch(`${BACKEND_URL}/api/leads/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, area, limit }),
      });
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    if (!query.niche || !query.area) return;
    const url = `${BACKEND_URL}/api/leads/export?niche=${encodeURIComponent(query.niche)}&area=${encodeURIComponent(query.area)}`;
    window.location.href = url;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Lead Generator</h1>
          <p className="text-gray-600">Find real local businesses by niche and area, with emails when available.</p>
        </header>

        <SearchForm onSearch={onSearch} loading={loading} />

        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Results</h2>
          <button
            onClick={downloadCSV}
            disabled={!leads.length}
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Download CSV
          </button>
        </div>

        <LeadTable leads={leads} />
      </div>
    </div>
  );
}
