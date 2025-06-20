
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { EmpreendedoresList } from '@/components/EmpreendedoresList';
import { EmpreendimentosList } from '@/components/EmpreendimentosList';
import { ProjetosList } from '@/components/ProjetosList';
import { ConfiguracoesList } from '@/components/ConfiguracoesList';
import { DataProvider } from '@/contexts/DataContext';

export default function Index() {
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Set initial section based on hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      setActiveSection(initialHash);
    }

    // Listen for hash changes to update active section
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

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
    <DataProvider>
      <Layout>
        {renderContent()}
      </Layout>
    </DataProvider>
  );
}
