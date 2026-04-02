import { ArrowLeft, User, MapPin, Bell, Heart, HelpCircle, LogOut, ChevronRight, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: MapPin, label: "Saved Addresses", path: "#" },
  { icon: CalendarCheck, label: "My Dailies (Subscriptions)", path: "/dailies" },
  { icon: Heart, label: "Favorites", path: "#" },
  { icon: Bell, label: "Notifications", path: "#" },
  { icon: HelpCircle, label: "Help & Support", path: "#" },
];

const Profile = () => (
  <div className="min-h-screen safe-bottom">
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary lg:hidden">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </Link>
        <h1 className="flex-1 text-base font-bold text-foreground">Profile</h1>
      </div>
    </header>

    <main className="mx-auto max-w-6xl px-4 py-6 space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
      <div className="lg:col-span-1">
        <div className="glass-card flex flex-col items-center gap-4 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-2xl">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h2 className="text-base font-bold text-foreground">Priya Sharma</h2>
            <p className="text-xs text-muted-foreground">+91 98765 43210</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="glass-card overflow-hidden">
          {menuItems.map(({ icon: Icon, label, path }, i) => (
            <Link key={label} to={path}
              className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-secondary/30 ${
                i < menuItems.length - 1 ? "border-b border-border/30" : ""
              }`}>
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground">{label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>

        <button className="glass-card flex w-full items-center gap-3 px-4 py-3.5 text-destructive hover:bg-destructive/5 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </main>
  </div>
);

export default Profile;
