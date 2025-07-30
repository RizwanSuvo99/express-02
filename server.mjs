import dotenv from 'dotenv';
import http from 'http';
import app from './app/app.mjs';

dotenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT || 8001;

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
