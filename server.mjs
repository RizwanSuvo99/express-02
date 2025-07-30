import express from 'express';

const app = express();
const PORT = 8000;

const simpleLogger = (req, res, next) => {
  console.log(`${req.url} - ${req.method} - ${new Date().toString()}`);
  next();
};

app.use(simpleLogger);

app.get('/', (req, res) => {
  res.json({
    message: 'This is home route',
  });
});

app.get('/about', (req, res) => {
  res.json({
    message: 'This is about route',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
