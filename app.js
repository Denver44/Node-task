import express from 'express';
let app = express();

import LeadRouter from './routers/LeadRouter.js';

app.use(express.json());
app.use(LeadRouter);

export default app;
