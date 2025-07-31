import express from 'express';
import myDB from '../db/db.mjs';
const ticketRouter = express.Router();

ticketRouter
  .route('/t/:ticketId')
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

ticketRouter
  .route('/u/:username')
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

ticketRouter.post('/sell', (req, res) => {
  const { username, price } = req.body;
  const ticket = myDB.create(username, price);
  res.status(201).json({
    message: 'Ticket Created Successfully',
    ticket,
  });
});
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
  res.status(200).json({
    message: 'All tickets find successfull',
    tickets,
  });
});

export default ticketRouter;
