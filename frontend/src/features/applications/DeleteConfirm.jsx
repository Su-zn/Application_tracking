import { AlertTriangle } from 'lucide-react';
import Button from '../../components/Button';

export default function DeleteConfirm({ application, onConfirm, onCancel, loading }) {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm mx-4 bg-white rounded-xl shadow-xl border border-zinc-200 p-6">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Delete Application</h3>
            <p className="text-sm text-zinc-500 mt-1">
              Are you sure you want to delete <span className="font-medium text-zinc-700">{application.companyName || application.company}</span>?
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
            <Button variant="danger" onClick={onConfirm} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
