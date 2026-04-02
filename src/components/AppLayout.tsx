import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";
import { useLocation } from "react-router-dom";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideBottomNav =
    location.pathname === "/checkout" ||
    location.pathname.startsWith("/product/");

  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      <div className="flex-1 lg:ml-64">
        {children}
      </div>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
