import { ArrowLeft, Sprout, CheckCircle2, Truck, Home } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { sampleOrders } from "@/data/mockData";

const steps = [
  { key: "harvested", label: "Harvested", icon: Sprout, desc: "Fresh vegetables harvested from the farm" },
  { key: "packed", label: "Packed", icon: CheckCircle2, desc: "Items carefully packed by farmer" },
  { key: "out_for_delivery", label: "On the way", icon: Truck, desc: "Out for delivery to your doorstep" },
  { key: "delivered", label: "Delivered", icon: Home, desc: "Enjoy your fresh vegetables!" },
];
const statusOrder = ["harvested", "packed", "out_for_delivery", "delivered"];

const OrderTracking = () => {
  const { id } = useParams();
  const order = sampleOrders.find(o => o.id === id) || sampleOrders[0];
  const currentIdx = statusOrder.indexOf(order.status);

  return (
    <div className="min-h-screen safe-bottom">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/orders" className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary lg:hidden">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <h1 className="flex-1 text-base font-bold text-foreground">Order #{order.id}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
        {/* Timeline */}
        <div className="glass-card p-5">
          <div className="space-y-0">
            {steps.map((step, i) => {
              const done = i <= currentIdx;
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                      done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[2rem] ${done && i < currentIdx ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {/* Items */}
          <div className="glass-card p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Items</h3>
            {order.items.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.image} alt={item.product.name} loading="lazy" width={48} height={48} className="h-10 w-10 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="glass-card p-4 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground"><span>Delivery Slot</span><span>{order.deliverySlot}</span></div>
            <div className="flex justify-between text-sm font-bold text-foreground"><span>Total</span><span>₹{order.total}</span></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
