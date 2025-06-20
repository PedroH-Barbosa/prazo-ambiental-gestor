
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Building, MapPin, FileText, Edit, Trash2 } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { EmpreendimentoForm } from '@/components/forms/EmpreendimentoForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export function EmpreendimentosList() {
  const { empreendedores, deleteEmpreendimento } = useData();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmpreendimento, setEditingEmpreendimento] = useState(null);

  // Extrair todos os empreendimentos da estrutura hierárquica
  const allEmpreendimentos = empreendedores.flatMap(empreendedor => 
    empreendedor.empreendimentos.map(empreendimento => ({
      ...empreendimento,
      empreendedor
    }))
  );

  const handleEdit = (empreendimento) => {
    setEditingEmpreendimento(empreendimento);
    setFormOpen(true);
  };

  const handleDelete = (id: string, endereco: string) => {
    deleteEmpreendimento(id);
    toast({
      title: "Sucesso",
      description: `Empreendimento ${endereco} foi deletado.`
    });
  };

  const handleNewEmpreendimento = () => {
    setEditingEmpreendimento(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Empreendimentos</h2>
          <p className="text-gray-600 mt-1">Gerenciar empreendimentos cadastrados</p>
        </div>
        <Button onClick={handleNewEmpreendimento} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Empreendimento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allEmpreendimentos.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Empreendimento
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja deletar o empreendimento {item.endereco}? 
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item.id, item.endereco)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Deletar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
                <Button variant="outline" onClick={() => handleEdit(item)}>
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EmpreendimentoForm
        open={formOpen}
        onOpenChange={setFormOpen}
        empreendimento={editingEmpreendimento}
        mode={editingEmpreendimento ? 'edit' : 'create'}
      />
    </div>
  );
}
