import express from 'express';
import LeadRouter from './routers/LeadRouter.js';

let app = express();

app.use(express.json());
app.use('/leads', LeadRouter);

export default app;
