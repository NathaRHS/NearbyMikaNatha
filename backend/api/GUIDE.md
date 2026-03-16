# 📘 Guide d'utilisation de l'API

**Base URL** : `http://localhost:3000`

---

## 1. Produit

| Méthode | URL | Body (JSON) | Description |
|---------|-----|-------------|-------------|
| GET | `/api/produits` | — | Lister tous les produits |
| GET | `/api/produits/:id` | — | Récupérer un produit |
| POST | `/api/produits` | `{ "nom": "Nike Air" }` | Créer un produit |
| PUT | `/api/produits/:id` | `{ "nom": "Nike Air Max" }` | Modifier un produit |
| DELETE | `/api/produits/:id` | — | Supprimer un produit |

---

## 2. Couleur

| Méthode | URL | Body (JSON) | Description |
|---------|-----|-------------|-------------|
| GET | `/api/couleurs` | — | Lister toutes les couleurs |
| GET | `/api/couleurs/:id` | — | Récupérer une couleur |
| POST | `/api/couleurs` | `{ "nom": "Rouge" }` | Créer une couleur |
| PUT | `/api/couleurs/:id` | `{ "nom": "Bleu" }` | Modifier une couleur |
| DELETE | `/api/couleurs/:id` | — | Supprimer une couleur |

---

## 3. Type de Manche

| Méthode | URL | Body (JSON) | Description |
|---------|-----|-------------|-------------|
| GET | `/api/type-manches` | — | Lister tous les types |
| GET | `/api/type-manches/:id` | — | Récupérer un type |
| POST | `/api/type-manches` | `{ "nom": "Manche longue" }` | Créer un type |
| PUT | `/api/type-manches/:id` | `{ "nom": "Manche courte" }` | Modifier un type |
| DELETE | `/api/type-manches/:id` | — | Supprimer un type |

---

## 4. Produit Shoes (Chaussures)

> ⚠️ Le GET renvoie les entités liées (produit, couleur) en objets JSON imbriqués.

| Méthode | URL | Body (JSON) | Description |
|---------|-----|-------------|-------------|
| GET | `/api/produit-shoes` | — | Lister toutes les chaussures |
| GET | `/api/produit-shoes/:id` | — | Récupérer une chaussure |
| POST | `/api/produit-shoes` | `{ "produit_id": 1, "idcouleur": 2, "pointure": "42" }` | Créer une chaussure |
| PUT | `/api/produit-shoes/:id` | `{ "produit_id": 1, "idcouleur": 2, "pointure": "43" }` | Modifier une chaussure |
| DELETE | `/api/produit-shoes/:id` | — | Supprimer une chaussure |

**Exemple de réponse GET :**
```json
{
  "id": 1,
  "pointure": "42",
  "produit": { "id": 1, "nom": "Nike Air Max" },
  "couleur": { "id": 2, "nom": "Noir" }
}
```

---

## 5. Produit Liquette (T-Shirts)

> ⚠️ Le GET renvoie les entités liées (produit, couleur, type_manche) en objets JSON imbriqués.

| Méthode | URL | Body (JSON) | Description |
|---------|-----|-------------|-------------|
| GET | `/api/produit-liquettes` | — | Lister toutes les liquettes |
| GET | `/api/produit-liquettes/:id` | — | Récupérer une liquette |
| POST | `/api/produit-liquettes` | `{ "produit_id": 3, "idcouleur": 1, "idtype_manche": 2, "taille": "M" }` | Créer une liquette |
| PUT | `/api/produit-liquettes/:id` | `{ "produit_id": 3, "idcouleur": 1, "idtype_manche": 2, "taille": "L" }` | Modifier une liquette |
| DELETE | `/api/produit-liquettes/:id` | — | Supprimer une liquette |

**Exemple de réponse GET :**
```json
{
  "id": 1,
  "taille": "M",
  "produit": { "id": 3, "nom": "T-Shirt Polo" },
  "couleur": { "id": 1, "nom": "Rouge" },
  "type_manche": { "id": 2, "nom": "Manche courte" }
}
```

---

## 6. Image

> ⚠️ Le GET renvoie l'entité produit liée en objet JSON imbriqué.

| Méthode | URL | Body (JSON) | Description |
|---------|-----|-------------|-------------|
| GET | `/api/images` | — | Lister toutes les images |
| GET | `/api/images/:id` | — | Récupérer une image |
| POST | `/api/images` | `{ "idproduit": 1, "url": "https://example.com/img.jpg" }` | Créer une image |
| PUT | `/api/images/:id` | `{ "idproduit": 1, "url": "https://example.com/new.jpg" }` | Modifier une image |
| DELETE | `/api/images/:id` | — | Supprimer une image |

---

## 7. Commande Info

| Méthode | URL | Body (JSON) | Description |
|---------|-----|-------------|-------------|
| GET | `/api/commande-infos` | — | Lister toutes les commandes |
| GET | `/api/commande-infos/:id` | — | Récupérer une commande |
| POST | `/api/commande-infos` | `{ "nom": "Rakoto", "prenom": "Jean", "email": "jean@mail.com", "contact": "034 12 345 67", "adresse": "Antananarivo", "reference": "CMD-001" }` | Créer une commande |
| PUT | `/api/commande-infos/:id` | `{ "nom": "Rakoto", "prenom": "Jean", "email": "jean@mail.com", "contact": "034 12 345 67", "adresse": "Antananarivo", "reference": "CMD-002" }` | Modifier une commande |
| DELETE | `/api/commande-infos/:id` | — | Supprimer une commande |

---

## Démarrer le serveur

```bash
# Mode développement (avec rechargement auto)
npm run dev

# Mode production
npm start
```

## Scripts SQL (dossier test/)

| Fichier | Description |
|---------|-------------|
| `test/insert.sql` | Insérer des données de test |
| `test/truncate.sql` | Vider toutes les tables et remettre les IDs à 1 |
