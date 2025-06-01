# Zintense

Site vitrine pour une marque de vêtements, avec gestion de produits, paiement et interface d'administration simple.

## Stack technique
- **Frontend** : Next.js (React, TypeScript, Tailwind CSS)
- **Backend** : Node.js, Express, Prisma
- **Base de données** : SQLite (dev) / PostgreSQL (prod possible)

## Démarrage rapide

### Prérequis
- Node.js >= 18
- npm

### Installation

```bash
# Cloner le repo
 git clone https://github.com/Pouetpouets/zintense.git
 cd zintense

# Installer les dépendances frontend et backend
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

### Lancer le backend
```bash
cd backend
npx prisma migrate dev
npm run dev
```

### Lancer le frontend
```bash
cd frontend
npm run dev
```

Le frontend sera accessible sur [http://localhost:3000](http://localhost:3000)

## Fonctionnalités
- Affichage des produits
- Paiement (à venir)
- Interface d'administration (à venir)

## Auteur
Pouetpouets
 
