import { SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function NotFound() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <span className="font-bold mx-auto mt-4">Página Não Encontrada!</span>
    </SidebarProvider>
  )
}
