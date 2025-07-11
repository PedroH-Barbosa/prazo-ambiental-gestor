-- CreateTable
CREATE TABLE "Proprietario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "enderecoRua" TEXT,
    "enderecoNumero" TEXT,
    "cep" TEXT,
    "municipio" TEXT,
    "contato" TEXT
);

-- CreateTable
CREATE TABLE "Empreendimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "endereco" TEXT NOT NULL,
    "tituloDeDominioOuPosse" TEXT,
    "numeroMatricula" TEXT,
    "livroFicha" TEXT,
    "cartorioRegistro" TEXT,
    "areaTotalHa" REAL,
    "municipio" TEXT,
    "estado" TEXT,
    "empreendedorId" INTEGER NOT NULL,
    CONSTRAINT "Empreendimento_empreendedorId_fkey" FOREIGN KEY ("empreendedorId") REFERENCES "Proprietario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "licenca" TEXT NOT NULL,
    "validadeLicenca" DATETIME,
    "condicionantes" TEXT,
    "validadeCondicionantes" DATETIME,
    "orgaoAmbiental" TEXT,
    "numeroProcesso" TEXT,
    "numeroRequerimento" TEXT,
    "empreendimentoId" INTEGER NOT NULL,
    CONSTRAINT "Projeto_empreendimentoId_fkey" FOREIGN KEY ("empreendimentoId") REFERENCES "Empreendimento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
