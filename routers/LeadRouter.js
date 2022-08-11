import express from 'express';
import Lead from '../models/leadsModel.js';

const router = new express.Router();

// Create router
router.post('/leads', async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json({
      status: 'created',
      data: {
        data: lead,
      },
    });
  } catch (err) {
    res.status(400).json({
      error,
    });
  }
});

// Get router
router.get('/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({
      status: 'success',
      data: {
        data: leads,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: 'No document exist',
    });
  }
});

// get an Individual student data
router.get('/leads/:id', async (req, res) => {
  try {
    const doc = await Lead.findById(req.params?.id);

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'No document found with that ID',
    });
  }
});

// Update router
router.patch('/leads/:id', async (req, res) => {
  try {
    const doc = await Lead.findByIdAndUpdate(req?.params?.id, req?.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'updated',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: 'No document found with that ID',
    });
  }
});

export default router;
