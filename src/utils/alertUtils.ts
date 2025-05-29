
import { Alert, AlertConfig, Projeto } from '@/types';
import { mockEmpreendedores, mockEmpreendimentos } from './mockData';

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
    const empreendimento = mockEmpreendimentos.find(
      emp => emp.id === projeto.empreendimentoId
    );
    const empreendedor = mockEmpreendedores.find(
      emp => emp.id === empreendimento?.empreendedorId
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
