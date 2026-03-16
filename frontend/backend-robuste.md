# Plan backend robuste

## Objectif
Construire un backend Node solide pour l'admin, les produits et les pages editables, avec une vraie base securite.

## Principe
La securite ne repose jamais sur une seule protection.
Il faut empiler plusieurs couches :
- architecture propre
- authentification solide
- autorisation stricte
- validation de donnees
- protection applicative
- securite base de donnees
- securite infra
- logs et surveillance

## Stack recommandee
- `Node.js`
- `TypeScript`
- `Express` ou `Fastify`
- `PostgreSQL`
- `Prisma`
- `Redis` pour rate limiting / sessions si besoin
- `JWT` courte duree + refresh token securise, ou mieux : session serveur
- `Helmet`
- `Zod` pour la validation
- `bcrypt` ou `argon2` pour les mots de passe
- `Pino` pour les logs

## Architecture recommandee
- `backend/src/app`
- `backend/src/config`
- `backend/src/modules/auth`
- `backend/src/modules/admin`
- `backend/src/modules/products`
- `backend/src/modules/pages`
- `backend/src/modules/uploads`
- `backend/src/middleware`
- `backend/src/lib`
- `backend/src/db`
- `backend/src/jobs`
- `backend/src/tests`

## Regles de base
### 1. Ne jamais faire confiance aux entrees utilisateur
Toujours valider :
- type
- taille
- format
- valeurs autorisees

Exemples :
- longueur max des champs
- emails valides
- prix positifs
- enums pour les statuts
- HTML autorise seulement si explicitement filtre

### 2. Separarer authentification et autorisation
Authentification :
- qui est connecte ?

Autorisation :
- a-t-il le droit de faire cette action ?

Exemple :
- un admin peut modifier les pages
- un simple user ne peut pas toucher aux pages
- certains admins peuvent publier, d'autres seulement editer

### 3. Principe du moindre privilege
- compte DB avec droits limites
- comptes admin limites au strict necessaire
- acces serveur restreint
- cles API minimales

### 4. Ne jamais stocker les mots de passe en clair
- hash avec `argon2` ou `bcrypt`
- mot de passe fort
- reset token expirant rapidement
- rotation de mot de passe admin si doute

## Auth robuste
## Option recommandee
Pour un panneau admin, la solution la plus propre est souvent :
- session serveur
- cookie `HttpOnly`
- `Secure`
- `SameSite=Strict` ou `Lax`

Pourquoi :
- moins expose aux erreurs classiques des JWT mal geres cote front

## Si tu utilises JWT
- access token court
- refresh token rotatif
- invalidation serveur
- stockage sur
- pas de token longue duree dans `localStorage` si tu peux l'eviter

## Mesures indispensables
- rate limiting sur login
- blocage temporaire apres plusieurs echecs
- journalisation des connexions
- 2FA pour les admins si possible
- verification d'IP ou alertes de connexion inhabituelle en bonus

## Securisation des routes
Chaque route sensible doit verifier :
- utilisateur authentifie
- role autorise
- payload valide
- ressource autorisee

Exemples :
- `POST /admin/products`
- `PUT /admin/pages/terms`
- `DELETE /admin/products/:id`

## Validation des donnees
Utilise un schema centralise avec `Zod`.

Valider :
- `req.body`
- `req.params`
- `req.query`

Ne jamais envoyer directement `req.body` a la base.

## SQL et base de donnees
- utiliser un ORM propre comme `Prisma`
- eviter tout SQL concatene
- migrations versionnees
- sauvegardes automatiques
- chiffrement des secrets
- base non exposee publiquement si possible

## Fichiers et uploads
Si l'admin upload des images :
- verifier type MIME
- verifier extension
- limiter la taille
- renommer les fichiers
- ne jamais executer ce qui est uploade
- idealement stocker sur S3 / Cloudflare R2 / stockage objet
- servir les fichiers depuis un domaine ou bucket dedie

## Protection applicative
- `helmet`
- CORS strict
- rate limiting global
- limite de taille JSON
- anti brute-force sur login
- messages d'erreur non verbeux
- CSRF si auth par cookie
- sanitation HTML si contenu riche modifiable

## Securite des pages editables
Si l'admin peut modifier `Terms`, `Privacy`, `FAQ`, etc. :
- stocker le contenu en base
- sanitiser si HTML autorise
- garder un historique des versions
- journaliser qui a modifie quoi
- prevoir rollback

Sinon un compte admin compromis peut injecter du JavaScript ou du phishing dans le site.

## Headers et cookies
Configurer correctement :
- `Content-Security-Policy`
- `X-Frame-Options`
- `Referrer-Policy`
- `X-Content-Type-Options`
- cookies `HttpOnly`, `Secure`, `SameSite`

## Gestion des secrets
- jamais dans le code
- jamais dans Git
- `.env` local uniquement
- secret manager en prod si possible
- rotation des secrets

## Logs et monitoring
Il te faut des logs pour :
- connexions admin
- echecs de login
- creation/modification/suppression produit
- edition des pages
- erreurs serveur
- tentative d'acces interdit

Et il faut eviter de logger :
- mots de passe
- tokens
- donnees bancaires
- donnees sensibles inutiles

## Deploiement
- HTTPS obligatoire
- reverse proxy propre
- firewall
- ports minimaux ouverts
- DB inaccessible depuis Internet public
- mises a jour regulieres
- dependances surveillees
- backups testes
- environnement staging separe de la prod

## Tests securite minimum
- tester injections SQL
- tester XSS
- tester brute force login
- tester acces sans role admin
- tester modification d'un ID non autorise
- tester upload fichier malveillant
- tester payloads trop gros
- tester erreurs de validation

## Roadmap pragmatique
### Phase 1
- Express/Fastify + TypeScript
- PostgreSQL + Prisma
- login admin
- roles simples
- validation Zod
- rate limiting
- Helmet
- logs propres

### Phase 2
- CRUD produits
- CRUD pages
- upload images securise
- historique des modifications
- audit log admin

### Phase 3
- 2FA admin
- rotation refresh tokens
- surveillance et alertes
- CSP stricte
- backups et restauration testee

## Erreurs classiques a eviter
- faire confiance au front
- mettre des JWT longue duree partout
- stocker les tokens n'importe comment
- accepter du HTML non filtre
- exposer la base
- laisser des routes admin sans controle fin
- utiliser le compte DB root
- afficher les stack traces en prod
- oublier le rate limiting
- oublier les logs d'audit

## Regle mentale utile
Pense toujours comme ca :
"Si ce champ est hostile, si ce compte est compromis, si ce token fuit, qu'est-ce qui limite les degats ?"

Si la reponse est "rien", il manque une couche de securite.
