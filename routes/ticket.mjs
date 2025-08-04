import express from 'express';
import myDB from '../db/db.mjs';
const ticketRouter = express.Router();

ticketRouter
  .route('/t/:ticketId')
  .get((req, res) => {
    const ticketId = req.params.ticketId;
    const ticket = myDB.findById(ticketId);
    res.status(200).json(ticket);
  })
  .put((req, res) => {
    const ticketId = req.params.ticketId;
    const updatedTicket = myDB.updateById(ticketId, req.body);
    res.status(200).json({
      message: 'Ticket updated successfull',
      updatedTicket,
    });
  })
  .delete((req, res) => {
    const ticketId = req.params.ticketId;
    myDB.deleteById(ticketId);
    res.status(200).json({
      message: 'Ticket deleted successfull',
    });
  });

ticketRouter
  .route('/u/:username')
  .get((req, res) => {
    const username = req.params.username;
    const tickets = myDB.findByUsername(username);
    res.status(200).json({
      message: 'Tickets Find by username successfull',
      tickets,
    });
  })
  .put((req, res) => {
    const username = req.params.username;
    const { price } = req.body;
    const updatedTickets = myDB.updateByUsername(username, req.body);
    res.status(200).json({
      message: 'All tickets updated successfully',
      updatedTickets,
    });
  })
  .patch((req, res) => {
    const username = req.params.username;
    const updatedTickets = myDB.updateByUsername(username, req.body);
    res.status(200).json({
      message: 'All tickets patched successfully',
      updatedTickets,
    });
  })
  .delete((req, res) => {
    const username = req.params.username;
    const deletedCount = myDB.deleteByUsername(username);
    res.status(200).json({
      message: 'All tickets deleted successfully',
      deletedCount,
    });
  });

ticketRouter.post(
  '/sell',
  (req, res, next) => {
    const { username, price } = req.body;
    if (!username || !price) {
      res.status(400).json({
        message: 'Missing items to create a ticket',
      });
    } else {
      next();
    }
  },
  (req, res) => {
    const { username, price } = req.body;
    const ticket = myDB.create(username, price);
    res.status(201).json({
      message: 'Ticket Created Successfully',
      ticket,
    });
  }
);
ticketRouter.post('/bulk', (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = myDB.bulkCreate(username, price, quantity);
  res.status(201).json({
    message: 'Bulk Ticket Created Successfully',
    tickets,
  });
});
ticketRouter.get('/draw', (req, res) => {
  const winnerCount = req.query.wc ?? 3;
  const winners = myDB.draw(winnerCount);
  res.status(200).json({
    message: 'Winners are selecte',
    winners,
  });
});
ticketRouter.get('', (req, res) => {
  const tickets = myDB.find();
  res.status(200).json(tickets);
});

export default ticketRouter;
