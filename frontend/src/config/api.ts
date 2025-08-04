export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api/v1', // Change this to your backend URL
  ENDPOINTS: {
    GET_ALL_TICKETS: '/tickets',
    SELL_TICKETS: '/tickets/sell',
    GET_TICKET_BY_ID: '/tickets/t',
    UPDATE_TICKET: '/tickets/t',
    DELETE_TICKET: '/tickets/t',
    GET_USER_TICKETS: '/tickets/u',
    UPDATE_USER_TICKETS: '/tickets/u',
    DELETE_USER_TICKETS: '/tickets/u',
    RAFFLE_DRAW: '/tickets/draw',
  },
};
