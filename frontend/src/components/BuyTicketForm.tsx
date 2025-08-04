import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Ticket, ShoppingCart, Users } from 'lucide-react';
import { BulkBuyRequest } from '@/types/ticket';

interface BuyTicketFormProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function BuyTicketForm({ onSubmit, isLoading }: BuyTicketFormProps) {
  const [isBulkBuy, setIsBulkBuy] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    price: '',
    quantity: '1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBulkBuy) {
      const bulkData: BulkBuyRequest = {
        username: formData.username,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price)
      };
      onSubmit(bulkData);
    } else {
      const singleData = {
        username: formData.username,
        price: parseFloat(formData.price),
        ticketNumber: Date.now().toString(), // Generate unique ticket number
        timestamp: new Date().toISOString()
      };
      onSubmit(singleData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
          <ShoppingCart className="h-5 w-5" />
          Buy Lottery Tickets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              <span className="text-sm font-medium">Single Ticket</span>
            </div>
            <Switch
              checked={isBulkBuy}
              onCheckedChange={setIsBulkBuy}
            />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Bulk Buy</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              required
              className="bg-white/70 dark:bg-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price per Ticket ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="10.00"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              required
              className="bg-white/70 dark:bg-white/10"
            />
          </div>
          
          {isBulkBuy && (
            <div className="space-y-2">
              <Label htmlFor="quantity">Number of Tickets</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="100"
                placeholder="5"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                required
                className="bg-white/70 dark:bg-white/10"
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-2"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 
             isBulkBuy ? `Buy ${formData.quantity} Tickets` : 'Buy Ticket'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}