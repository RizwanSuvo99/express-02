import express from 'express';
import ticketRouter from '../routes/ticket.mjs';
const router = express.Router();

router.use('/api/v1/tickets',ticketRouter)

router.get('/health', (_req, res) => {
  res.status(200).json({
    message: 'Success',
  });
});

export default router;
