import dotenv from 'dotenv';
dotenv.config();

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting Down...');
  process.exit(1);
});

import mongoose from 'mongoose';
import app from './app.js';

const { PORT, NODE_ENV } = process.env;

let DB = process.env.DB_CONNECTION_STRING;

if (NODE_ENV == 'production')
  DB = DB.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then((con) => {
  if (NODE_ENV == 'production') console.log('Remote DB connection successful');
  else console.log('Local DB connection successful');
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
