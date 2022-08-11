import dotenv from 'dotenv';

dotenv.config();

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting Down...');
  process.exit(1);
});

import mongoose from 'mongoose';
import app from './app.js';

const { PORT } = process.env;

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log('DB connection successful');
});

const server = app.listen(PORT, () => {
  console.log(
    `${process.env.NODE_ENV} server is started http://localhost:${PORT}`
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('💥 UNHANDLED REJECTION! 💻 Shutting down...');
  server.close(() => process.exit(1));
});
