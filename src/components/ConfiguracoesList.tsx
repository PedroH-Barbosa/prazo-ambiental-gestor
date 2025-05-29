
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Save, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { defaultAlertConfig } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';

export function ConfiguracoesList() {
  const [config, setConfig] = useState(defaultAlertConfig);

  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: "Configurações salvas",
      description: "As configurações de alertas foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Configurações</h2>
        <p className="text-gray-600 mt-1">Configurar alertas e preferências do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Configurações de Alertas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diasLicenca">
                Dias para alerta de vencimento de licença
              </Label>
              <Input
                id="diasLicenca"
                type="number"
                value={config.diasAlertaLicenca}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  diasAlertaLicenca: parseInt(e.target.value) || 0
                }))}
                placeholder="Ex: 30"
              />
              <p className="text-xs text-gray-500">
                Sistema alertará quando a licença estiver próxima do vencimento
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diasCondicionantes">
                Dias para alerta de vencimento de condicionantes
              </Label>
              <Input
                id="diasCondicionantes"
                type="number"
                value={config.diasAlertaCondicionantes}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  diasAlertaCondicionantes: parseInt(e.target.value) || 0
                }))}
                placeholder="Ex: 15"
              />
              <p className="text-xs text-gray-500">
                Sistema alertará quando as condicionantes estiverem próximas do vencimento
              </p>
            </div>

            <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              Informações do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Versão do Sistema</h4>
                <p className="text-sm text-blue-700">v1.0.0</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Status</h4>
                <p className="text-sm text-green-700">Sistema funcionando normalmente</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Última atualização</h4>
                <p className="text-sm text-gray-700">29 de maio de 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
