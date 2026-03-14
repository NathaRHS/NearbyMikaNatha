CREATE TABLE
    categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE
    colors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE
    sizesLiquette (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE
    modeles (
        id SERIAL PRIMARY KEY,
        id_category INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_modeles_category FOREIGN KEY (id_category) REFERENCES categories (id) ON DELETE RESTRICT,
        CONSTRAINT uq_modeles_category_name UNIQUE (id_category, name)
    );

    CREATE TABLE typeManche (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE
    productsLiquette (
        id SERIAL PRIMARY KEY,
        id_modele INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        id_color INT NOT NULL,
        id_product_image INT,
        id_type_manche INT NOT NULL,
        id_size INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT chk_products_price CHECK (price >= 0),
        CONSTRAINT chk_products_stock CHECK (stock >= 0),
        CONSTRAINT fk_products_modele FOREIGN KEY (id_modele) REFERENCES modeles (id) ON DELETE CASCADE,
        CONSTRAINT fk_products_color FOREIGN KEY (id_color) REFERENCES colors (id) ON DELETE RESTRICT,
        CONSTRAINT fk_products_image FOREIGN KEY (id_product_image) REFERENCES product_images (id) ON DELETE SET NULL,
        CONSTRAINT fk_products_size FOREIGN KEY (id_size) REFERENCES sizesLiquette (id) ON DELETE RESTRICT,
        CONSTRAINT uq_products_variant UNIQUE (id_modele, id_color, id_size),
        CONSTRAINT fk_products_type_manche FOREIGN KEY (id_type_manche) REFERENCES typeManche (id) ON DELETE RESTRICT
    );

CREATE TABLE
    productsTennis (
        id SERIAL PRIMARY KEY,
        id_modele INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        id_color INT NOT NULL,
        id_product_image INT,
        pointure INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT chk_products_price CHECK (price >= 0),
        CONSTRAINT chk_products_stock CHECK (stock >= 0),
        CONSTRAINT fk_products_modele FOREIGN KEY (id_modele) REFERENCES modeles (id) ON DELETE CASCADE,
        CONSTRAINT fk_products_color FOREIGN KEY (id_color) REFERENCES colors (id) ON DELETE RESTRICT,
        CONSTRAINT fk_products_image FOREIGN KEY (id_product_image) REFERENCES product_images (id) ON DELETE SET NULL,        CONSTRAINT uq_products_variant UNIQUE (id_modele, id_color, id_size)
    );

CREATE TABLE
    product_images (
        id SERIAL PRIMARY KEY,
        id_product INT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_product_images_product FOREIGN KEY (id_product) REFERENCES products (id) ON DELETE CASCADE
    );

