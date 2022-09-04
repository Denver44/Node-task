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
 *           example:   ["I go to sleep easily", "I Feel better after good night sleep" , "Feel energetic" ]
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
 *           type: Number
 *           description: The number of hours you sleep
 *           example: 7
 */

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: The leads managing API
 */

/**
 * @swagger
 * /api/v1/leads:
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
 *       500:
 *         description: Internal Server Error
 */

router.get('/', getAllLeads);

/**
 * @swagger
 * /api/v1/leads/{id}:
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
 *       500:
 *         description: Internal Server Error
 */

router.get('/:id', getLeadByID);

/**
 * @swagger
 * /api/v1/leads:
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
 *         description: The lead was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Some server error
 */

router.post('/', createLead);

/**
 * @swagger
 * /api/v1/leads/{id}:
 *  patch:
 *    summary: Update the book by the id
 *    tags: [Leads]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The lead id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Lead'
 *    responses:
 *      200:
 *        description: The lead was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Lead'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: The Lead was not found
 *      500:
 *        description: Internal Server Error
 */

router.patch('/:id', updateLeadById);

export default router;
