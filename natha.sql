-- iraisana
CREATE TABLE produit (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255)
);
-- couleur
CREATE TABLE couleur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255)
);
-- chaussures
CREATE TABLE produit_shoes (
    id SERIAL PRIMARY KEY,
    produit_id INT,
    idcouleur INT,
    pointure VARCHAR(255),
    FOREIGN KEY (produit_id) REFERENCES produit(id),
    FOREIGN KEY (idcouleur) REFERENCES couleur(id)
);
-- manche long et manche court
CREATE TABLE type_manche (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255)
);
-- t-shirt
CREATE TABLE produit_liquette (
    id SERIAL PRIMARY KEY,
    produit_id INT,
    idcouleur INT,
    idtype_manche INT,
    taille VARCHAR(255),
    FOREIGN KEY (produit_id) REFERENCES produit(id),
    FOREIGN KEY (idcouleur) REFERENCES couleur(id),
    FOREIGN KEY (idtype_manche) REFERENCES type_manche(id)
);

CREATE TABLE imageProduit (
    id SERIAL PRIMARY KEY,
    produit_id INT,
    url VARCHAR(255),
    FOREIGN KEY (produit_id) REFERENCES produit(id)
);