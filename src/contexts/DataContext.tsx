
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Empreendedor, Empreendimento, Projeto } from '@/types';
import { mockEmpreendedores } from '@/utils/mockData';

interface DataContextType {
  empreendedores: Empreendedor[];
  addEmpreendedor: (empreendedor: Omit<Empreendedor, 'id'>) => void;
  updateEmpreendedor: (id: string, empreendedor: Partial<Empreendedor>) => void;
  deleteEmpreendedor: (id: string) => void;
  addEmpreendimento: (empreendedorId: string, empreendimento: Omit<Empreendimento, 'id' | 'empreendedorId'>) => void;
  updateEmpreendimento: (id: string, empreendimento: Partial<Empreendimento>) => void;
  deleteEmpreendimento: (id: string) => void;
  addProjeto: (empreendimentoId: string, projeto: Omit<Projeto, 'id' | 'empreendimentoId'>) => void;
  updateProjeto: (id: string, projeto: Partial<Projeto>) => void;
  deleteProjeto: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [empreendedores, setEmpreendedores] = useState<Empreendedor[]>(mockEmpreendedores);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addEmpreendedor = (novoEmpreendedor: Omit<Empreendedor, 'id'>) => {
    const empreendedor: Empreendedor = {
      ...novoEmpreendedor,
      id: generateId(),
    };
    setEmpreendedores(prev => [...prev, empreendedor]);
  };

  const updateEmpreendedor = (id: string, dadosAtualizados: Partial<Empreendedor>) => {
    setEmpreendedores(prev => 
      prev.map(emp => emp.id === id ? { ...emp, ...dadosAtualizados } : emp)
    );
  };

  const deleteEmpreendedor = (id: string) => {
    setEmpreendedores(prev => prev.filter(emp => emp.id !== id));
  };

  const addEmpreendimento = (empreendedorId: string, novoEmpreendimento: Omit<Empreendimento, 'id' | 'empreendedorId'>) => {
    const empreendimento: Empreendimento = {
      ...novoEmpreendimento,
      id: generateId(),
      empreendedorId,
      projetos: []
    };
    
    setEmpreendedores(prev =>
      prev.map(emp => 
        emp.id === empreendedorId 
          ? { ...emp, empreendimentos: [...emp.empreendimentos, empreendimento] }
          : emp
      )
    );
  };

  const updateEmpreendimento = (id: string, dadosAtualizados: Partial<Empreendimento>) => {
    setEmpreendedores(prev =>
      prev.map(emp => ({
        ...emp,
        empreendimentos: emp.empreendimentos.map(empr =>
          empr.id === id ? { ...empr, ...dadosAtualizados } : empr
        )
      }))
    );
  };

  const deleteEmpreendimento = (id: string) => {
    setEmpreendedores(prev =>
      prev.map(emp => ({
        ...emp,
        empreendimentos: emp.empreendimentos.filter(empr => empr.id !== id)
      }))
    );
  };

  const addProjeto = (empreendimentoId: string, novoProjeto: Omit<Projeto, 'id' | 'empreendimentoId'>) => {
    const projeto: Projeto = {
      ...novoProjeto,
      id: generateId(),
      empreendimentoId
    };

    setEmpreendedores(prev =>
      prev.map(emp => ({
        ...emp,
        empreendimentos: emp.empreendimentos.map(empr =>
          empr.id === empreendimentoId
            ? { ...empr, projetos: [...empr.projetos, projeto] }
            : empr
        )
      }))
    );
  };

  const updateProjeto = (id: string, dadosAtualizados: Partial<Projeto>) => {
    setEmpreendedores(prev =>
      prev.map(emp => ({
        ...emp,
        empreendimentos: emp.empreendimentos.map(empr => ({
          ...empr,
          projetos: empr.projetos.map(proj =>
            proj.id === id ? { ...proj, ...dadosAtualizados } : proj
          )
        }))
      }))
    );
  };

  const deleteProjeto = (id: string) => {
    setEmpreendedores(prev =>
      prev.map(emp => ({
        ...emp,
        empreendimentos: emp.empreendimentos.map(empr => ({
          ...empr,
          projetos: empr.projetos.filter(proj => proj.id !== id)
        }))
      }))
    );
  };

  return (
    <DataContext.Provider value={{
      empreendedores,
      addEmpreendedor,
      updateEmpreendedor,
      deleteEmpreendedor,
      addEmpreendimento,
      updateEmpreendimento,
      deleteEmpreendimento,
      addProjeto,
      updateProjeto,
      deleteProjeto
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
