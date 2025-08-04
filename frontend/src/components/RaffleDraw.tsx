import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket } from '@/types/ticket';
import { apiService } from '@/services/api';
import { Trophy, Sparkles, Gift, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TicketCard } from './TicketCard';

export function RaffleDraw() {
  const [winner, setWinner] = useState<Ticket | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const { toast } = useToast();

  const handleRaffleDraw = async () => {
    setIsDrawing(true);
    setWinner(null);
    
    // Add delay for dramatic effect
    setTimeout(async () => {
      try {
        const result = await apiService.raffleDraw();
        setWinner(result.data);
        setHasDrawn(true);
        toast({
          title: "🎉 Winner Selected!",
          description: `${result.data.username} has won with ticket #${result.data.ticketNumber}!`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to conduct raffle draw",
          variant: "destructive"
        });
      } finally {
        setIsDrawing(false);
      }
    }, 2000);
  };

  const resetDraw = () => {
    setWinner(null);
    setHasDrawn(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-red-950/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-yellow-900 dark:text-yellow-100">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Raffle Draw
            <Trophy className="h-8 w-8 text-yellow-500" />
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Click the button below to randomly select a winning ticket!
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {!hasDrawn ? (
            <div className="space-y-4">
              {isDrawing ? (
                <div className="py-8">
                  <div className="animate-spin mx-auto w-16 h-16 border-4 border-yellow-300 border-t-yellow-600 rounded-full mb-4"></div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 animate-pulse">
                      Drawing winner...
                    </p>
                    <div className="flex justify-center space-x-1">
                      <div className="animate-bounce w-2 h-2 bg-yellow-500 rounded-full" style={{animationDelay: '0ms'}}></div>
                      <div className="animate-bounce w-2 h-2 bg-yellow-500 rounded-full" style={{animationDelay: '150ms'}}></div>
                      <div className="animate-bounce w-2 h-2 bg-yellow-500 rounded-full" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleRaffleDraw}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Sparkles className="h-6 w-6 mr-2" />
                  Start Raffle Draw
                  <Sparkles className="h-6 w-6 ml-2" />
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="py-4">
                <div className="flex justify-center mb-4">
                  <Crown className="h-16 w-16 text-yellow-500 animate-bounce" />
                </div>
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  🏆 WINNER SELECTED! 🏆
                </Badge>
              </div>
              
              {winner && (
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg blur opacity-25 animate-pulse"></div>
                    <div className="relative">
                      <TicketCard ticket={winner} showActions={false} />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  🎊 Congratulations to the winner! 🎊
                </p>
                <Button
                  onClick={resetDraw}
                  variant="outline"
                  className="mt-4"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Draw Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}