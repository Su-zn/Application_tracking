import { Eye, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ApplicationList({ applications, loading, onView, onEdit, onDelete }) {
  if (loading) return <Spinner />;

  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-400 text-sm">No applications found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-50 border-b border-zinc-200">
            <th className="text-left px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Company</th>
            <th className="text-left px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Job Title</th>
            <th className="text-left px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Status</th>
            <th className="text-left px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Date</th>
            <th className="text-right px-4 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-zinc-50 transition-colors">
              <td className="px-4 py-3 font-medium text-zinc-900">{app.companyName || app.company}</td>
              <td className="px-4 py-3 text-zinc-600">{app.jobTitle || app.title}</td>
              <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
              <td className="px-4 py-3 text-zinc-500">{formatDate(app.appliedDate)}</td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex items-center gap-1">
                  <button onClick={() => onView(app)} className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors" title="View">
                    <Eye size={16} />
                  </button>
                  <button onClick={() => onEdit(app)} className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors" title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => onDelete(app)} className="p-1.5 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
