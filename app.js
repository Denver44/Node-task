import express from 'express';
import Lead from './models/leadsModel.js';
let app = express();

app.use(express.json());

app.post('/leads', async (req, res) => {
  try {
    const newDoc = await Lead.create(req.body);

    res.status(201).json({
      status: 'created',
      data: {
        data: newDoc,
      },
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});

export default app;
