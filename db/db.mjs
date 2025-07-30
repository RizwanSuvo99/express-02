import Ticket from '../models/Ticket.mjs';

class MyDB {
  constructor() {
    this.tickets = [];
  }

  /**
   * create and save a new ticket
   * @param {string} username
   * @param {number} price
   * @returns {Ticket} return a ticket object
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }

  /**
   * create multiple ticket for a single user
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @returns {Array<Ticket>} return array of tickets
   */
  bulkCreate(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    return result;
  }

  /**
   * return all available tickets
   * @returns {Array<Ticket>} return array of tickets
   */
  find() {
    return this.tickets;
  }

  /**
   * find ticket by ticketId
   * @param {string} ticketId
   */
  findById(ticketId) {
    const ticket = this.tickets.find(
      /**
       *
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === ticketId
    );

    return ticket;
  }

  /**
   * find all tickets for a given user
   * @param {string} username
   */
  findByUsername(username) {
    const tickets = this.tickets.filter(
      /**
       *
       * @param {Ticket} ticket
       * @returns {Array<Ticket>} return array of tickets
       */
      (ticket) => ticket.username === username
    );

    return tickets;
  }

  /**
   *
   * @param {number} ticketId
   * @param {{username: string, price:number}} ticketBody
   * @returns {Ticket} Ticket
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);
    ticket.username = ticketBody.username ?? ticket.username;
    ticket.price = ticketBody.price ?? ticket.price;
    ticket.updatedAt = new Date();

    return ticket;
  }

  /**
   * delete single ticket
   * @param {number} ticketId
   * @returns {Ticket} return deleted ticket
   */
  deleteById(ticketId) {
    const ticketIndex = this.tickets.findIndex(
      /**
       *
       * @param {number} ticket
       * @returns
       */
      (ticket) => ticket.id === ticketId
    );

    if (ticketIndex !== -1) {
      this.tickets.splice(ticketIndex, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * find winners
   * @param {number} winnerCount
   * @returns {Array<Ticket>}
   */
  draw(winnerCount) {
    let indexes = new Array(winnerCount);

    for (let i = 0; i < indexes.length; i++) {
      let index = Math.floor(Math.random() * this.tickets.length);
      while (indexes.includes(index)) {
        index = Math.floor(Math.random() * this.tickets.length);
      }
      indexes[i] = index;
    }

    const winners = indexes.map((index) => this.tickets[index]);
    return winners;
  }
}

const myDB = new MyDB();

export default myDB;
