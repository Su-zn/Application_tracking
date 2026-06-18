import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import StatusBadge from '../../components/StatusBadge';
import Spinner from '../../components/Spinner';
import { getApplicationById } from '../../services/api';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function ViewDetails({ applicationId, onClose }) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!applicationId) return;
    setLoading(true);
    getApplicationById(applicationId)
      .then((res) => setApplication(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [applicationId]);

  return (
    <Modal open={!!applicationId} onClose={onClose} title="Application Details">
      {loading ? (
        <Spinner />
      ) : application ? (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Company</label>
            <p className="text-zinc-900 font-medium">{application.companyName || application.company}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Job Title</label>
            <p className="text-zinc-900">{application.jobTitle || application.title}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Status</label>
            <div className="mt-1"><StatusBadge status={application.status} /></div>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Applied Date</label>
            <p className="text-zinc-900">{formatDate(application.appliedDate)}</p>
          </div>
          {application.notes && (
            <div>
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Notes</label>
              <p className="text-zinc-700 text-sm whitespace-pre-wrap">{application.notes}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-zinc-400 text-sm">Failed to load details.</p>
      )}
    </Modal>
  );
}
