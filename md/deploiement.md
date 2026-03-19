# 🚀 Déploiement complet d’une application Full-Stack (Node.js + Vite + PostgreSQL + Nginx + VPS)

---

# 🧠 INTRODUCTION

Ce document explique **pas à pas** le déploiement complet d’une application web moderne comprenant :

* 🟢 Backend : Node.js (API REST)
* 🟣 Frontend : Vite (HTML/CSS/JS)
* 🟡 Base de données : PostgreSQL
* 🔵 Serveur : VPS Linux (Ubuntu)
* ⚙️ Reverse proxy : Nginx
* 🌍 Nom de domaine : Hostinger

---

# 🎯 OBJECTIF FINAL

Avoir un site accessible publiquement :

* 🌐 http://nearbyshop.me
* 🔒 https://nearbyshop.me
* ⚙️ API → http://nearbyshop.me/api

---

# 🧱 ARCHITECTURE GLOBALE

```
Utilisateur
   ↓
Domaine (nearbyshop.me)
   ↓
DNS (Hostinger)
   ↓
VPS (IP publique)
   ↓
Nginx (reverse proxy)
   ├── Frontend (Vite build)
   └── Backend (Node.js :3000)
            ↓
      PostgreSQL
```

---

# 🖥️ 1. ACCÈS AU VPS

Connexion via SSH :

```bash
ssh deploy@IP_DU_SERVEUR
```

---

# 🔄 2. MISE À JOUR DU SYSTÈME

```bash
sudo apt update && sudo apt upgrade -y
```

---

# 🐘 3. INSTALLATION DE POSTGRESQL

```bash
sudo apt install postgresql postgresql-contrib -y
```

---

## Accès à PostgreSQL

```bash
sudo -u postgres psql
```

---

## Création utilisateur + base

```sql
CREATE USER nearby_user WITH PASSWORD 'Test1234!';
CREATE DATABASE nearby_db OWNER nearby_user;
```

---

# ⚙️ 4. CONFIGURATION DU BACKEND

## Aller dans le projet

```bash
cd /var/www/nearby/backend/api
```

---

## Installer dépendances

```bash
npm install
```

---

## Créer le fichier `.env`

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=nearby_user
DB_PASSWORD=Test1234!
DB_NAME=nearby_db
DB_SSL=false

PORT=3000
NODE_ENV=production
```

---

## Lancer avec PM2

```bash
npm install -g pm2
pm2 start index.js --name nearby-api
pm2 save
pm2 startup
```

---

## Vérifier

```bash
pm2 list
```

---

# 🌐 5. INSTALLATION DE NGINX

```bash
sudo apt install nginx -y
```

---

## Vérification

```bash
sudo systemctl status nginx
```

---

# ⚙️ 6. CONFIGURATION NGINX

## Créer fichier

```bash
sudo nano /etc/nginx/sites-available/nearby
```

---

## Configuration complète

```nginx
server {
    listen 80;
    server_name nearbyshop.me www.nearbyshop.me;

    location / {
        root /var/www/nearby/frontend/dist;
        index index.html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## Activation

```bash
sudo ln -s /etc/nginx/sites-available/nearby /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

---

## Vérification + reload

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

# 🎨 7. CONFIGURATION DU FRONTEND

## Aller dans frontend

```bash
cd /var/www/nearby/frontend
```

---

## Créer `.env`

```env
VITE_API_BASE_URL=http://76.13.136.71
```

---

## Build

```bash
npm install
npm run build
```

---

## Résultat

```
/dist
```

---

# 🌍 8. CONFIGURATION DNS (HOSTINGER)

## Ajouter A record

| Type | Name | Value        |
| ---- | ---- | ------------ |
| A    | @    | 76.13.136.71 |

---

## Configurer www

| Type  | Name | Value         |
| ----- | ---- | ------------- |
| CNAME | www  | nearbyshop.me |

---

## ⚠️ Important

* Supprimer ancien A record
* Ne pas avoir plusieurs IP pour @

---

# ⏳ 9. PROPAGATION DNS

* 5 à 30 minutes
* Parfois jusqu’à 24h

---

## Test

```
http://nearbyshop.me
```

---

# 🔒 10. HTTPS (CERTBOT)

## Installation

```bash
sudo apt install certbot python3-certbot-nginx -y
```

---

## Génération certificat

```bash
sudo certbot --nginx -d nearbyshop.me -d www.nearbyshop.me
```

---

## Résultat

* HTTPS activé
* Redirection automatique

---

# 🔁 11. MISE À JOUR DU PROJET

## Backend

```bash
cd /var/www/nearby/backend/api
git pull
pm2 restart nearby-api
```

---

## Frontend

```bash
cd /var/www/nearby/frontend
git pull
npm run build
```

---

# ⚠️ 12. GESTION DES .ENV

## Important

* `.env` ≠ GitHub
* `.env` = local + serveur

---

## Vérification

```bash
ls -a
cat .env
```

---

# 🧠 13. COMPRENDRE LE RÔLE DE CHAQUE ÉLÉMENT

| Élément    | Rôle                          |
| ---------- | ----------------------------- |
| DNS        | redirection domaine → serveur |
| Nginx      | serveur web + proxy           |
| Node       | logique backend               |
| PostgreSQL | stockage                      |
| Vite       | frontend                      |
| PM2        | gestion du backend            |

---

# 🚨 14. ERREURS COURANTES

### ❌ 2 A records

→ conflit DNS

### ❌ mauvais server_name

→ domaine non reconnu

### ❌ pas de build frontend

→ page vide

### ❌ oubli reload nginx

→ config non appliquée

### ❌ .env manquant

→ API cassée

---

# 🔥 15. COMMANDES UTILES

```bash
pm2 list
pm2 logs
sudo nginx -t
sudo systemctl reload nginx
```

---

# 🚀 16. RÉSULTAT FINAL

Ton projet est maintenant :

* 🌍 accessible publiquement
* ⚙️ fonctionnel backend + frontend
* 🔒 sécurisé (HTTPS)
* 📦 prêt pour production

---

# 🏁 CONCLUSION

Tu viens de réaliser un déploiement complet incluant :

* serveur
* base de données
* API
* frontend
* DNS
* sécurité

👉 C’est exactement ce que font les développeurs en entreprise.

---

# 💡 PROCHAINES ÉTAPES

* CI/CD (auto deploy)
* sécurité (firewall, fail2ban)
* optimisation (cache, gzip)
* monitoring (logs, uptime)

---

# 👑

Tu n’es plus débutant.
Tu sais déployer une app complète.
