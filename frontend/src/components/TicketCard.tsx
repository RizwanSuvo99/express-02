import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket } from '@/types/ticket';
import { Trash2, Edit, Clock, User, Hash, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface TicketCardProps {
  ticket: Ticket;
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticketNumber: string) => void;
  showActions?: boolean;
}

export function TicketCard({ ticket, onEdit, onDelete, showActions = true }: TicketCardProps) {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-purple-900 dark:text-purple-100">
            Ticket #{ticket.ticketNumber}
          </CardTitle>
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <User className="h-4 w-4" />
          <span className="font-medium">{ticket.username}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <DollarSign className="h-4 w-4" />
          <span className="font-bold text-green-600 dark:text-green-400">${ticket.price}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Clock className="h-4 w-4" />
          <span>{format(new Date(ticket.timestamp), 'MMM dd, yyyy HH:mm')}</span>
        </div>
        
        {showActions && (onEdit || onDelete) && (
          <div className="flex gap-2 pt-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(ticket)}
                className="flex-1 hover:bg-blue-50 hover:border-blue-300"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(ticket.ticketNumber)}
                className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}