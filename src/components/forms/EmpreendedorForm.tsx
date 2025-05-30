
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useData } from '@/contexts/DataContext';
import { Empreendedor } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface EmpreendedorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empreendedor?: Empreendedor;
  mode: 'create' | 'edit';
}

export function EmpreendedorForm({ open, onOpenChange, empreendedor, mode }: EmpreendedorFormProps) {
  const { addEmpreendedor, updateEmpreendedor } = useData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nome: empreendedor?.nome || '',
    cpf: empreendedor?.cpf || '',
    endereco: empreendedor?.endereco || '',
    cep: empreendedor?.cep || '',
    municipio: empreendedor?.municipio || '',
    contato: empreendedor?.contato || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'create') {
      addEmpreendedor({
        ...formData,
        empreendimentos: []
      });
      toast({
        title: "Sucesso",
        description: "Empreendedor cadastrado com sucesso!"
      });
    } else if (empreendedor) {
      updateEmpreendedor(empreendedor.id, formData);
      toast({
        title: "Sucesso",
        description: "Empreendedor atualizado com sucesso!"
      });
    }
    
    onOpenChange(false);
    setFormData({
      nome: '',
      cpf: '',
      endereco: '',
      cep: '',
      municipio: '',
      contato: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo Empreendedor' : 'Editar Empreendedor'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="cep">CEP</Label>
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="municipio">Município</Label>
            <Input
              id="municipio"
              value={formData.municipio}
              onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="contato">Contato</Label>
            <Input
              id="contato"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Cadastrar' : 'Atualizar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
