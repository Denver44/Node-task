import express from 'express';
import {
  createLead,
  getAllLeads,
  getLeadByID,
  updateLeadById,
} from '../controllers/leadControllers.js';

const router = new express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Lead:
 *       type: object
 *       required:
 *         - userName
 *         - change
 *         - struggleWithSleep
 *         - BedTime
 *         - wakeUpTime
 *         - sleepHours
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the lead
 *           example: 62f5470f800cfa493d4539e9
 *
 *         userName:
 *           type: string
 *           description: The username
 *           example: "Sean"
 *
 *         change:
 *           type: array
 *           items:
 *              type: string
 *           description: The change you feel in yourself
 *           example:   ["I would like go to sleep easily"]
 *
 *         struggleWithSleep:
 *           type: string
 *           description: Reasons for struggle with sleep
 *           example: "I would like go to sleep easily"
 *
 *         BedTime:
 *           type: string
 *           description: The Bed Time
 *           example: "2:00AM"
 *         wakeUpTime:
 *           type: string
 *           description: The wake up time
 *           example: "8:00PM"
 *         sleepHours:
 *           type: string
 *           description: The number of hours you sleep
 *           example: "7"
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation
 */

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: The leads managing API
 */

/**
 * @swagger
 * /leads:
 *   get:
 *     summary: Returns the list of all the leads
 *     tags: [Leads]
 *     responses:
 *       200:
 *         description: The list of the leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lead'
 */
router.get('/', getAllLeads);

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     summary: Get the lead by id
 *     tags: [Leads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The lead id
 *     responses:
 *       200:
 *         description: The lead description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       404:
 *         description: The lead was not found
 */

router.get('/:id', getLeadByID);

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Create a new lead
 *     tags: [Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lead'
 *     responses:
 *       200:
 *         description: The Lead was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       500:
 *         description: Some server error
 */

router.post('/', createLead);

router.patch('/:id', updateLeadById);

export default router;
