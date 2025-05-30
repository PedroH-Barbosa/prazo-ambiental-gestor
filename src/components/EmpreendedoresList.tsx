
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, User, Phone, MapPin, Edit, Trash2 } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { EmpreendedorForm } from '@/components/forms/EmpreendedorForm';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export function EmpreendedoresList() {
  const { empreendedores, deleteEmpreendedor } = useData();
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmpreendedor, setEditingEmpreendedor] = useState(null);

  const handleEdit = (empreendedor) => {
    setEditingEmpreendedor(empreendedor);
    setFormOpen(true);
  };

  const handleDelete = (id: string, nome: string) => {
    deleteEmpreendedor(id);
    toast({
      title: "Sucesso",
      description: `Empreendedor ${nome} foi deletado.`
    });
  };

  const handleNewEmpreendedor = () => {
    setEditingEmpreendedor(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Empreendedores</h2>
          <p className="text-gray-600 mt-1">Gerenciar cadastro de empreendedores</p>
        </div>
        <Button onClick={handleNewEmpreendedor} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Empreendedor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {empreendedores.map((empreendedor) => (
          <Card key={empreendedor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-green-600" />
                  {empreendedor.nome}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(empreendedor)}
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
                          Tem certeza que deseja deletar o empreendedor {empreendedor.nome}? 
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(empreendedor.id, empreendedor.nome)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Deletar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
                <div className="text-sm text-gray-500 mb-2">
                  {empreendedor.empreendimentos.length} empreendimento(s)
                </div>
                <Button variant="outline" className="w-full">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EmpreendedorForm
        open={formOpen}
        onOpenChange={setFormOpen}
        empreendedor={editingEmpreendedor}
        mode={editingEmpreendedor ? 'edit' : 'create'}
      />
    </div>
  );
}
