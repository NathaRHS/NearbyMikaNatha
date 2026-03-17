# Admin Auth Guide

## 1. Creer les tables admin

```bash
psql -h <DB_HOST> -U <DB_USER> -d <DB_NAME> -f script/admin.sql
```

## 2. Generer un hash de mot de passe

Depuis `backend/api`:

```bash
npm run hash:admin-password -- "MotDePasseFort"
```

Le script retourne une valeur `scrypt$...`.

## 3. Inserer le premier admin

```sql
INSERT INTO admin_user (email, password_hash, role)
VALUES ('admin@nearby.local', 'scrypt$...', 'super_admin');
```

## 4. Endpoints auth

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Exemple login

```json
{
  "email": "admin@nearby.local",
  "password": "MotDePasseFort"
}
```

## 5. Routes protegees

Les routes suivantes exigent maintenant une session admin:

- toutes les routes d'ecriture `POST/PUT/DELETE` du catalogue
- toutes les routes `commande-infos`
- `POST /api/uploads`

Les routes publiques de lecture catalogue restent accessibles:

- `GET /api/produits`
- `GET /api/couleurs`
- `GET /api/type-manches`
- `GET /api/produit-shoes`
- `GET /api/produit-liquettes`
- `GET /api/images`

## 6. Frontend

- page login admin: `/admin/login`
- dashboard admin: `/admin`

Si la session n'existe pas ou expire, `/admin` redirige vers `/admin/login`.
