import { useState, useEffect } from 'react';
import Button from '../../components/Button';

const statusOptions = ['APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED'];
const jobTypeOptions = ['INTERNSHIP', 'FULL_TIME', 'PART_TIME'];

export default function ApplicationForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    companyName: '',
    jobTitle: '',
    jobType: 'FULL_TIME',
    status: 'APPLIED',
    appliedDate: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        companyName: initial.companyName || initial.company || '',
        jobTitle: initial.jobTitle || initial.title || '',
        jobType: initial.jobType || 'FULL_TIME',
        status: initial.status || 'APPLIED',
        appliedDate: initial.appliedDate ? initial.appliedDate.slice(0, 10) : '',
        notes: initial.notes || '',
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.companyName.trim()) errs.companyName = 'Company name is required';
    if (!form.jobTitle.trim()) errs.jobTitle = 'Job title is required';
    if (!form.appliedDate) errs.appliedDate = 'Applied date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const appliedDate = form.appliedDate
      ? `${form.appliedDate}T00:00:00.000Z`
      : form.appliedDate;
    onSubmit({
      ...form,
      appliedDate,
      companyName: form.companyName.trim(),
      jobTitle: form.jobTitle.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Company Name</label>
        <input
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors ${errors.companyName ? 'border-red-300' : 'border-zinc-200'}`}
          placeholder="e.g. Acme Corp"
        />
        {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Job Title</label>
        <input
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors ${errors.jobTitle ? 'border-red-300' : 'border-zinc-200'}`}
          placeholder="e.g. Frontend Engineer"
        />
        {errors.jobTitle && <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Job Type</label>
        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors"
        >
          {jobTypeOptions.map((t) => (
            <option key={t} value={t}>{t.replace('_', ' ').charAt(0) + t.replace('_', ' ').slice(1).toLowerCase()}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-700 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-zinc-700 mb-1">Applied Date</label>
          <input
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors ${errors.appliedDate ? 'border-red-300' : 'border-zinc-200'}`}
          />
          {errors.appliedDate && <p className="mt-1 text-xs text-red-500">{errors.appliedDate}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-1">Notes (optional)</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors resize-none"
          placeholder="Any notes about this application..."
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initial ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
}
