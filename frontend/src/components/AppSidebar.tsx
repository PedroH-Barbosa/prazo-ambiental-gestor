
import { Home, Users, Building, FolderOpen, Settings, AlertTriangle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    url: '#dashboard'
  },
  {
    title: 'Empreendedores',
    icon: Users,
    url: '#empreendedores'
  },
  {
    title: 'Empreendimentos',
    icon: Building,
    url: '#empreendimentos'
  },
  {
    title: 'Projetos',
    icon: FolderOpen,
    url: '#projetos'
  },
  {
    title: 'Configurações',
    icon: Settings,
    url: '#configuracoes'
  }
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">GPA System</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 hover:text-green-600 transition-colors">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500">
          © 2024 Gestor de Prazos Ambientais
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
