import { Home, ShoppingBag, ShoppingCart, User, Leaf, CalendarCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ShoppingBag, label: "Orders", path: "/orders" },
  { icon: ShoppingCart, label: "Cart", path: "/cart" },
  { icon: CalendarCheck, label: "Dailies", path: "/dailies" },
  { icon: User, label: "Profile", path: "/profile" },
];

const DesktopSidebar = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-border bg-card/50 backdrop-blur-xl z-50">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-border/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
          <Leaf className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground">FarmFresh</h1>
          <p className="text-[10px] text-muted-foreground">Farm to Table</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path || (path === "/orders" && location.pathname.startsWith("/order"));
          return (
            <Link key={path} to={path}
              className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}>
              <Icon className="h-5 w-5" />
              <span>{label}</span>
              {label === "Cart" && totalItems > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-border/50">
        <div className="glass-card p-3 text-center">
          <p className="text-xs text-muted-foreground">🌱 Freshness Guarantee</p>
          <p className="text-[10px] text-muted-foreground mt-1">Direct from farmers, always fresh</p>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
