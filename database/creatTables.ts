import db from './db';

db.exec(`
CREATE TABLE IF NOT EXISTS empreendedor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cpf TEXT,
  endereco_rua TEXT,
  endereco_numero TEXT,
  cep TEXT,
  municipio TEXT,
  contato TEXT
);

CREATE TABLE IF NOT EXISTS empreendimentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  endereco TEXT,
  titulo_de_dominio_ou_posse TEXT,
  numero_matricula TEXT,
  livro_ficha TEXT,
  cartorio_registro TEXT,
  area_total_ha REAL,
  municipio TEXT,
  estado TEXT,
  empreendedorId INTEGER,
  FOREIGN KEY (empreendedorId) REFERENCES proprietarios(id)
);

CREATE TABLE IF NOT EXISTS projetos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  licenca TEXT,
  validade_licenca TEXT,
  condicionantes TEXT,
  validade_condicionantes TEXT,
  orgao_ambiental TEXT,
  numero_processo TEXT,
  numero_requerimento TEXT,
  empreendimentoId INTEGER,
  FOREIGN KEY (empreendimentoId) REFERENCES empreendimentos(id)
);
`);

console.log('Tabelas criadas com sucesso.');
