
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { Empreendimento } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface EmpreendimentoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empreendimento?: Empreendimento & { empreendedor: { id: string; nome: string } };
  mode: 'create' | 'edit';
}

export function EmpreendimentoForm({ open, onOpenChange, empreendimento, mode }: EmpreendimentoFormProps) {
  const { empreendedores, addEmpreendimento, updateEmpreendimento } = useData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    endereco: empreendimento?.endereco || '',
    titulo_de_dominio_ou_posse: empreendimento?.titulo_de_dominio_ou_posse || '',
    numero_matricula: empreendimento?.numero_matricula || '',
    livro_ficha: empreendimento?.livro_ficha || '',
    cartorio_registro: empreendimento?.cartorio_registro || '',
    area_total_ha: empreendimento?.area_total_ha || 0,
    municipio: empreendimento?.municipio || '',
    estado: empreendimento?.estado || '',
    empreendedorId: empreendimento?.empreendedorId || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'create') {
      addEmpreendimento(formData.empreendedorId, {
        endereco: formData.endereco,
        titulo_de_dominio_ou_posse: formData.titulo_de_dominio_ou_posse,
        numero_matricula: formData.numero_matricula,
        livro_ficha: formData.livro_ficha,
        cartorio_registro: formData.cartorio_registro,
        area_total_ha: formData.area_total_ha,
        municipio: formData.municipio,
        estado: formData.estado,
        projetos: []
      });
      toast({
        title: "Sucesso",
        description: "Empreendimento cadastrado com sucesso!"
      });
    } else if (empreendimento) {
      updateEmpreendimento(empreendimento.id, formData);
      toast({
        title: "Sucesso",
        description: "Empreendimento atualizado com sucesso!"
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo Empreendimento' : 'Editar Empreendimento'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'create' && (
            <div>
              <Label htmlFor="empreendedorId">Empreendedor</Label>
              <Select value={formData.empreendedorId} onValueChange={(value) => setFormData({ ...formData, empreendedorId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um empreendedor" />
                </SelectTrigger>
                <SelectContent>
                  {empreendedores.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
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
            <Label htmlFor="titulo">Título de Domínio ou Posse</Label>
            <Input
              id="titulo"
              value={formData.titulo_de_dominio_ou_posse}
              onChange={(e) => setFormData({ ...formData, titulo_de_dominio_ou_posse: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="matricula">Número da Matrícula</Label>
            <Input
              id="matricula"
              value={formData.numero_matricula}
              onChange={(e) => setFormData({ ...formData, numero_matricula: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="livro">Livro/Ficha</Label>
            <Input
              id="livro"
              value={formData.livro_ficha}
              onChange={(e) => setFormData({ ...formData, livro_ficha: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="cartorio">Cartório de Registro</Label>
            <Input
              id="cartorio"
              value={formData.cartorio_registro}
              onChange={(e) => setFormData({ ...formData, cartorio_registro: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="area">Área Total (ha)</Label>
            <Input
              id="area"
              type="number"
              step="0.1"
              value={formData.area_total_ha}
              onChange={(e) => setFormData({ ...formData, area_total_ha: parseFloat(e.target.value) })}
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
            <Label htmlFor="estado">Estado</Label>
            <Input
              id="estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
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
