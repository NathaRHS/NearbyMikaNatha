-- iraisana
CREATE TABLE produit (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
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
-- image
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    idproduit INT,
    url VARCHAR(255),
    FOREIGN KEY (idproduit) REFERENCES produit(id)
);
-- commande
CREATE TABLE commandeinfo (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255),
    contact VARCHAR(255),
    adresse VARCHAR(255),
    reference VARCHAR(255)
);


ALTER TABLE produit add description VARCHAR(255);
ALTER TABLE produit add prix DECIMAL(10, 2);

CREATE TABLE description_image(
    id SERIAL PRIMARY KEY,
    url VARCHAR(255)
);
ALTER TABLE produit add iddescription_image INT;
ALTER TABLE produit add FOREIGN KEY (iddescription_image) REFERENCES description_image(id);