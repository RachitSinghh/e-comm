import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items } = useCart();
  // const [addToWishList, setAddToWishList] = useState[];
  const [quantity, setQuantity] = useState(1);
  const [isInWishList, setIsInWishlist] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const isProductInWishList = wishlist.some(
        (item: Product) => item.id === product.id
      );
      setIsInWishlist(isProductInWishList);
    }
  }, [product]);

  const cartItem = items.find((item) => item.id === product?.id);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }

    toast.success(
      `Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart`
    );
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    // get exisiting wishlist from localStorage

    const wishlist = JSON.parse(localStorage.getItem("wishlist"));

    // check if product already exists in wishList
    const existingIndex = wishlist.findIndex(
      (item: Product) => item.id === product.id
    );

    if (existingIndex !== -1) {
      wishlist.splice(existingIndex, 1);
      setIsInWishlist(false);
      toast.success("Removed from wishlist");
    } else {
      // Add to wishlist
      wishlist.push(product);
      setIsInWishlist(true);
      toast.success("Added to wishlist");
    }

    // Save updated wishlist to localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-24">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <Link to="/">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8 -ml-3">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card className="p-8 shadow-card">
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
            </div>
          </Card>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>⭐ {product.rating.rate}</span>
                  <span>({product.rating.count} reviews)</span>
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Card className="p-6 bg-secondary/50 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full text-lg py-6"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                onClick={handleToggleWishlist}
                variant={isInWishList ? 'default' : 'outline'}
                className="w-full text-lg py-6"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                WishList
              </Button>

              {cartItem && (
                <p className="text-sm text-center text-muted-foreground">
                  {cartItem.quantity}{" "}
                  {cartItem.quantity === 1 ? "item" : "items"} already in cart
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
