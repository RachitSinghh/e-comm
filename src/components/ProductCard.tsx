import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, title, price, image, category }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}/details`}>
      <Card className="group overflow-hidden h-full transition-smooth hover:shadow-card-hover shadow-card">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-secondary">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-contain p-4 transition-smooth group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              {category}
            </p>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
              {title}
            </h3>
            <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
