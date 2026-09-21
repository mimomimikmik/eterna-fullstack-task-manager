import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ConfirmModal from '../components/ConfirmModal';

interface Project {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const toastId = toast.loading(editingProject ? 'Updating project...' : 'Creating project...');
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, { title, description });
        toast.success('Project berhasil diupdate ✅', { id: toastId });
      } else {
        await api.post('/projects', { title, description });
        toast.success('Project berhasil dibuat 🎉', { id: toastId });
      }
      resetForm();
      fetchProjects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'There is an error', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description || '');
    setShowForm(true);
  };

  const handleDeleteClick = (project: Project) => {
    setDeleteTarget(project);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const toastId = toast.loading('Menghapus project...');
    try {
      await api.delete(`/projects/${deleteTarget.id}`);
      toast.success('Project berhasil dihapus 🗑️', { id: toastId });
      setDeleteTarget(null);
      fetchProjects();
    } catch (error) {
      toast.error('Gagal menghapus project', { id: toastId });
    }
  };

  // const handleDelete = async (id: string) => {
  //   if (!confirm('Yakin ingin menghapus project ini?')) return;
  //   try {
  //     await api.delete(`/projects/${id}`);
  //     fetchProjects();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const resetForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Project</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Create Project
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingProject ? 'Edit Project' : 'New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? 'Keep...' : editingProject ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-gray-500">Loading project...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet.</h3>
            <p className="text-gray-500 mb-4">Start by creating your first project!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={() => handleDeleteClick(project)}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Hapus Project"
        message={`Yakin ingin menghapus "${deleteTarget?.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Dashboard;