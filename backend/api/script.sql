CREATE TABLE commandeinfo (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255),
    contact VARCHAR(255),
    adresse VARCHAR(255),
    reference VARCHAR(255)
);
CREATE TABLE commande (
    id SERIAL PRIMARY KEY,
    commandeinfo_id INT,
    produit_id INT,
    quantite INT,
    prix INT,
    total INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commandeinfo_id) REFERENCES commandeinfo(id),
    FOREIGN KEY (produit_id) REFERENCES produit(id)
);