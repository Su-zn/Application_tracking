import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const statuses = ['', 'APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED'];

export default function FilterBar({ onSearch, onFilter, search: searchProp, status: statusProp }) {
  const [query, setQuery] = useState(searchProp || '');
  const [status, setStatus] = useState(statusProp || '');
  const timer = useRef(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [query, onSearch]);

  const handleStatusChange = (e) => {
    const val = e.target.value;
    setStatus(val);
    onFilter(val);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
      <div className="relative flex-1 w-full">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by company or title..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-400 transition-colors"
        />
      </div>
      <select
        value={status}
        onChange={handleStatusChange}
        className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-zinc-400 transition-colors"
      >
        <option value="">All Statuses</option>
        {statuses.filter(Boolean).map((s) => (
          <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
        ))}
      </select>
    </div>
  );
}
