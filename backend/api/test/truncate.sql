-- =============================================
-- Script de vidange (TRUNCATE + RESTART IDENTITY)
-- Supprime toutes les données et remet les séquences à 1
-- L'ordre respecte les dépendances FK (enfants d'abord)
-- =============================================

TRUNCATE TABLE image RESTART IDENTITY CASCADE;
TRUNCATE TABLE produit_shoes RESTART IDENTITY CASCADE;
TRUNCATE TABLE produit_liquette RESTART IDENTITY CASCADE;
TRUNCATE TABLE commandeinfo RESTART IDENTITY CASCADE;
TRUNCATE TABLE type_manche RESTART IDENTITY CASCADE;
TRUNCATE TABLE couleur RESTART IDENTITY CASCADE;
TRUNCATE TABLE produit RESTART IDENTITY CASCADE;