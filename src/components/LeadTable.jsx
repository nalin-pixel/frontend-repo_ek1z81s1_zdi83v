export default function LeadTable({ leads = [] }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="text-blue-200/80 text-sm bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        No leads yet. Try searching for a niche and area.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto bg-slate-800/50 border border-slate-700 rounded-xl">
      <table className="min-w-full text-left text-sm text-blue-100">
        <thead className="bg-slate-900/60 text-blue-200 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Website</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Source</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l, idx) => (
            <tr key={`${l.osm_id}-${idx}`} className="border-t border-slate-700/60 hover:bg-slate-700/30">
              <td className="px-4 py-3 font-medium">{l.name}</td>
              <td className="px-4 py-3">
                {l.email ? (
                  <a className="text-blue-400 hover:underline" href={`mailto:${l.email}`}>{l.email}</a>
                ) : (
                  <span className="text-blue-300/60">—</span>
                )}
              </td>
              <td className="px-4 py-3">{l.phone || <span className="text-blue-300/60">—</span>}</td>
              <td className="px-4 py-3">
                {l.website ? (
                  <a className="text-blue-400 hover:underline" href={l.website} target="_blank" rel="noreferrer">Visit</a>
                ) : (
                  <span className="text-blue-300/60">—</span>
                )}
              </td>
              <td className="px-4 py-3">{l.address || <span className="text-blue-300/60">—</span>}</td>
              <td className="px-4 py-3">{l.source || 'osm'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
