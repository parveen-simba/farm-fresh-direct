import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      <div className="flex-1 lg:ml-64">
        {children}
      </div>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
