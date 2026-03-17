# Deploiement - Domaine, VPS, Nginx, SSL

## Vue simple

Pour mettre ton site en ligne, il faut comprendre 4 choses :

- le **domaine**
- le **VPS**
- **Nginx**
- le **SSL**

Ils travaillent ensemble.

## 1. Le domaine

Le domaine, c'est l'adresse du site.

Exemple :

- `nearvy-shops.store`

C'est ce que les visiteurs tapent dans leur navigateur.

Le domaine ne contient pas ton site.
Il sert seulement a envoyer les visiteurs vers le bon serveur.

Image mentale :

- domaine = adresse de maison

## 2. Le VPS

Le VPS est le serveur sur lequel ton projet tourne.

C'est une machine distante connectee a internet.

Dessus, tu peux faire tourner :

- ton backend Express
- ton frontend React build
- tes images upload
- ta configuration serveur

Image mentale :

- VPS = la maison

## 3. Nginx

Nginx est la porte d'entree de la maison.

C'est lui qui recoit les requetes quand quelqu'un visite ton domaine.

Ensuite, il decide ou envoyer la demande :

- `/` vers le frontend React
- `/api` vers le backend Express
- `/uploads` vers les fichiers images

Pourquoi on l'utilise :

- il gere bien le trafic web
- il sert tres bien les fichiers statiques
- il gere le HTTPS
- il travaille proprement avec Node.js en production

Image mentale :

- Nginx = le gardien a l'entree

## 4. Le SSL

Le SSL permet d'avoir :

- `https://nearvy-shops.store`

au lieu de :

- `http://nearvy-shops.store`

Il sert a :

- chiffrer les echanges
- proteger les connexions
- securiser les cookies de session
- afficher le cadenas dans le navigateur

Aujourd'hui, on parle souvent de TLS, mais beaucoup disent encore SSL.

Image mentale :

- SSL = la serrure securisee sur la porte

## 5. Comment tout fonctionne ensemble

Quand un visiteur ouvre ton site :

1. il tape `nearvy-shops.store`
2. le domaine pointe vers l'IP de ton VPS
3. Nginx recoit la requete sur le VPS
4. Nginx envoie :
   - `/` au frontend
   - `/api` au backend
   - `/uploads` au dossier des images
5. le SSL protege toute la communication

## 6. Schema simple

```text
Visiteur
   ->
nearvy-shops.store
   ->
IP du VPS
   ->
Nginx
   -> /         frontend React
   -> /api      backend Express
   -> /uploads  images
```

Avec HTTPS :

```text
Visiteur
   ->
https://nearvy-shops.store
   ->
SSL
   ->
Nginx
   ->
ton application
```

## 7. Dans ton projet

Pour ton site, l'architecture logique serait :

- domaine : `nearvy-shops.store`
- hebergement : VPS Hostinger
- serveur web : Nginx
- backend : Express
- frontend : React build
- securite web : SSL

## 8. Ce que tu feras concretement

1. prendre un VPS Hostinger
2. mettre ton projet dessus
3. lancer le backend
4. builder le frontend
5. configurer Nginx
6. pointer le domaine vers l'IP du VPS
7. activer le SSL

## 9. Resume ultra court

- domaine = l'adresse
- VPS = la machine
- Nginx = l'aiguillage
- SSL = la securite HTTPS

Les 4 ensemble permettent de mettre ton site en ligne proprement.
