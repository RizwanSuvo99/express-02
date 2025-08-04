import { API_CONFIG } from '@/config/api';
import { Ticket, BulkBuyRequest, ApiResponse } from '@/types/ticket';

class ApiService {
  private baseUrl = API_CONFIG.BASE_URL;

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all tickets
  async getAllTickets(): Promise<Ticket[]> {
    return this.request<Ticket[]>(API_CONFIG.ENDPOINTS.GET_ALL_TICKETS);
  }

  // Sell tickets (single or bulk)
  async sellTickets(ticketData: Ticket | BulkBuyRequest): Promise<ApiResponse<Ticket | Ticket[]>> {
    return this.request<ApiResponse<Ticket | Ticket[]>>(
      API_CONFIG.ENDPOINTS.SELL_TICKETS,
      {
        method: 'POST',
        body: JSON.stringify(ticketData),
      }
    );
  }

  // Get ticket by ID
  async getTicketById(ticketId: string): Promise<Ticket> {
    return this.request<Ticket>(`${API_CONFIG.ENDPOINTS.GET_TICKET_BY_ID}/${ticketId}`);
  }

  // Update ticket
  async updateTicket(ticketId: string, ticketData: Partial<Ticket>): Promise<ApiResponse<Ticket>> {
    return this.request<ApiResponse<Ticket>>(
      `${API_CONFIG.ENDPOINTS.UPDATE_TICKET}/${ticketId}`,
      {
        method: 'PUT',
        body: JSON.stringify(ticketData),
      }
    );
  }

  // Delete ticket
  async deleteTicket(ticketId: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(
      `${API_CONFIG.ENDPOINTS.DELETE_TICKET}/${ticketId}`,
      {
        method: 'DELETE',
      }
    );
  }

  // Get user tickets
  async getUserTickets(username: string): Promise<Ticket[]> {
    return this.request<Ticket[]>(`${API_CONFIG.ENDPOINTS.GET_USER_TICKETS}/${username}`);
  }

  // Update user tickets
  async updateUserTickets(username: string, ticketData: Partial<Ticket>): Promise<ApiResponse<Ticket[]>> {
    return this.request<ApiResponse<Ticket[]>>(
      `${API_CONFIG.ENDPOINTS.UPDATE_USER_TICKETS}/${username}`,
      {
        method: 'PATCH',
        body: JSON.stringify(ticketData),
      }
    );
  }

  // Delete all user tickets
  async deleteUserTickets(username: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(
      `${API_CONFIG.ENDPOINTS.DELETE_USER_TICKETS}/${username}`,
      {
        method: 'DELETE',
      }
    );
  }

  // Raffle draw
  async raffleDraw(): Promise<ApiResponse<Ticket>> {
    return this.request<ApiResponse<Ticket>>(API_CONFIG.ENDPOINTS.RAFFLE_DRAW);
  }
}

export const apiService = new ApiService();