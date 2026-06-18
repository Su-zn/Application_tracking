const styles = {
  APPLIED: 'bg-zinc-100 text-zinc-700',
  INTERVIEWING: 'bg-blue-50 text-blue-700',
  OFFER: 'bg-green-50 text-green-700',
  REJECTED: 'bg-red-50 text-red-700',
};

export default function StatusBadge({ status }) {
  const s = (status || '').toUpperCase();
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[s] || styles.APPLIED}`}>
      {status || 'Applied'}
    </span>
  );
}
