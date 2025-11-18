import express from 'express';
// UPDATED: Import getAllBusSchedules
import { getDashboardStats, downloadReport, getConductors, getAllBusSchedules } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getDashboardStats);
router.get('/report', protect, admin, downloadReport);

router.get('/conductors', protect, admin, getConductors);

// --- NEW ROUTE: Fetches all UPCOMING schedules for the Admin list ---
router.get('/buses/all', protect, admin, getAllBusSchedules);

export default router;