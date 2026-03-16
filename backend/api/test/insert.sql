-- =============================================
-- Script d'insertion de données de test
-- Exécuter dans l'ordre (les FK dépendent des tables parentes)
-- =============================================

-- 1. Produits
INSERT INTO produit (nom) VALUES ('Nike Air Max');
INSERT INTO produit (nom) VALUES ('Adidas Superstar');
INSERT INTO produit (nom) VALUES ('T-Shirt Polo');
INSERT INTO produit (nom) VALUES ('Chemise Slim');

-- 2. Couleurs
INSERT INTO couleur (nom) VALUES ('Rouge');
INSERT INTO couleur (nom) VALUES ('Noir');
INSERT INTO couleur (nom) VALUES ('Blanc');
INSERT INTO couleur (nom) VALUES ('Bleu');

-- 3. Types de manche
INSERT INTO type_manche (nom) VALUES ('Manche longue');
INSERT INTO type_manche (nom) VALUES ('Manche courte');

-- 4. Produit Shoes (chaussures)
-- Nike Air Max, Rouge, pointure 42
INSERT INTO produit_shoes (produit_id, idcouleur, pointure) VALUES (1, 1, '42');
-- Nike Air Max, Noir, pointure 43
INSERT INTO produit_shoes (produit_id, idcouleur, pointure) VALUES (1, 2, '43');
-- Adidas Superstar, Blanc, pointure 41
INSERT INTO produit_shoes (produit_id, idcouleur, pointure) VALUES (2, 3, '41');

-- 5. Produit Liquette (t-shirts)
-- T-Shirt Polo, Rouge, Manche courte, taille M
INSERT INTO produit_liquette (produit_id, idcouleur, idtype_manche, taille) VALUES (3, 1, 2, 'M');
-- T-Shirt Polo, Bleu, Manche courte, taille L
INSERT INTO produit_liquette (produit_id, idcouleur, idtype_manche, taille) VALUES (3, 4, 2, 'L');
-- Chemise Slim, Blanc, Manche longue, taille S
INSERT INTO produit_liquette (produit_id, idcouleur, idtype_manche, taille) VALUES (4, 3, 1, 'S');

-- 6. Images
INSERT INTO image (idproduit, url) VALUES (1, 'https://example.com/images/nike-air-max.jpg');
INSERT INTO image (idproduit, url) VALUES (2, 'https://example.com/images/adidas-superstar.jpg');
INSERT INTO image (idproduit, url) VALUES (3, 'https://example.com/images/tshirt-polo.jpg');
INSERT INTO image (idproduit, url) VALUES (4, 'https://example.com/images/chemise-slim.jpg');

-- 7. Commandes
INSERT INTO commandeinfo (nom, prenom, email, contact, adresse, reference) 
VALUES ('Rakoto', 'Jean', 'jean.rakoto@email.com', '034 12 345 67', 'Antananarivo, Madagascar', 'CMD-001');

INSERT INTO commandeinfo (nom, prenom, email, contact, adresse, reference) 
VALUES ('Rabe', 'Marie', 'marie.rabe@email.com', '033 98 765 43', 'Antsirabe, Madagascar', 'CMD-002');
