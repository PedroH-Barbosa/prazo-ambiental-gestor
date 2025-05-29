
import { Alert, AlertConfig, Projeto } from '@/types';
import { mockEmpreendedores } from './mockData';

export const calculateDaysUntilExpiry = (date: Date): number => {
  const today = new Date();
  const timeDiff = date.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const generateAlerts = (
  projetos: Projeto[],
  config: AlertConfig
): Alert[] => {
  const alerts: Alert[] = [];

  projetos.forEach(projeto => {
    // Busca hierárquica: empreendedor > empreendimento > projeto
    const empreendedor = mockEmpreendedores.find(emp => 
      emp.empreendimentos.some(empr => empr.id === projeto.empreendimentoId)
    );
    
    const empreendimento = empreendedor?.empreendimentos.find(
      empr => empr.id === projeto.empreendimentoId
    );

    if (!empreendimento || !empreendedor) return;

    // Check licença expiry
    const diasLicenca = calculateDaysUntilExpiry(projeto.validade_licenca);
    if (diasLicenca <= config.diasAlertaLicenca && diasLicenca >= 0) {
      alerts.push({
        id: `licenca-${projeto.id}`,
        tipo: 'licenca',
        projeto,
        empreendimento,
        empreendedor,
        diasRestantes: diasLicenca,
        dataVencimento: projeto.validade_licenca
      });
    }

    // Check condicionantes expiry
    const diasCondicionantes = calculateDaysUntilExpiry(projeto.validade_condicionantes);
    if (diasCondicionantes <= config.diasAlertaCondicionantes && diasCondicionantes >= 0) {
      alerts.push({
        id: `condicionante-${projeto.id}`,
        tipo: 'condicionante',
        projeto,
        empreendimento,
        empreendedor,
        diasRestantes: diasCondicionantes,
        dataVencimento: projeto.validade_condicionantes
      });
    }
  });

  return alerts.sort((a, b) => a.diasRestantes - b.diasRestantes);
};

// Nova função para obter todos os projetos de forma hierárquica
export const getAllProjetos = (): Projeto[] => {
  const allProjetos: Projeto[] = [];
  
  mockEmpreendedores.forEach(empreendedor => {
    empreendedor.empreendimentos.forEach(empreendimento => {
      allProjetos.push(...empreendimento.projetos);
    });
  });
  
  return allProjetos;
};
