import React from 'react';
import { CheckoutForm } from '@/components/CheckoutForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Catalog
          </Button>
          
          <h1 className="text-3xl font-bold text-center mb-2">Checkout</h1>
          <p className="text-muted-foreground text-center">
            Complete your order and we'll contact you for payment
          </p>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
}