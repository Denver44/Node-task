import express from 'express';
import {
  createLead,
  getAllLeads,
  getLeadByID,
  updateLeadById,
} from '../controllers/leadControllers.js';

const router = new express.Router();

router.post('/', createLead);
router.get('/:id', getLeadByID);
router.get('/', getAllLeads);
router.patch('/:id', updateLeadById);

export default router;
