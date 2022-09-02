import app from '../app.js';
import route from '../routers/LeadRouter.js';

app.use('/api/', route);

export default app;
