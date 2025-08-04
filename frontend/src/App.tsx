import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { BuyTicketForm } from './components/BuyTicketForm';
import { AllTickets } from './components/AllTickets';
import { UserTicketManager } from './components/UserTicketManager';
import { RaffleDraw } from './components/RaffleDraw';
import { apiService } from './services/api';
import { useToast } from './hooks/use-toast';
import { ShoppingCart, List, User, Trophy, Sparkles } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBuyTickets = async (ticketData: any) => {
    setIsLoading(true);
    try {
      const response = await apiService.sellTickets(ticketData);
      toast({
        title: "Success!",
        description: "Ticket(s) purchased successfully!",
      });
      // Refresh tickets after purchase
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase tickets",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full mr-3">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Lottery Raffle System
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Purchase tickets, manage entries, and win big in our exciting lottery draws!
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="buy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="buy" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Buy Tickets
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              All Tickets
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              User Manager
            </TabsTrigger>
            <TabsTrigger value="draw" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Raffle Draw
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <BuyTicketForm onSubmit={handleBuyTickets} isLoading={isLoading} />
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <AllTickets />
          </TabsContent>

          <TabsContent value="user" className="space-y-6">
            <UserTicketManager />
          </TabsContent>

          <TabsContent value="draw" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <RaffleDraw />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with React 18, ShadCN UI & Vite • Modern Lottery Management System
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;