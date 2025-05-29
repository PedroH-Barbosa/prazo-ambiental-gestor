
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FolderOpen, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockProjetos, mockEmpreendimentos, mockEmpreendedores } from '@/utils/mockData';
import { calculateDaysUntilExpiry } from '@/utils/alertUtils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ProjetosList() {
  const getStatusBadge = (days: number) => {
    if (days < 0) {
      return <Badge variant="destructive">Vencido</Badge>;
    } else if (days <= 7) {
      return <Badge variant="destructive">Crítico</Badge>;
    } else if (days <= 30) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Atenção</Badge>;
    } else {
      return <Badge className="bg-green-500 hover:bg-green-600">Em Dia</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Projetos</h2>
          <p className="text-gray-600 mt-1">Monitoramento de licenças e condicionantes</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProjetos.map((projeto) => {
          const empreendimento = mockEmpreendimentos.find(
            e => e.id === projeto.empreendimentoId
          );
          const empreendedor = mockEmpreendedores.find(
            e => e.id === empreendimento?.empreendedorId
          );
          
          const diasLicenca = calculateDaysUntilExpiry(projeto.validade_licenca);
          const diasCondicionantes = calculateDaysUntilExpiry(projeto.validade_condicionantes);
          
          return (
            <Card key={projeto.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-purple-600" />
                  {projeto.licenca}
                </CardTitle>
                <div className="text-sm text-gray-600">
                  <div><strong>Empreendedor:</strong> {empreendedor?.nome}</div>
                  <div><strong>Empreendimento:</strong> {empreendimento?.endereco}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">Validade da Licença</span>
                      {getStatusBadge(diasLicenca)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {format(projeto.validade_licenca, 'dd/MM/yyyy', { locale: ptBR })}
                      <span className="ml-auto">
                        {diasLicenca >= 0 ? `${diasLicenca} dias` : `${Math.abs(diasLicenca)} dias atrás`}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">Validade das Condicionantes</span>
                      {getStatusBadge(diasCondicionantes)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {format(projeto.validade_condicionantes, 'dd/MM/yyyy', { locale: ptBR })}
                      <span className="ml-auto">
                        {diasCondicionantes >= 0 ? `${diasCondicionantes} dias` : `${Math.abs(diasCondicionantes)} dias atrás`}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {projeto.condicionantes}
                    </div>
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <div><span className="text-gray-500">Órgão:</span> {projeto.orgao_ambiental}</div>
                  <div><span className="text-gray-500">Processo:</span> {projeto.numero_processo}</div>
                  <div><span className="text-gray-500">Requerimento:</span> {projeto.numero_requerimento}</div>
                </div>

                <div className="pt-3 border-t">
                  <Button variant="outline" className="w-full">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
