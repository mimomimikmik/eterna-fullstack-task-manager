import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: () => void;
}

const priorityColors = {
  LOW: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
  HIGH: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
};

const priorityLabels = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isOverdue = project.dueDate && new Date(project.dueDate) < new Date();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold flex-1 mr-2 dark:text-white">{project.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${priorityColors[project.priority]}`}>
          {priorityLabels[project.priority]}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">
        {project.description || 'No description'}
      </p>

      {project.dueDate && (
        <div className={`flex items-center gap-1 text-xs mb-4 ${isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {isOverdue ? 'Overdue: ' : 'Deadline: '}
            {formatDate(project.dueDate)}
          </span>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(project)}
          className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;