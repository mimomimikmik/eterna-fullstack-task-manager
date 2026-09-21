import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// CREATE PROJECT
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const userId = (req as any).userId;

    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
    });

    res.status(201).json({
      message: 'Project successfully created',
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'A server error occurred.' });
  }
};

// GET ALL PROJECTS (milik user yang login)
export const getProjects = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { search, priority } = req.query;

    const whereClause: any = { userId };

    if (search) {
      whereClause.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (priority && priority !== 'ALL') {
      whereClause.priority = priority;
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'A server error occurred.' });
  }
};

// GET PROJECT BY ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).userId;

    const project = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'A server error occurred.' });
  }
};

// UPDATE PROJECT
export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, description, priority, dueDate } = req.body;
    const userId = (req as any).userId;

    // Cek apakah project milik user yang login
    const existingProject = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    res.status(200).json({
      message: 'The project was successfully updated.',
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'A server error occurred.' });
  }
};

// DELETE PROJECT
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = (req as any).userId;

    // Cek apakah project milik user yang login
    const existingProject = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Project successfully deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'A server error occurred.' });
  }
};