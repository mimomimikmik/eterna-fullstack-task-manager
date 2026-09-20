import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// CREATE PROJECT
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = (req as any).userId;

    if (!title) {
      return res.status(400).json({ message: 'Title wajib diisi' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        userId,
      },
    });

    res.status(201).json({
      message: 'Project berhasil dibuat',
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// GET ALL PROJECTS (milik user yang login)
export const getProjects = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// GET PROJECT BY ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const project = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      return res.status(404).json({ message: 'Project tidak ditemukan' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// UPDATE PROJECT
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = (req as any).userId;

    // Cek apakah project milik user yang login
    const existingProject = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project tidak ditemukan' });
    }

    const project = await prisma.project.update({
      where: { id },
      data: { title, description },
    });

    res.status(200).json({
      message: 'Project berhasil diupdate',
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// DELETE PROJECT
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Cek apakah project milik user yang login
    const existingProject = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!existingProject) {
      return res.status(404).json({ message: 'Project tidak ditemukan' });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Project berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};