
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Building, Users, FolderOpen, Calendar, Search } from 'lucide-react';
import { generateAlerts } from '@/utils/alertUtils';
import { mockProjetos, defaultAlertConfig } from '@/utils/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Dashboard() {
  const alerts = generateAlerts(mockProjetos, defaultAlertConfig);
  const totalEmpreendedores = 2;
  const totalEmpreendimentos = 2;
  const totalProjetos = mockProjetos.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Visão geral dos prazos ambientais</p>
      </div>

      


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{alerts.length}</div>
            <p className="text-xs text-gray-600">
              Prazos próximos do vencimento
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empreendedores</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalEmpreendedores}</div>
            <p className="text-xs text-gray-600">
              Cadastrados no sistema
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empreendimentos</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalEmpreendimentos}</div>
            <p className="text-xs text-gray-600">
              Em monitoramento
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos</CardTitle>
            <FolderOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalProjetos}</div>
            <p className="text-xs text-gray-600">

            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Alertas de Vencimento
          </CardTitle>
          <CardDescription>
            Projetos com prazos próximos do vencimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum alerta ativo no momento</p>
              <p className="text-sm">Todos os prazos estão em dia!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${alert.diasRestantes <= 7
                    ? 'border-l-red-500 bg-red-50'
                    : alert.diasRestantes <= 15
                      ? 'border-l-yellow-500 bg-yellow-50'
                      : 'border-l-orange-500 bg-orange-50'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {alert.tipo === 'licenca' ? 'Licença' : 'Condicionante'}: {alert.projeto.licenca}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Empreendedor:</strong> {alert.empreendedor.nome}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Empreendimento:</strong> {alert.empreendimento.endereco}
                      </p>
                      {alert.tipo === 'condicionante' && (
                        <p className="text-sm text-gray-600">
                          <strong>Condicionante:</strong> {alert.projeto.condicionantes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${alert.diasRestantes <= 7
                        ? 'text-red-600'
                        : alert.diasRestantes <= 15
                          ? 'text-yellow-600'
                          : 'text-orange-600'
                        }`}>
                        {alert.diasRestantes} dias
                      </div>
                      <p className="text-xs text-gray-500">
                        Vence em {format(alert.dataVencimento, 'dd/MM/yyyy', { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
