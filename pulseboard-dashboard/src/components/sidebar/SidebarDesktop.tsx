
import { Sidebar } from "./Sidebar";

export function SidebarDesktop() {
  return (
    <aside className="hidden md:flex w-64 border-r border-white/10">
      <Sidebar />
    </aside>
  );
}
