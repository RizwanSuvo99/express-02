import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket } from '@/types/ticket';
import { apiService } from '@/services/api';
import { TicketCard } from './TicketCard';
import { Search, RefreshCw, Ticket as TicketIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AllTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchAllTickets = async () => {
    setIsLoading(true);
    try {
      const allTickets = await apiService.getAllTickets();
      setTickets(allTickets);
      setFilteredTickets(allTickets);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tickets",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  useEffect(() => {
    const filtered = tickets.filter(ticket =>
      ticket.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTickets(filtered);
  }, [searchTerm, tickets]);

  const handleDeleteTicket = async (ticketNumber: string) => {
    try {
      await apiService.deleteTicket(ticketNumber);
      const updatedTickets = tickets.filter(ticket => ticket.ticketNumber !== ticketNumber);
      setTickets(updatedTickets);
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TicketIcon className="h-5 w-5" />
              All Lottery Tickets
              <Badge variant="outline" className="ml-2">
                {filteredTickets.length} tickets
              </Badge>
            </CardTitle>
            <Button 
              onClick={fetchAllTickets} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by username or ticket number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500 dark:text-gray-400">
            <TicketIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">No tickets found</p>
            <p className="text-sm">
              {searchTerm ? 'Try adjusting your search terms.' : 'No lottery tickets have been purchased yet.'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.ticketNumber}
              ticket={ticket}
              onDelete={handleDeleteTicket}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}