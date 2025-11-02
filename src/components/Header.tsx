import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ShopHub</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link to="/cart">
              <Button
                variant={totalItems > 0 ? "default" : "outline"}
                className="relative"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-background/20">
                    {totalItems}
                  </span>
                )}
              </Button>
              <Link to="/">
                <Button variant="ghost">
                  <Heart className="h-4 w-4 ml-2 mr-2" />
                </Button>
              </Link>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
