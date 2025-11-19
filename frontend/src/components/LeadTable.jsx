export default function LeadTable({ leads }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="text-gray-600 text-sm">No results yet. Try a search above.</div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white/80 backdrop-blur">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Phone</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Website</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Address</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Source</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((l, i) => (
            <tr key={i} className="hover:bg-gray-50/60">
              <td className="px-4 py-2">{l.name}</td>
              <td className="px-4 py-2">{l.email || "—"}</td>
              <td className="px-4 py-2">{l.phone || "—"}</td>
              <td className="px-4 py-2">
                {l.website ? (
                  <a href={l.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                    {l.website}
                  </a>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-2">{l.address || "—"}</td>
              <td className="px-4 py-2">{l.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
