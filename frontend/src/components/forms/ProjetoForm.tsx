
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { Projeto } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ProjetoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projeto?: Projeto & { empreendimento: { id: string; endereco: string; empreendedor: { nome: string } } };
  mode: 'create' | 'edit';
}

export function ProjetoForm({ open, onOpenChange, projeto, mode }: ProjetoFormProps) {
  const { empreendedores, addProjeto, updateProjeto } = useData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    licenca: projeto?.licenca || '',
    validade_licenca: projeto ? format(projeto.validade_licenca, 'yyyy-MM-dd') : '',
    condicionantes: projeto?.condicionantes || '',
    validade_condicionantes: projeto ? format(projeto.validade_condicionantes, 'yyyy-MM-dd') : '',
    orgao_ambiental: projeto?.orgao_ambiental || '',
    numero_processo: projeto?.numero_processo || '',
    numero_requerimento: projeto?.numero_requerimento || '',
    empreendimentoId: projeto?.empreendimentoId || ''
  });

  // Obter todos os empreendimentos
  const allEmpreendimentos = empreendedores.flatMap(emp => 
    emp.empreendimentos.map(empr => ({
      ...empr,
      empreendedor: emp
    }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projetoData = {
      licenca: formData.licenca,
      validade_licenca: new Date(formData.validade_licenca),
      condicionantes: formData.condicionantes,
      validade_condicionantes: new Date(formData.validade_condicionantes),
      orgao_ambiental: formData.orgao_ambiental,
      numero_processo: formData.numero_processo,
      numero_requerimento: formData.numero_requerimento
    };
    
    if (mode === 'create') {
      addProjeto(formData.empreendimentoId, projetoData);
      toast({
        title: "Sucesso",
        description: "Projeto cadastrado com sucesso!"
      });
    } else if (projeto) {
      updateProjeto(projeto.id, projetoData);
      toast({
        title: "Sucesso",
        description: "Projeto atualizado com sucesso!"
      });
    }
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo Projeto' : 'Editar Projeto'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'create' && (
            <div>
              <Label htmlFor="empreendimentoId">Empreendimento</Label>
              <Select value={formData.empreendimentoId} onValueChange={(value) => setFormData({ ...formData, empreendimentoId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um empreendimento" />
                </SelectTrigger>
                <SelectContent>
                  {allEmpreendimentos.map((empr) => (
                    <SelectItem key={empr.id} value={empr.id}>
                      {empr.endereco} - {empr.empreendedor.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label htmlFor="licenca">Licença</Label>
            <Input
              id="licenca"
              value={formData.licenca}
              onChange={(e) => setFormData({ ...formData, licenca: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="validade_licenca">Validade da Licença</Label>
            <Input
              id="validade_licenca"
              type="date"
              value={formData.validade_licenca}
              onChange={(e) => setFormData({ ...formData, validade_licenca: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="condicionantes">Condicionantes</Label>
            <Textarea
              id="condicionantes"
              value={formData.condicionantes}
              onChange={(e) => setFormData({ ...formData, condicionantes: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="validade_condicionantes">Validade das Condicionantes</Label>
            <Input
              id="validade_condicionantes"
              type="date"
              value={formData.validade_condicionantes}
              onChange={(e) => setFormData({ ...formData, validade_condicionantes: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="orgao_ambiental">Órgão Ambiental</Label>
            <Input
              id="orgao_ambiental"
              value={formData.orgao_ambiental}
              onChange={(e) => setFormData({ ...formData, orgao_ambiental: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="numero_processo">Número do Processo</Label>
            <Input
              id="numero_processo"
              value={formData.numero_processo}
              onChange={(e) => setFormData({ ...formData, numero_processo: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="numero_requerimento">Número do Requerimento</Label>
            <Input
              id="numero_requerimento"
              value={formData.numero_requerimento}
              onChange={(e) => setFormData({ ...formData, numero_requerimento: e.target.value })}
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
