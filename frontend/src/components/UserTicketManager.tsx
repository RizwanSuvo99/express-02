import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Ticket } from '@/types/ticket';
import { apiService } from '@/services/api';
import { TicketCard } from './TicketCard';
import { Search, User, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UserTicketManager() {
  const [username, setUsername] = useState('');
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const fetchUserTickets = async (user: string) => {
    if (!user.trim()) return;
    
    setIsLoading(true);
    try {
      const tickets = await apiService.getUserTickets(user);
      setUserTickets(tickets);
      setHasSearched(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user tickets",
        variant: "destructive"
      });
      setUserTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAllUserTickets = async () => {
    if (!username.trim() || userTickets.length === 0) return;
    
    try {
      await apiService.deleteUserTickets(username);
      setUserTickets([]);
      toast({
        title: "Success",
        description: `All tickets for ${username} have been deleted`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user tickets",
        variant: "destructive"
      });
    }
  };

  const handleDeleteSingleTicket = async (ticketNumber: string) => {
    try {
      await apiService.deleteTicket(ticketNumber);
      setUserTickets(prev => prev.filter(ticket => ticket.ticketNumber !== ticketNumber));
      toast({
        title: "Success",
        description: "Ticket deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete ticket",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <User className="h-5 w-5" />
            User Ticket Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="username-search">Username</Label>
              <Input
                id="username-search"
                type="text"
                placeholder="Enter username to search tickets"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/70 dark:bg-white/10"
                onKeyDown={(e) => e.key === 'Enter' && fetchUserTickets(username)}
              />
            </div>
            <div className="flex flex-col justify-end">
              <Button 
                onClick={() => fetchUserTickets(username)}
                disabled={isLoading || !username.trim()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">
                Tickets for {username}
              </h3>
              <Badge variant="outline" className="text-sm">
                {userTickets.length} tickets
              </Badge>
            </div>
            
            {userTickets.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAllUserTickets}
                className="bg-red-500 hover:bg-red-600"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Delete All
              </Button>
            )}
          </div>

          {userTickets.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium">No tickets found</p>
                <p className="text-sm">User "{username}" doesn't have any tickets yet.</p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTickets.map((ticket) => (
                <TicketCard
                  key={ticket.ticketNumber}
                  ticket={ticket}
                  onDelete={handleDeleteSingleTicket}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}