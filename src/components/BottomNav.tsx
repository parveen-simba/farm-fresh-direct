import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ShoppingBag, label: "Orders", path: "/orders" },
  { icon: ShoppingCart, label: "Cart", path: "/cart" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path || (path === "/orders" && location.pathname.startsWith("/order"));
          return (
            <Link key={path} to={path} className="relative flex flex-col items-center gap-0.5 px-4 py-1">
              <div className={`relative rounded-xl p-1.5 transition-all ${active ? "bg-primary/15" : ""}`}>
                <Icon className={`h-5 w-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`} />
                {label === "Cart" && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
