
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Building, MapPin, FileText } from 'lucide-react';
import { mockEmpreendedores } from '@/utils/mockData';

export function EmpreendimentosList() {
  // Extrair todos os empreendimentos da estrutura hierárquica
  const allEmpreendimentos = mockEmpreendedores.flatMap(empreendedor => 
    empreendedor.empreendimentos.map(empreendimento => ({
      ...empreendimento,
      empreendedor
    }))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Empreendimentos</h2>
          <p className="text-gray-600 mt-1">Gerenciar empreendimentos cadastrados</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Empreendimento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allEmpreendimentos.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Empreendimento
              </CardTitle>
              <div className="text-sm text-gray-600">
                <strong>Proprietário:</strong> {item.empreendedor.nome}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                <div>
                  <div className="font-medium">{item.endereco}</div>
                  <div className="text-gray-600">
                    {item.municipio} - {item.estado}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Área Total:</span>
                  <div className="font-medium">{item.area_total_ha} ha</div>
                </div>
                <div>
                  <span className="text-gray-500">Matrícula:</span>
                  <div className="font-medium">{item.numero_matricula}</div>
                </div>
              </div>

              <div className="text-sm">
                <span className="text-gray-500">Título:</span>
                <div className="font-medium">{item.titulo_de_dominio_ou_posse}</div>
              </div>

              <div className="text-sm">
                <span className="text-gray-500">Cartório:</span>
                <div className="font-medium">{item.cartorio_registro}</div>
              </div>

              <div className="pt-3 border-t flex gap-2">
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Projetos ({item.projetos.length})
                </Button>
                <Button variant="outline">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
