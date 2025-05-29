
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, User, Phone, MapPin } from 'lucide-react';
import { mockEmpreendedores } from '@/utils/mockData';

export function EmpreendedoresList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Empreendedores</h2>
          <p className="text-gray-600 mt-1">Gerenciar cadastro de empreendedores</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Empreendedor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEmpreendedores.map((empreendedor) => (
          <Card key={empreendedor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />
                {empreendedor.nome}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">
                <strong>CPF:</strong> {empreendedor.cpf}
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                <div>
                  <div>{empreendedor.endereco}</div>
                  <div>{empreendedor.municipio} - {empreendedor.cep}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-gray-400" />
                {empreendedor.contato}
              </div>
              <div className="pt-3 border-t">
                <Button variant="outline" className="w-full">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
