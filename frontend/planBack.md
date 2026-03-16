# Petit plan

## Objectif
Ajouter un `backend` Node pour que l’admin puisse gérer :
- les produits
- les modifications produit
- la suppression
- les pages statiques comme `Terms`, `Privacy Policy`, `Legal Notice`, `FAQ`, `About Us`

## Est-ce que ce serait facile ?
Oui, techniquement c’est faisable assez proprement.
Le plus simple est de séparer le projet en 3 blocs :
- `frontend` React pour l’affichage
- `backend` Node/Express pour l’API
- `database` pour stocker produits, contenus de pages et comptes admin

Ce n’est pas “très compliqué”, mais il faut poser une base propre dès le début pour éviter de tout refaire après.

## Structure proposée
- `frontend/`
- `backend/`
- `backend/src/routes`
- `backend/src/controllers`
- `backend/src/models`
- `backend/src/middleware`
- `backend/src/services`
- `backend/src/config`

## Ce que le backend ferait
### Produits
- créer un produit
- lire la liste des produits
- modifier un produit
- supprimer un produit
- gérer image, prix, stock, titre, description, catégorie

### Pages éditables
- stocker le contenu de `Terms`, `Privacy Policy`, `Legal Notice`, `FAQ`, `About Us` en base
- permettre à l’admin de modifier ce contenu depuis un panneau d’administration
- le frontend React récupère ensuite ce contenu par API

### Admin
- connexion admin
- protection des routes
- rôles simples au départ
- historique minimal des modifications si besoin

## Comment rendre les pages modifiables sans toucher au code
Le principe :
- aujourd’hui ton texte est écrit directement dans les composants JSX
- demain, ce texte serait stocké en base de données
- le backend expose par exemple :
  - `GET /api/pages/terms`
  - `PUT /api/pages/terms`
  - `GET /api/pages/privacy-policy`
  - `PUT /api/pages/privacy-policy`

Ensuite :
- le frontend public lit le contenu avec un `GET`
- l’admin modifie le contenu dans une interface
- le backend enregistre les changements

## Niveau de difficulté
### Facile
- CRUD produits simple
- CRUD pages statiques simple
- upload d’images basique
- login admin simple

### Moyen
- éditeur riche propre pour les pages
- gestion d’images robuste
- validation de contenu
- permissions admin
- prévisualisation avant publication

### Plus délicat
- versioning des pages
- rollback
- SEO avancé
- cache
- sécurité complète production

## Stack simple recommandée
- `Node.js`
- `Express`
- `PostgreSQL` ou `MySQL`
- `Prisma` ou `Sequelize`
- `JWT` ou session auth
- `Multer` ou stockage cloud pour les images

## Étapes concrètes
1. Créer le dossier `backend`
2. Initialiser un serveur Express
3. Connecter une base de données
4. Créer les tables `products`, `pages`, `admins`
5. Exposer les routes CRUD produits
6. Exposer les routes CRUD pages
7. Ajouter authentification admin
8. Créer une petite interface admin React
9. Faire consommer l’API par le frontend public

## Recommandation pragmatique
Commence par :
- CRUD produits
- CRUD pages statiques
- un seul compte admin
- upload image simple

N’essaie pas de faire une usine à gaz au début. Le bon move est de rendre le contenu dynamique d’abord, puis d’améliorer l’admin ensuite.
