export interface Ticket {
  ticketNumber: string;
  username: string;
  price: number;
  timestamp: string;
  id?: string;
}

export interface BulkBuyRequest {
  username: string;
  quantity: number;
  price: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}