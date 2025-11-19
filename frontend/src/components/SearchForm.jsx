import { useState } from "react";

export default function SearchForm({ onSearch, loading }) {
  const [niche, setNiche] = useState("");
  const [area, setArea] = useState("");
  const [limit, setLimit] = useState(20);

  function submit(e) {
    e.preventDefault();
    onSearch({ niche: niche.trim(), area: area.trim(), limit: Number(limit) || 20 });
  }

  return (
    <form onSubmit={submit} className="space-y-4 bg-white/70 backdrop-blur rounded-xl p-4 shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Niche</label>
        <input
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="e.g., plumbers, dentists, cafes"
          className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Area</label>
        <input
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="e.g., Austin, TX or Berlin, Germany"
          className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Number of leads</label>
        <input
          type="number"
          min={1}
          max={200}
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
