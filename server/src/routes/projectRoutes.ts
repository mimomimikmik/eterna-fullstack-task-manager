import { Router } from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// Semua route di bawah ini WAJIB login (protected)
router.use(authenticate);

router.post('/', createProject);          // POST   /api/projects
router.get('/', getProjects);             // GET    /api/projects
router.get('/:id', getProjectById);       // GET    /api/projects/:id
router.put('/:id', updateProject);        // PUT    /api/projects/:id
router.delete('/:id', deleteProject);     // DELETE /api/projects/:id

export default router;