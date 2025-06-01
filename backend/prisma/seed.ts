import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Créer un admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  // Créer des catégories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'T-shirts' },
      update: {},
      create: { name: 'T-shirts' },
    }),
    prisma.category.upsert({
      where: { name: 'Pantalons' },
      update: {},
      create: { name: 'Pantalons' },
    }),
    prisma.category.upsert({
      where: { name: 'Robes' },
      update: {},
      create: { name: 'Robes' },
    }),
  ]);

  // Créer des produits
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'T-shirt Basic',
        description: 'T-shirt en coton bio',
        price: 29.99,
        images: ['/images/tshirt-basic.jpg'],
        categoryId: categories[0].id,
        stock: 100,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Jean Slim',
        description: 'Jean slim coupe moderne',
        price: 79.99,
        images: ['/images/jean-slim.jpg'],
        categoryId: categories[1].id,
        stock: 50,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Robe d\'été',
        description: 'Robe légère pour l\'été',
        price: 59.99,
        images: ['/images/robe-ete.jpg'],
        categoryId: categories[2].id,
        stock: 30,
      },
    }),
  ]);

  console.log({ admin, categories, products });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });