import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import LeadRouter from './routers/LeadRouter.js';
import GlobalErrorHandling from './controllers/errorController.js';

let app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const { PORT, NODE_ENV, WEB_URL } = process.env;

const url = NODE_ENV == 'production' ? WEB_URL : WEB_URL.replace('PORT', PORT);

console.log(url);
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WYSA API',
      version: '1.0.0',
      description: 'A simple Express API which store the leads',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.get('/', (_, res) => res.send('Welcome To WYSA API ✅'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1/leads', LeadRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(GlobalErrorHandling);

export default app;
