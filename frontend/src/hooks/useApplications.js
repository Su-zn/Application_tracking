import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  searchApplications,
  filterApplicationsByStatus,
} from '../services/api';

export function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const clearToast = () => setToast(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getApplications();
      setApplications(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addApplication = useCallback(async (data) => {
    try {
      await createApplication(data);
      await fetchAll();
      showToast('Application created successfully');
      return true;
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create application', 'error');
      return false;
    }
  }, [fetchAll]);

  const editApplication = useCallback(async (id, data) => {
    try {
      await updateApplication(id, data);
      await fetchAll();
      showToast('Application updated successfully');
      return true;
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update application', 'error');
      return false;
    }
  }, [fetchAll]);

  const removeApplication = useCallback(async (id) => {
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
      showToast('Application deleted successfully');
      return true;
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete application', 'error');
      return false;
    }
  }, []);

  const search = useCallback(async (query) => {
    if (!query.trim()) {
      await fetchAll();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await searchApplications(query);
      setApplications(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const filterByStatus = useCallback(async (status) => {
    if (!status) {
      await fetchAll();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await filterApplicationsByStatus(status);
      setApplications(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Filter failed');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  return {
    applications,
    loading,
    error,
    toast,
    clearToast,
    addApplication,
    editApplication,
    removeApplication,
    search,
    filterByStatus,
    refresh: fetchAll,
  };
}
