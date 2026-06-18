import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useApplications } from './hooks/useApplications';
import FilterBar from './features/applications/FilterBar';
import ApplicationList from './features/applications/ApplicationList';
import ApplicationForm from './features/applications/ApplicationForm';
import ViewDetails from './features/applications/ViewDetails';
import DeleteConfirm from './features/applications/DeleteConfirm';
import Modal from './components/Modal';
import Toast from './components/Toast';
import Button from './components/Button';

export default function App() {
  const {
    applications, loading, error, toast, clearToast,
    addApplication, editApplication, removeApplication,
    search, filterByStatus,
  } = useApplications();

  const [modal, setModal] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const openCreate = () => setModal('create');
  const openEdit = (app) => { setEditingApp(app); setModal('edit'); };

  const closeModal = () => { setModal(null); setEditingApp(null); };

  const handleSubmit = useCallback(async (data) => {
    if (editingApp) {
      const ok = await editApplication(editingApp.id, data);
      if (ok) closeModal();
    } else {
      const ok = await addApplication(data);
      if (ok) closeModal();
    }
  }, [editingApp, addApplication, editApplication]);

  const handleDelete = useCallback(async () => {
    if (!deletingApp) return;
    setDeleting(true);
    await removeApplication(deletingApp.id);
    setDeleting(false);
    setDeletingApp(null);
  }, [deletingApp, removeApplication]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">Job Tracker</h1>
          <Button onClick={openCreate} size="sm">
            <Plus size={16} />
            Add Application
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <FilterBar onSearch={search} onFilter={filterByStatus} />

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <ApplicationList
          applications={applications}
          loading={loading}
          onView={(app) => setViewingId(app.id)}
          onEdit={openEdit}
          onDelete={(app) => setDeletingApp(app)}
        />
      </main>

      <Modal open={modal === 'create' || modal === 'edit'} onClose={closeModal} title={editingApp ? 'Edit Application' : 'New Application'}>
        <ApplicationForm initial={editingApp} onSubmit={handleSubmit} onCancel={closeModal} />
      </Modal>

      <ViewDetails applicationId={viewingId} onClose={() => setViewingId(null)} />

      <DeleteConfirm application={deletingApp} onConfirm={handleDelete} onCancel={() => setDeletingApp(null)} loading={deleting} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}
    </div>
  );
}
