import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Clock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { submitStockRequest } from '@/lib/google-sheets';
import { toast } from 'sonner';
import type { Product } from '@/types/perfume';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openCart } = useCart();
  const [isRequestingStock, setIsRequestingStock] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
    openCart();
  };

  const handleRequestStock = async () => {
    setIsRequestingStock(true);
    try {
      const result = await submitStockRequest(product.id, product.name);
      if (result.success) {
        toast.success('Stock request submitted! We\'ll notify you when it\'s available.');
      } else {
        toast.error(result.error || 'Failed to submit stock request');
      }
    } catch (error) {
      toast.error('Failed to submit stock request');
    } finally {
      setIsRequestingStock(false);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback to a placeholder image if the original fails to load
            const target = e.target as HTMLImageElement;
            target.src = `https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&crop=center`;
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white text-black">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          {product.inStock && (
            <Badge variant="outline" className="text-green-600 border-green-600">
              In Stock
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {product.inStock ? (
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            size="lg"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <Button 
            onClick={handleRequestStock}
            variant="outline"
            className="w-full"
            size="lg"
            disabled={isRequestingStock}
          >
            <Clock className="w-4 h-4 mr-2" />
            {isRequestingStock ? 'Requesting...' : 'Request Back in Stock'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};