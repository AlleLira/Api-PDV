CREATE TABLE usuarios(
	id SERIAL PRIMARY KEY,
  nome VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  senha VARCHAR(250) NOT NULL
);

CREATE TABLE categorias(
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(250) NOT NULL
);

INSERT INTO categorias (descricao)
VALUES ('Informática'), ('Celulares'), ('Beleza e Perfumaria'), ('Mercado'), 
('Livros e Papelaria'), ('Brinquedos'),('Moda'),('Bebê'),('Games');