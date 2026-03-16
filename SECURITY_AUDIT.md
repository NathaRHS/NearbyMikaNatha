# Audit de Securite - Nearby

Date: 2026-03-16  
Perimetre: `frontend/` + `backend/api/`  
Contexte: revue de risques pour validation externe (niveau bancaire).

## Resume executif

L'application contient des failles bloquantes pour une validation securite serieuse:

- absence totale d'authentification/autorisation sur l'administration et les routes d'ecriture API
- exposition de donnees personnelles de commande (PII) sans controle d'acces
- upload de fichiers a risque (SVG accepte et servi publiquement)
- absence de protections serveur de base (rate-limit, hardening headers, etc.)

Le systeme n'est pas "production-ready" pour un environnement sensible tant que les points critiques ne sont pas traites.

## Failles identifiees

### 1) Critique - Admin et ecriture API sans authentification

**Impact**
- Toute personne ayant acces a l'URL peut creer, modifier, supprimer des donnees.
- Prise de controle fonctionnelle du catalogue et des images.

**Preuves**
- Route admin exposee sans garde: `frontend/src/App.jsx:19`
- API CRUD montees sans middleware d'auth: `backend/api/index.js:22`, `backend/api/index.js:29`
- Exemples de routes sensibles ouvertes:
  - `backend/api/routes/produitRoutes.js:7`
  - `backend/api/routes/imageRoutes.js:7`
  - `backend/api/routes/uploadRoutes.js:6`

**Remediation**
- Ajouter une authentification forte (session securisee ou JWT court + refresh).
- Ajouter une autorisation role-based (`admin`) sur toutes les routes `POST/PUT/DELETE`.
- Proteger egalement la page `/admin` cote frontend (guard + redirection login).

---

### 2) Critique - Exposition de donnees personnelles commandes (PII)

**Impact**
- Lecture/modification/suppression de donnees client (nom, prenom, email, contact, adresse).
- Risque legal/compliance majeur (RGPD/lois privacy).

**Preuves**
- Routes commandes ouvertes:
  - `backend/api/routes/commandeInfoRoutes.js:5`
  - `backend/api/routes/commandeInfoRoutes.js:8`
  - `backend/api/routes/commandeInfoRoutes.js:9`
- Donnees sensibles retournees en clair:
  - `backend/api/models/commandeInfoModel.js:5`
  - `backend/api/models/commandeInfoModel.js:16`

**Remediation**
- Restreindre `GET/PUT/DELETE` commandes a un role admin authentifie.
- Masquer/chiffrer les champs sensibles selon besoin metier.
- Journaliser les acces aux commandes (audit log).

---

### 3) Haute - Upload de SVG + exposition publique = risque XSS stockee

**Impact**
- Un attaquant peut uploader un fichier SVG malveillant, potentiellement execute chez des utilisateurs selon contexte d'affichage.
- Persistance du payload via `/uploads`.

**Preuves**
- SVG autorise: `backend/api/controllers/uploadController.js:10`
- Fichier ecrit tel quel: `backend/api/controllers/uploadController.js:51`
- Fichier servi publiquement: `backend/api/index.js:10`

**Remediation**
- Interdire `image/svg+xml` en upload (au minimum).
- Verifier le type binaire reel (magic bytes), pas seulement le MIME declare.
- Servir les fichiers uploades avec politique stricte et domaine/media bucket dedie.

---

### 4) Haute - Endpoint upload exploitable pour deni de service

**Impact**
- Saturation disque/memoire via uploads repetes.
- Degradation ou indisponibilite de service.

**Preuves**
- Taille JSON elevee: `backend/api/index.js:9` (`20mb`)
- Aucun rate-limit ni quota dans le backend (`backend/api/package.json` ne contient pas de lib de limitation/hardening)
- Upload ouvert sans auth: `backend/api/routes/uploadRoutes.js:6`

**Remediation**
- Ajouter `express-rate-limit` sur routes sensibles (`/api/uploads`, login, CRUD admin).
- Reduire la taille max des payloads et limiter le nombre de fichiers/minute.
- Mettre un quota de stockage + nettoyage/retention.

---

### 5) Moyenne - Fuite d'informations techniques via messages d'erreur

**Impact**
- Aide a l'attaque (enumeration interne, details de logique, erreurs DB/fichier).

**Preuves**
- Exemples de retour direct `error.message`:
  - `backend/api/controllers/produitController.js:9`
  - `backend/api/controllers/imageController.js:9`
  - `backend/api/controllers/uploadController.js:58`
  - `backend/api/controllers/commandeInfoController.js:9`

**Remediation**
- Retourner des messages generiques cote client en prod.
- Logger les details uniquement cote serveur (logs centralises).

---

### 6) Moyenne - Configuration TLS base de donnees affaiblie

**Impact**
- Si DB distante, risque MITM car certificat non verifie.

**Preuve**
- `rejectUnauthorized: false`: `backend/api/config/db.js:10`

**Remediation**
- Activer verification stricte certificat (`rejectUnauthorized: true`) avec CA valide.

## Points positifs constates

- Requetes SQL parameterisees (`$1`, `$2`, etc.) dans les models: risque SQL injection reduit.
- Validation metier minimale presente sur certains services (ex: champs obligatoires, prix numerique).

## Plan de correction priorise

### Blocage immediate (avant toute revue banque)

1. Mettre en place auth + autorisation role admin sur toutes routes sensibles.
2. Fermer l'acces public aux commandes (PII).
3. Durcir upload: interdire SVG, limiter taille/debit, proteger endpoint.

### Court terme (48-72h)

1. Ajouter middleware hardening (`helmet`), CORS strict, rate-limiting global.
2. Uniformiser la gestion d'erreurs (pas de details internes en reponse prod).
3. Ajouter logs d'audit (qui a fait quoi sur CRUD admin/commandes).

### Moyen terme

1. Tests automatises de securite API (authz, validation, limites upload).
2. Secret management propre (`.env` hors repo, rotation des credentials).
3. Pipeline CI avec checks de dependances et lint securite.

## Statut de validation

- Etat actuel: **NON VALIDE** pour un contexte bancaire.
- Condition minimale pour repasser en revue: correction complete des points critiques + preuve de tests.
