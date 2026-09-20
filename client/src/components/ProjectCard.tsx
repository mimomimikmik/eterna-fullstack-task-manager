interface Project {
  id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 text-sm mb-4">
        {project.description || 'Tidak ada deskripsi'}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(project)}
          className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;