
export interface Empreendedor {
  id: string;
  nome: string;
  cpf: string;
  endereco: string;
  cep: string;
  municipio: string;
  contato: string;
  empreendimentos: Empreendimento[];
}

export interface Empreendimento {
  id: string;
  endereco: string;
  titulo_de_dominio_ou_posse: string;
  numero_matricula: string;
  livro_ficha: string;
  cartorio_registro: string;
  area_total_ha: number;
  municipio: string;
  estado: string;
  empreendedorId: string;
  projetos: Projeto[];
}

export interface Projeto {
  id: string;
  licenca: string;
  validade_licenca: Date;
  condicionantes: string;
  validade_condicionantes: Date;
  orgao_ambiental: string;
  numero_processo: string;
  numero_requerimento: string;
  empreendimentoId: string;
}

export interface AlertConfig {
  diasAlertaLicenca: number;
  diasAlertaCondicionantes: number;
}

export interface Alert {
  id: string;
  tipo: 'licenca' | 'condicionante';
  projeto: Projeto;
  empreendimento: Empreendimento;
  empreendedor: Empreendedor;
  diasRestantes: number;
  dataVencimento: Date;
}
