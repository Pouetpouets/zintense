import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Routes publiques
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
  }
});

// Routes protégées (à implémenter plus tard avec l'authentification)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, images, categoryId, stock } = req.body;
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images,
        categoryId,
        stock: parseInt(stock),
      },
      include: {
        category: true,
      },
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du produit' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, images, categoryId, stock } = req.body;
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        images,
        categoryId,
        stock: parseInt(stock),
      },
      include: {
        category: true,
      },
    });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({
      where: { id },
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
  }
});

export default router;