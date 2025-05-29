
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { EmpreendedoresList } from '@/components/EmpreendedoresList';
import { EmpreendimentosList } from '@/components/EmpreendimentosList';
import { ProjetosList } from '@/components/ProjetosList';
import { ConfiguracoesList } from '@/components/ConfiguracoesList';

export default function Index() {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Listen for hash changes to update active section
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    });

    // Set initial section based on hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash && activeSection === 'dashboard') {
      setActiveSection(initialHash);
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'alertas':
      case 'dashboard':
        return <Dashboard />;
      case 'empreendedores':
        return <EmpreendedoresList />;
      case 'empreendimentos':
        return <EmpreendimentosList />;
      case 'projetos':
        return <ProjetosList />;
      case 'configuracoes':
        return <ConfiguracoesList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}
