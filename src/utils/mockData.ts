
import { Empreendedor, Empreendimento, Projeto } from '@/types';

// Primeiro definimos os projetos
const projetos: Projeto[] = [
  {
    id: '1',
    licenca: 'Licença de Operação',
    validade_licenca: new Date('2024-07-15'),
    condicionantes: 'Monitoramento mensal da qualidade da água',
    validade_condicionantes: new Date('2024-06-10'),
    orgao_ambiental: 'CETESB',
    numero_processo: 'PROC-2023-001234',
    numero_requerimento: 'REQ-2023-005678',
    empreendimentoId: '1'
  },
  {
    id: '2',
    licenca: 'Licença Prévia',
    validade_licenca: new Date('2024-08-20'),
    condicionantes: 'Elaboração de EIA/RIMA',
    validade_condicionantes: new Date('2024-07-05'),
    orgao_ambiental: 'INEA',
    numero_processo: 'PROC-2023-009876',
    numero_requerimento: 'REQ-2023-001122',
    empreendimentoId: '2'
  }
];

// Depois definimos os empreendimentos com seus projetos
const empreendimentos: Empreendimento[] = [
  {
    id: '1',
    endereco: 'Fazenda Santa Maria, Km 15',
    titulo_de_dominio_ou_posse: 'Escritura Pública',
    numero_matricula: '12.345',
    livro_ficha: 'Livro 2, Ficha 123',
    cartorio_registro: 'Cartório de Registro de Imóveis',
    area_total_ha: 150.5,
    municipio: 'Ribeirão Preto',
    estado: 'SP',
    empreendedorId: '1',
    projetos: [projetos[0]]
  },
  {
    id: '2',
    endereco: 'Sítio Boa Vista, Zona Rural',
    titulo_de_dominio_ou_posse: 'Título de Posse',
    numero_matricula: '67.890',
    livro_ficha: 'Livro 3, Ficha 456',
    cartorio_registro: 'Cartório Central',
    area_total_ha: 89.2,
    municipio: 'Petrópolis',
    estado: 'RJ',
    empreendedorId: '2',
    projetos: [projetos[1]]
  }
];

// Finalmente definimos os empreendedores com seus empreendimentos
export const mockEmpreendedores: Empreendedor[] = [
  {
    id: '1',
    nome: 'João Silva Santos',
    cpf: '123.456.789-00',
    endereco: 'Rua das Flores, 123',
    cep: '12345-678',
    municipio: 'São Paulo',
    contato: '(11) 99999-9999',
    empreendimentos: [empreendimentos[0]]
  },
  {
    id: '2', 
    nome: 'Maria Oliveira Costa',
    cpf: '987.654.321-00',
    endereco: 'Av. Principal, 456',
    cep: '87654-321',
    municipio: 'Rio de Janeiro',
    contato: '(21) 88888-8888',
    empreendimentos: [empreendimentos[1]]
  }
];

// Exportamos também as listas separadas para compatibilidade com o código existente
export const mockEmpreendimentos = empreendimentos;
export const mockProjetos = projetos;

export const defaultAlertConfig = {
  diasAlertaLicenca: 30,
  diasAlertaCondicionantes: 15
};
