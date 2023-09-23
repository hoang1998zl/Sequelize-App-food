const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const rootRoute = require('./Routes/rootRoute');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', rootRoute);

app.get('/check-connection', async (req, res) => {
  try {
    await prisma.$connect();
    console.log('Connected to database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});