import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const Footer = () => {
  const { totalItems, totalPrice } = useCart();

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium text-foreground">{totalItems}</span>
              <span className="text-muted-foreground ml-1">
                {totalItems === 1 ? "item" : "items"} in cart
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-lg font-bold text-primary">
              ${totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
