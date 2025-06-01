import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Routes publiques
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la catégorie' });
  }
});

// Routes protégées (à implémenter plus tard avec l'authentification)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    const category = await prisma.category.create({
      data: { name },
      include: {
        products: true,
      },
    });
    
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    const category = await prisma.category.update({
      where: { id },
      data: { name },
      include: {
        products: true,
      },
    });
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la catégorie' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.category.delete({
      where: { id },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la catégorie' });
  }
});

export default router;