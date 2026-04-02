import { ArrowLeft, MapPin, Clock, CreditCard, Smartphone, Banknote, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "sonner";

const deliverySlots = ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "2:00 PM - 4:00 PM", "5:00 PM - 7:00 PM"];
const paymentMethods = [
  { id: "upi", label: "UPI", icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Card", icon: CreditCard, desc: "Credit/Debit card" },
  { id: "cod", label: "COD", icon: Banknote, desc: "Cash on delivery" },
];

const Checkout = () => {
  const { totalPrice, clearCart, items } = useCart();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(deliverySlots[0]);
  const [selectedPayment, setSelectedPayment] = useState("upi");

  const handlePlaceOrder = () => {
    clearCart();
    toast.success("Order placed successfully! 🎉");
    navigate("/order-tracking/ORD001");
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-foreground">Nothing to checkout</p>
        <Link to="/" className="text-primary text-sm">Go home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen safe-bottom">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link to="/cart" className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
            <ArrowLeft className="h-4 w-4 text-foreground" />
          </Link>
          <h1 className="flex-1 text-base font-bold text-foreground">Checkout</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-4 space-y-4 pb-36">
        {/* Address */}
        <div className="glass-card p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2"><MapPin className="h-5 w-5 text-primary" /></div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">Delivery Address</h3>
              <p className="text-xs text-muted-foreground mt-1">42, 3rd Cross, Koramangala 5th Block, Bangalore - 560095</p>
            </div>
            <button className="text-xs text-primary font-medium">Change</button>
          </div>
        </div>

        {/* Delivery Slot */}
        <div className="glass-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Delivery Slot</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {deliverySlots.map(slot => (
              <button key={slot} onClick={() => setSelectedSlot(slot)}
                className={`rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                  selectedSlot === slot ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}>
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="glass-card p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Payment Method</h3>
          {paymentMethods.map(({ id, label, icon: Icon, desc }) => (
            <button key={id} onClick={() => setSelectedPayment(id)}
              className={`flex w-full items-center gap-3 rounded-xl p-3 transition-all ${
                selectedPayment === id ? "bg-primary/10 ring-1 ring-primary" : "bg-secondary/50"
              }`}>
              <Icon className={`h-5 w-5 ${selectedPayment === id ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-[10px] text-muted-foreground">{desc}</p>
              </div>
              {selectedPayment === id && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="glass-card p-4 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Order Summary</h3>
          <div className="flex justify-between text-xs text-muted-foreground"><span>Subtotal</span><span>₹{totalPrice}</span></div>
          <div className="flex justify-between text-xs text-muted-foreground"><span>Delivery</span><span className="text-primary">FREE</span></div>
          <div className="border-t border-border pt-2 flex justify-between text-sm font-bold text-foreground">
            <span>Total</span><span>₹{totalPrice}</span>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-lg px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button onClick={handlePlaceOrder}
            className="w-full rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98] glow-primary">
            Place Order · ₹{totalPrice}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
